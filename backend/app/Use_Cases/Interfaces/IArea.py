from db.repos.AreaRepo import AreaRepo
from domain.Area import Area

class IArea:

    def __init__(self, repo: AreaRepo):
        self.repo= repo

    def create(self , values: dict)-> dict:
        area= self.repo.post(values)
        return self.repo.to_Area(area).as_dict()
    
    def get(self,name: str, company: str):
        area= self.repo.get_by_company(name, company)
        return self.repo.to_Area(area).as_dict()

    def delete(self, name: str, company: str):
        area= self.repo.get_by_company(name, company)
        self.repo.delete(area.id)

    def update(self, name: str, company: str, values: dict)-> dict:
        id= self.repo.get_by_company(name, company).id
        area= self.repo.put(id, values)
        return self.repo.to_Area(area).as_dict()

