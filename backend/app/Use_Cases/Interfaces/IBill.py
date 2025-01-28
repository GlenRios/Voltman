from db.repos.BillRepo import BillRepo

class IBill:
    
    def __init__(self, repo: BillRepo):
        self.repo= repo

    def create(self, values: dict):
        values= self.repo.to_model(values)
        bill = self.repo.post(values, unique_fields=['BillDate', 'CompanyID'])
        return self.repo.to_Bill(bill).as_dict()
    
    
