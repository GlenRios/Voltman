from db.models.Bill import BillModel
from db.repos.BaseRepo import BaseRepo
from domain.Bill import Bill
from domain.Company import Company
from db.repos.CompanyRepo import CompanyRepo
from datetime import timedelta, date
from Configurations.CustomError import CustomError
from sqlalchemy import extract


class BillRepo(BaseRepo):
    
    def __init__(self, db , company_repo: CompanyRepo):
        super().__init__(db, BillModel)
        self.company_repo= company_repo
   
    def get_consume(self, company: str ,start_date: date, end_date: date) -> float:
        idCompany= self.company_repo.get_byName(company).id
        start_consumption= self.db.query(BillModel.Reading).filter(BillModel.BillDate==start_date , BillModel.CompanyID== idCompany).first()
        end_consumption=self.db.query(BillModel.Reading).filter(BillModel.BillDate==end_date, BillModel.CompanyID== idCompany).first()
        return (end_consumption.Reading if end_consumption else 0) -(start_consumption.Reading if start_consumption else 0)
    
    def get_in_date_range(self, company:str, start_date: date, end_date: date):
        idCompany= self.company_repo.get_byName(company).id
        bills=  self.db.query(BillModel).filter(BillModel.BillDate.between(start_date, end_date), BillModel.CompanyID== idCompany).all()
        return bills

    
    def to_Bill(self, bill: BillModel)-> Bill:
        company_name= self.company_repo.get(bill.CompanyID).Name
        return Bill(bill.id,
                    bill.BillDate, 
                    company_name, 
                    bill.Reading, 
                    bill.DailyConsumption,
                    bill.Cost)

    def get_company_names(self, items: list[BillModel]):
        companies=[]
        for item in items:
            name, overlimit= self.company_repo.get(item.CompanyID).Name, -item.OverLimit
            companies.append((name,overlimit))
        return companies    

    def prev_day(self, company, bill_date: date):
        # Obtener la lectura acumulada del día anterior
        previous_day = bill_date - timedelta(days=1)
        previous_day_bill = self.db.query(BillModel).filter(
            BillModel.CompanyID == company,
            BillModel.BillDate == previous_day
        ).first()

        return previous_day_bill
    
    def get_limit_exceeded(self, month: int, year: int):

        bills= self.db.query(BillModel).filter(extract('month', BillModel.BillDate)==month, extract('year', BillModel.BillDate)==year, BillModel.OverLimit < 0 ).all()

        latest_bills = {}

        for bill in bills:
            # Si no existe la clave o la fecha es más reciente, actualizaremos
            if bill.CompanyID not in latest_bills or bill.BillDate > latest_bills[bill.CompanyID].BillDate:
                latest_bills[bill.CompanyID] = bill

        # Los objetos con las fechas máximas
        filtered_bills = list(latest_bills.values())
        return filtered_bills
    
    def to_model(self, values: dict)-> dict:
        company=self.company_repo.get_byName(values['Company'])

        previous_day_bill= self.prev_day(company.id, values['Date'])

        daily_consumption= values['Reading']  

        if previous_day_bill:
            if previous_day_bill.Reading> values['Reading']:
                raise CustomError('Reading cannot be less than the last reading', 400)
            daily_consumption-= previous_day_bill.Reading
             
        prev_overlimit= previous_day_bill.OverLimit if (previous_day_bill and previous_day_bill.BillDate.month== values['Date'].month) else company.Limit    

        overlimit= prev_overlimit- daily_consumption

        cost= (1+ company.Extra_Percent)* daily_consumption + company.Increase

        return {'BillDate': values['Date'],
                'CompanyID': company.id,
                'Reading': values['Reading'],
                'DailyConsumption': daily_consumption,
                'Cost': cost,
                'OverLimit': overlimit}
    