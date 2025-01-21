from Configurations.CustomError import CustomError
from Use_Cases.Interfaces.ICompany import ICompany
class CompanyController:

    def __init__(self, icompany: ICompany):
        self.Icompany= icompany

    def get(self, name: str):
        return self.Icompany.get(name)
    
    def get_by_id(self, id: int):
        return self.Icompany.get_by_id(id)

    def post(self, values: dict):
        return self.Icompany.create(values)
    
    def delete(self, id: int):
        return self.Icompany.delete(id)
    
    def put(self, id: int, values: dict):
        return self.Icompany.update(id, values)
    
    def get_all(self):
        return self.Icompany.get_all()
    
    def update_formule(self, data: dict, id: int):
        company= self.get_by_id(id)
        company['Increase']= data['Increase']
        company['Extra_Percent']= data['Extra_Percent']
        return self.put(id, company)


    
