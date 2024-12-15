from infrastructure.repo.UserRepo import UserRepo
from main import db 
from domain.Entities.User import User

def get_users(user_id:int):
    user_repo=UserRepo(db)
    user=user_repo.get(user_id)
    company_id=user.CompanyID
    users=[]
    for item in user_repo.get_all(company_id):
        users.append((user_repo._tojson(item)))
    return users    

def add_user(user):  
    user_repo = UserRepo(db)
    return user_repo.post(user)

    