from domain.Entities.Company import Company
from sqlalchemy.orm import Session
from infrastructure.repo.BaseRepo import BaseRepo

class CompanyRepo(BaseRepo):
    def __init__(self,db):
        super().__init__(db, Company)
    
    def get_byName(self, name:str)->Company:
        return (self.db.query(Company).filter(Company.Name==name).first())

    def get_all(self)->list[Company]:
        #returns all companies
        return self.db.query(Company).all()

    

        