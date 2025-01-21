from Configurations.CustomError import CustomError
from Use_Cases.Interfaces.ICompany import ICompany
class CompanyController:

    def __init__(self, icompany: ICompany):
        self.Icompany= icompany

    def get(self, name: str):
        return self.Icompany.get(name)

    def post(self, values: dict):
        return self.Icompany.create(values)
    
    def delete(self, id):
        return self.Icompany.delete(id)
    
    def put(self, id: int, values: dict):
        return self.Icompany.update(id, values)
    
    def get_all(self):
        return self.Icompany.get_all()
    
