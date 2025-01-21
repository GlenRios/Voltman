from db.models.Area import AreaModel
from db.repos.BaseRepo import BaseRepo
from domain.Area import Area

class AreaRepo(BaseRepo):
    
    def __init__(self, db , company_repo):
        super().__init__(db, AreaModel)
        self.company_repo= company_repo
    
    def get_by_company(self, name: str, company_name: str)-> AreaModel:
        company= self.company_repo.get_byName(company_name)
        return self.db.query(AreaModel).filter(AreaModel.Name==name and AreaModel.CompanyID==company.id).first()
    
    def to_Area(self, area: AreaModel)-> Area:
        company= self.company_repo.get(area.CompanyID)
        return Area(company.Name, 
                    area.Name, 
                    area.Responsible)
    
    def to_model(self, values:dict)-> dict:
        company_id= self.company_repo.get_byName(values['Company']).id
        return {'CompanyID': company_id, 
                'Name': values['Name'], 
                'Responsible': values['Responsible']}
    


    

