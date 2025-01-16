from db.models.Company import CompanyModel
from db.repos.BaseRepo import BaseRepo
from domain.Company import Company

class CompanyRepo(BaseRepo):
    
    def __init__(self,db):
        super().__init__(db, CompanyModel)

    def get_byName(self, name:str)->CompanyModel:
        return (self.db.query(CompanyModel).filter(CompanyModel.Name==name).first())

    def get_all(self)->list[CompanyModel]:
        return self.db.query(CompanyModel).all()
    
    def get_areas(self, id: int)-> list:
        company= self.get(id)
        return company.areas
    
    def get_people(self, id: int)-> list:
        company= self.get(id)
        return company.people
    
    def to_Company(self, company: CompanyModel)-> Company:
        return Company(company.Name, 
                       company.Limit, 
                       company.Type, 
                       company.Addr, 
                       company.Increase, 
                       company.Extra_Percent)
    
    def to_model(self, values:dict)-> dict:
        return { 'Limit': values['Limit'],
                 'Name': values['Name'],
                 'Type': values['Type'],
                 'Addr': values['Addr'], 
                 'Increase': (values['Increase'] if values.__contains__('Increase') else 20), 
                 'Extra_Percent': (values['Extra_Percent'] if values.__contains__('Extra_Percent') else 15)}


        