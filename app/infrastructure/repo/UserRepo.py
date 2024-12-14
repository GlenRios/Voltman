from domain.Entities.User import User
from sqlalchemy.orm import Session
class UserRepo:
    def __init__(self, db: Session):
        self.db = db
    def post(self, username:str, password:str, CompanyID: str, GroupID: int)->User:
        new_user= User(Username=username, Password=password,CompanyID=CompanyID, GroupID=GroupID)
        self.db.add(new_user)
        self.db.commit()
        self.db.refresh(new_user)
        return new_user
        
    def get(self, id:int)->User:
        #given an id returns the user with that id
        return self.db.query(User).filter(User.id==id).first()
    
    def get(self, name:str)->User:
        return (self.db.query(User).filter(User.Username==name).first()).User

    def get_all(self, companyID)->list[User]:
        #given a company returns all its users
        return self.db.query(User).filter(User.CompanyID==companyID).all()
    
    def delete(self, id:int)-> bool:
        #given an id of an user delete him from the bd
        user = self.get(id)
        if user:
            self.db.delete(User)
            self.db.commit()
            return True
        return False
    
    def put(self, id:int ,values:dict)-> User:
        user=self.get(id)
        if user:
            for key, value in values.items():
                setattr(User, key, value)
            self.db.commit()
            self.db.refresh(user)
            return user
        return None