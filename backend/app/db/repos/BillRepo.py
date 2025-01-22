from db.models.Bill import BillModel
from datetime import datetime
from db.repos.BaseRepo import BaseRepo
from domain.Bill import Bill

class BillRepo(BaseRepo):
    
    def __init__(self, db , company_repo):
        super().__init__(db, BillModel)
        self.company_repo= company_repo

    
    def get_consume(self, idCompany:int ,start_date: datetime, end_date: datetime) -> int:
        start_consumption= self.db.query(BillModel.Reading).filter(BillModel.BillDate==start_date).firts()
        end_consumption=self.db.query(BillModel.Reading).filter(BillModel.BillDate==end_date).first()
        return end_consumption-start_consumption
    
   
    def to_Bill(self, bill: BillModel)-> Bill:
        company_name= self.company_repo.get(bill.CompanyID).Name
        return Bill(bill.BillDate, 
                    company_name, 
                    bill.Reading, 
                    bill.Cost, 
                    bill.OverLimit)
    
    
    def to_model(self, values: dict)-> dict:
        company_id=self.company_repo.get_byName(values['Company']).id
        return {'BillDate': values['Date'],
                'CompanyID': company_id,
                'Reading': values['Reading'],
                'Cost': values['Cost'],
                'OverLimit': values['OverLimit']}
    