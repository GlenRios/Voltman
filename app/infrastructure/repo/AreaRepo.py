from domain.Entities.Area import Area 
from sqlalchemy.orm import Session
from infrastructure.repo.BaseRepo import BaseRepo
class AreaRepo():
    def __init__(self, db):
        super().__init__(db,Area)
    def __init__(self, db: Session):
        self.db = db
    
    def get_by_name_company(self, name:str, companyID:int)->Area:
        return self.db.query(Area).filter(Area.Name==name and Area.CompanyID==companyID).first()

    def get_all_in_company(self, companyID)->list[Area]:
        #given a company returns all its areas 
        return self.db.query(Area).filter(Area.CompanyID==companyID).all()
    
    

