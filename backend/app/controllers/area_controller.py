from Use_Cases.Interfaces.ICompany import ICompany
from Use_Cases.Interfaces.IArea import IArea
class AreaController:

    def __init__(self, iarea: IArea, icompany: ICompany):
        self.Iarea= iarea
        self.Icompany= icompany

    def get(self, id: int):
        return self.Iarea.get(id)

    def post(self, values: dict):
        return self.Iarea.create(values)
    
    def delete(self, id: int):
        return self.Iarea.delete(id)
    
    def put(self, id, values: dict):
        return self.Iarea.update(id, values)
    
    def get_all(self, id: int):
        areas= self.Icompany.get_areas(id)
        return self.Iarea.convert(areas)
    
    
    
