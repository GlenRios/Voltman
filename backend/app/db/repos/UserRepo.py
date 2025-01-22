from db.models.User import UserModel
from db.repos.BaseRepo import BaseRepo
from domain.User import User

class UserRepo(BaseRepo):
    
    def __init__(self, db, company_repo, group_repo):
        super().__init__(db, UserModel)
        self.company_repo= company_repo
        self.group_repo= group_repo
    
    def get_by_username(self, name:str )->UserModel:
        return (self.db.query(UserModel).filter(UserModel.Username==name).first())

    def to_User(self, user: UserModel)-> User:
        company= self.company_repo.get(user.CompanyID)
        group= user.group
        return User(user.id, 
                    user.Password,
                    user.Username, 
                    company.Name, 
                    group.Name)
    
    def get_all(self):
        return self.db.query(UserModel).all()
    
    def get_permissions(self, group: str):
        return self.group_repo.get_permissions(group)

    # given the initial information provided by the UI, maps these values ​​to the model values 
    def to_model(self, values: dict)-> dict:
        company_id= self.company_repo.get_byName(values['Company']).id
        group_id= self.group_repo.get_by_type(values['Type']).id
        return {'Username': values['Username'], 
                'Password': values['Password'], 
                'CompanyID': company_id, 
                'GroupID': group_id}

