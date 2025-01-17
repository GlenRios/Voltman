from db.models.User import UserModel
from db.repos.BaseRepo import BaseRepo
from domain.User import User
from db.models.Group import GroupModel

class UserRepo(BaseRepo):
    
    def __init__(self, db, company_repo):
        super().__init__(db, UserModel)
        self.company_repo= company_repo
    
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

    # given the initial information provided by the UI, maps these values ​​to the model values 
    def to_model(self, values: dict)-> dict:
        company_id= self.company_repo.get_byName(values['Company']).id
        group_id= self.db.query(GroupModel).filter(GroupModel.Name==values['Type']).first().id
        return {'Username': values['Username'], 
                'Password': values['Password'], 
                'CompanyID': company_id, 
                'GroupID': group_id}

