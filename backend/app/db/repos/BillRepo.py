from db.models.Bill import BillModel
from db.repos.BaseRepo import BaseRepo
from domain.Bill import Bill
from domain.Company import Company
from db.repos.CompanyRepo import CompanyRepo
from datetime import timedelta, datetime
from Configurations.CustomError import CustomError

class BillRepo(BaseRepo):
    
    def __init__(self, db , company_repo: CompanyRepo):
        super().__init__(db, BillModel)
        self.company_repo= company_repo
   
    def get_consume(self, idCompany: int ,start_date: datetime, end_date: datetime) -> int:
        start_consumption= self.db.query(BillModel.Reading).filter(BillModel.BillDate==start_date , BillModel.CompanyID== idCompany).firts()
        end_consumption=self.db.query(BillModel.Reading).filter(BillModel.BillDate==end_date, BillModel.CompanyID== idCompany).first()
        return end_consumption-start_consumption
    
    def to_Bill(self, bill: BillModel)-> Bill:
        company_name= self.company_repo.get(bill.CompanyID).Name
        return Bill(bill.id,
                    bill.BillDate, 
                    company_name, 
                    bill.Reading, 
                    bill.Cost, 
                    bill.OverLimit)

    def prev_day(self, company, bill_date):
        # Obtener la lectura acumulada del día anterior
        previous_day = bill_date - timedelta(days=1)
        previous_day_bill = self.db.query(BillModel).filter(
            BillModel.CompanyID == company.id,
            BillModel.BillDate == previous_day
        ).first()

        return previous_day_bill
    
    def to_model(self, values: dict)-> dict:
        company=self.company_repo.get_byName(values['Company'])
        previous_day_bill= self.prev_day(company, values['Date'])
        if previous_day_bill:
            if previous_day_bill.Reading> values['Reading']:
                raise CustomError('Reading cannot be less than the last reading', 400)
            daily_consumption= values['Reading']- previous_day_bill.Reading
        else: 
            daily_consumption= values['Reading']           
        prev_overlimit= previous_day_bill.OverLimit if previous_day_bill and previous_day_bill.BillDate.month== values['Date'].month else company.Limit    
        overlimit= prev_overlimit- daily_consumption
        cost= (1+ company.Extra_Percent)* daily_consumption + company.Increase
        return {'BillDate': values['Date'],
                'CompanyID': company.id,
                'Reading': values['Reading'],
                'Cost': cost,
                'OverLimit': overlimit}
    