from db.repos.AreaRepo import AreaRepo
from domain.Area import Area

class IArea:

    def __init__(self, repo: AreaRepo):
        self.repo= repo

    def create(self , values: dict)-> dict:
        values= self.repo.to_model(values)
        area= self.repo.post(values, unique_fields=['Name', 'CompanyID'])
        return self.repo.to_Area(area).as_dict()
    
    def get(self, id: int ):
        area= self.repo.get(id)
        return self.repo.to_Area(area).as_dict()

    def get_equipments(self, id: int):
        equipments= self.repo.get_equipments(id)

    def delete(self, id: int):
        self.repo.delete(id)

    def update(self, id: int ,values: dict)-> dict:
        values= self.repo.to_model(values)
        area= self.repo.put(id, values, unique_fields=['Name', 'CompanyID'])
        return self.repo.to_Area(area).as_dict()

    def get_by_name(self,name: str, company: str):
        area= self.repo.get_by_company(name, company)
        return self.repo.to_Area(area).as_dict()
    
    def convert(self, areas: list):
        list=[]
        for area in areas:
            list.append(self.repo.to_Area(area).as_dict())
        return list    
    