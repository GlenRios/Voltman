from infrastructure.repo.UserRepo import UserRepo
from infrastructure.repo.CompanyRepo import CompanyRepo
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
    values={}
    values['Username']=user['Username']
    values['Password']=user['Password']
    comp_repo=CompanyRepo(db)
    company=comp_repo.get_byName(user['Company'])
    company_id=company.id
    values['CompanyID']=company_id
    values['GroupID']=user['Type']
    user_repo = UserRepo(db)
    user=user_repo.post(values)    
    return user_repo._tojson(user)

def modified_user(user):
    values={}
    values['Username']=user['Username']
    values['Password']=user['Password']
    comp_repo=CompanyRepo(db)
    company=comp_repo.get_byName(user['Company'])
    company_id=company.id
    values['CompanyID']=company_id
    values['GroupID']=user['Type']
    user_repo=UserRepo(db)
    user=user_repo.put(user.id, values)
    if user:
        return user_repo._tojson(user)
    return None
    


    