from domain.Entities.User import User
from infrastructure.repo.CompanyRepo import CompanyRepo
from infrastructure.repo.BaseRepo import BaseRepo
class UserRepo(BaseRepo):
    def __init__(self,db):
        super().__init__(db, User)
    
    def get_by_username(self, name:str)->User:
        return (self.db.query(User).filter(User.Username==name).first())

    def get_all(self, companyID)->list[User]:
        #given a company returns all its users
        return self.db.query(User).filter(User.CompanyID==companyID).all()
    
    def _tojson(self, user:User):
        company_repo=CompanyRepo(self.db)
        company_name=company_repo.get(user.CompanyID).Name
        return {"id":user.id, "Username":user.Username, "Password":user.Password, "Company":company_name,"Type":user.GroupID}
        
        
