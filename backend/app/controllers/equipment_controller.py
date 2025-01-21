from Configurations.CustomError import CustomError

class EquipmentController:

    def __init__(self, iequipment):
        self.Iequipment= iequipment

    def get(self, id: int):
        return self.Iequipment.get(id)

    def post(self, values: dict):
        return self.Iequipment.create(values)
    
    def delete(self, id: int):
        return self.Iequipment.delete(id)
    
    def put(self, id, values: dict):
        return self.Iequipment.update(id, values)
    
    
