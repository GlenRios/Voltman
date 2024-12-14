from domain.Entities.Area import Area 
from sqlalchemy.orm import Session
class AreaRepo:
    def __init__(self, db: Session):
        self.db = db
    def post(self, companyID: int, Name:str, Responsible:str)->Area:
        new_area= Area(CompanyID=companyID, Name=Name, Respondible=Responsible)
        self.db.add(new_area)
        self.db.commit()
        self.db.refresh(new_area)
        return new_area
        
    def get(self, id:int)->Area:
        #given an id returns the area with that id
        return self.db.query(Area).filter(Area.id==id).first()
    
    def get(self, name:str, companyID:int)->Area:
        return (self.db.query(Area).filter(Area.Name==name and Area.CompanyID==companyID).first())

    def get_all(self, companyID)->list[Area]:
        #given a company returns all its areas 
        return self.db.query(Area).filter(Area.CompanyID==companyID).all()
    
    def delete(self, id:int)-> bool:
        #given an id of a Area delete it from the bd
        area = self.get(id)
        if area:
            self.db.delete(area)
            self.db.commit()
            return True
        return False
    
    def put(self, id:int ,values:dict)-> Area:
        area=self.get(id)
        if area:
            for key, value in values.items():
                setattr(area, key, value)
            self.db.commit()
            self.db.refresh(area)
            return area
        return None

