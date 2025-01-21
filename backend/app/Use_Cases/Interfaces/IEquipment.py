from db.repos.EquipmentRepo import EquipmentRepo

class IEquipment:

    def __init__(self, repo: EquipmentRepo):
        self.repo= repo

    def create(self , values: dict)-> dict:
        equipment= self.repo.post(values)
        return self.repo.to_Equipment(equipment).as_dict()

    def get(self, id: int ):
        equipment= self.repo.get(id)
        return self.repo.to_Equipment(equipment).as_dict()

    def delete(self, name: str, company: str):
        equipment= self.repo.get_by_company(name, company)
        self.repo.delete(equipment.id)

    def update(self, int : id, values: dict)-> dict:
        equipment= self.repo.put(id, values)
        return self.repo.to_Equipment(equipment).as_dict()
    
    def convert( self, equipments):
        list=[]
        for equipment in equipments:
            list.append(self.repo.to_Equipment(equipment).as_dict())
        return list    

