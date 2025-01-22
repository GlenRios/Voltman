from Configurations.CustomError import CustomError
from Use_Cases.Interfaces.IArea import IArea
from Use_Cases.Interfaces.IEquipment import IEquipment
from datetime import datetime
class EquipmentController:

    def __init__(self, iequipment: IEquipment, iarea: IArea):
        self.Iequipment= iequipment
        self.Iarea= iarea

    def get(self, id: int):
        return self.Iequipment.get(id)

    def post(self, values: dict):
        return self.Iequipment.create(values)
    
    def delete(self, id: int):
        return self.Iequipment.delete(id)
    
    def put(self, id, values: dict):
        values['Installation_Date']= datetime.strptime(values['Installation_Date'], '%Y-%m-%d').date()
        area= self.Iarea.get_by_name(values['Area'], values['Company'])
        if area:
            return self.Iequipment.update(id, values)
        raise CustomError('Invalid Area', 500)
    
    def get_all(self, areas: list):
        equipments=[]
        for area in areas:
            eq= self.Iarea.get_equipments(area['id'])
            eq= self.Iequipment.convert(eq)
            equipments.extend(eq)
        return equipments    
        

        
    
    
