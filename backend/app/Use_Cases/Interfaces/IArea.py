from db.repos.AreaRepo import AreaRepo
from domain.Area import Area

class IArea:

    def __init__(self, repo: AreaRepo):
        self.repo= repo

    def create(self , values: dict)-> dict:
        values= self.repo.to_model(values)
        area= self.repo.post(values, unique_fields=['Name', 'Company'])
        return self.repo.to_Area(area).as_dict()
    
    def get(self, id: int ):
        area= self.repo.get(id)
        return self.repo.to_Area(area).as_dict()

    def get_equipments(self, id: int):
        equipments= self.repo.get_equipments(id)

    def delete(self, name: str, company: str):
        area= self.repo.get_by_company(name, company)
        self.repo.delete(area.id)

    def update(self, name: str, company: str, values: dict)-> dict:
        id= self.repo.get_by_company(name, company).id
        area= self.repo.put(id, values)
        return self.repo.to_Area(area).as_dict()

    def get_by_name(self,name: str, company: str):
        area= self.repo.get_by_company(name, company)
        return self.repo.to_Area(area).as_dict()
    