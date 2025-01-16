from domain.User import User
from db.repos.UserRepo import UserRepo
from Configurations.CustomError import CustomError

class IUser:

    def __init__(self, repo: UserRepo):
        self.repo= repo

    # create a new user
    def create(self , values: dict)-> dict:
        values= self.repo.to_model(values)
        user= self.repo.post(values, unique_fields=['Username'])     
        return self.repo.to_User(user).as_dict()
    
    # given an id returns the user with said id
    def get(self, id: int)-> dict:
        user= self.repo.get(id)
        return self.repo.to_User(user).as_dict()

    # given a user id delete him from the db
    def delete(self, id: int):
        return self.repo.delete(id)

    # given data about a user modified some of its values
    def update(self, id: int, values: dict)-> dict:
        values = self.repo.to_model(values)
        user= self.repo.put(id, values, ['Username'])
        return self.repo.to_User(user).as_dict()
    
    # given a username return the user with that username
    def get_by_username(self, username: str):
        return self.repo.to_User(self.repo.get_by_username(username))  
    

    def get_id(self, username: str):
        return self.repo.get_by_username(username).id
    
    # this method is to check that a user is in the database
    def find_out(self, username: str, password: str):
        user= self.get_by_username(username)
        if password!= user['Password']:
            raise CustomError("Incorrect username or password")
        return None
    
    # given a list of UserModel converts it to User Entity
    def convert(self, users)-> list[User]:
        list=[]
        for user in users:
            list.append(self.repo.to_User(user).as_dict())
        return list    
    
