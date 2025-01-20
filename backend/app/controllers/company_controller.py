from Configurations.CustomError import CustomError

class CompanyController:

    def __init__(self, icompany):
        self.Icompany= icompany

    def get(self, name: str):
        return self.Icompany.get(name)

    def post(self, values: dict):
        return self.Icompany.create(values)
    
    def delete(self, name: str):
        return self.Icompany.delete(name)
    
    def put(self, name, values: dict):
        return self.Icompany.update(name, values)
    
    
