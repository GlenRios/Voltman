from Configurations.CustomError import CustomError

class EquipmentController:

    def __init__(self, iequipment, icompany, iarea):
        self.Iequipment= iequipment
        self.Icompany= icompany
        self.Iarea= iarea

    def get(self, id: int):
        return self.Iequipment.get(id)

    def post(self, values: dict):
        return self.Iequipment.create(values)
    
    def delete(self, id: int):
        return self.Iequipment.delete(id)
    
    def put(self, id, values: dict):
        return self.Iequipment.update(id, values)
    
    def get_all(self, id_company: int):
        areas= self.Icompany.get_areas(id_company)
        equipments= []
        for area in areas:
            equ= self.Iarea.get_equipments(area.id)
            equipments.append(self.Iequipment.convert(equ))

        
    
    
