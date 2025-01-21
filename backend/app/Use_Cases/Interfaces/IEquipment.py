class IEquipment:

    def __init__(self, repo):
        self.repo= repo

    def create(self , values: dict)-> dict:
        equipment= self.repo.post(values)
        return self.repo.to_Equipment(equipment).as_dict()

    def get(self,name: str, company: str):
        equipment= self.repo.get_by_company(name, company)
        return self.repo.to_Equipment(equipment).as_dict()

    def delete(self, name: str, company: str):
        equipment= self.repo.get_by_company(name, company)
        self.repo.delete(equipment.id)

    def update(self, name: str, company: str, values: dict)-> dict:
        id= self.repo.get_by_company(name, company).id
        equipment= self.repo.put(id, values)
        return self.repo.to_Equipment(equipment).as_dict()

