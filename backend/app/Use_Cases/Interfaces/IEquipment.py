from db.repos.EquipmentRepo import EquipmentRepo

class IEquipment:

    def __init__(self, repo: EquipmentRepo):
        self.repo= repo

    def create(self , values: dict)-> dict:
        values= self.repo.to_model(values)
        equipment= self.repo.post(values)
        return self.repo.to_Equipment(equipment).as_dict()

    def get(self, id: int ):
        equipment= self.repo.get(id)
        return self.repo.to_Equipment(equipment).as_dict()

    def delete(self, id: int):
        self.repo.delete(id)

    def update(self, id: int, values: dict)-> dict:
        values= self.repo.to_model(values)
        equipment= self.repo.put(id, values)
        return self.repo.to_Equipment(equipment).as_dict()
    
    def convert( self, equipments):
        list=[]
        for equipment in equipments:
            list.append(self.repo.to_Equipment(equipment).as_dict())
        return list    

