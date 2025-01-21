from db.repos.CompanyRepo import CompanyRepo
from domain.Company import Company

class ICompany:

    def __init__(self, repo: CompanyRepo):
        self.repo= repo

    def create(self , values: dict)-> dict:
        company= self.repo.post(values, ['Name'])
        return self.repo.to_Company(company).as_dict()
    
    def get(self,name: str):
        company= self.repo.get_byName(name)
        return self.repo.to_Company(company).as_dict()
    
    def get_by_id(self, id: int):
        company= self.repo.get(id)
        return self.repo.to_Company(company).as_dict()

    def delete(self, id):
        self.repo.delete(id)

    def update(self, id: int, values: dict)-> dict:
        company= self.repo.put(id, values, ['Name'])
        return self.repo.to_Company(company).as_dict()
    
    def get_areas(self, id: int):
        areas= self.repo.get_areas(id)
        return areas
    
    def get_users(self, name: str):
        id= self.repo.get_byName(name).id
        users= self.repo.get_people(id)
        return users
    
    def get_all(self):
        companies= self.repo.get_all()
        list=[]
        for company in companies:
            list.append(self.repo.to_Company(company).as_dict())
        return list    

