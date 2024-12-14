from domain.Entities.Company import Company
from sqlalchemy.orm import Session


class CompanyRepo:
    def __init__(self, db: Session):
        self.db = db
    def post(self, limit: float,Type: str , Name:str, Address:str, Increase=20, ExtraPercentage=20)->Company:
        #create a new company
        new_Company=Company(Limit=limit, Increase=Increase, ExtraPercentage=ExtraPercentage,Type=Type, Name=Name, Address=Address)
        self.db.add(new_Company)
        self.db.commit()
        self.db.refresh(new_Company)
        return new_Company
    
    def get(self, id:int)->Company:
        #given an id returns the company with that id
        return self.db.query(Company).filter(Company.id==id).first()
    
    def get_byName(self, name:str)->Company:
        return (self.db.query(Company).filter(Company.Name==name).first())

    def get_all(self)->list[Company]:
        #returns all companies
        return self.db.query(Company).all()
    
    def delete(self, id:int)-> bool:
        #given an id of a company delete it from the bd
        company = self.get(id)
        if company:
            self.db.delete(company)
            self.db.commit()
            return True
        return False
    
    def put(self, id:int ,values:dict)-> Company:
        #given an id of a company modified some of its values
        company=self.get(id)
        if company:
            for key, value in values.items():
                setattr(company, key, value)
            self.db.commit()
            self.db.refresh(company)
            return company
        return None

    

        