from infrastructure.repo.UserRepo import UserRepo
from infrastructure.repo.CompanyRepo import CompanyRepo
from main import db 
from domain.Entities.User import User

def get_users(user_id: int)->list[dict]:
    user_repo=UserRepo(db)
    user= user_repo.get(user_id)
    if not user:
        return {"error": "User not found"}
    company_id= user.CompanyID
    users=[]
    for item in user_repo.get_all(company_id):
        users.append((user_repo._tojson(item)))
    return users    

def check_user_login(username:str, password:str):
    user_repo=UserRepo(db)
    user= user_repo.get_by_username(username)
    if not user:
        return {"error": "User not found"}
    if user.Password != password:
        return {"error": "wrong password"}
    return {"id": user.id}

def add_user(user)->dict:  
    values={}
    values['Username']=user['Username']
    values['Password']=user['Password']
    comp_repo=CompanyRepo(db)
    company=comp_repo.get_byName(user['Company'])
    company_id=company.id
    values['CompanyID']=company_id
    values['GroupID']=user['Type']
    user_repo = UserRepo(db)
    if user_repo.get_by_username(values["Username"]):
        return {"error":"Username "+values["Username"]+" is already in use"}
    user=user_repo.post(values)    
    return user_repo._tojson(user)

def modified_user(user, user_id)->dict:
    values={}
    values['Username']=user['Username']
    values['Password']=user['Password']
    comp_repo=CompanyRepo(db)
    company=comp_repo.get_byName(user['Company'])
    company_id=company.id
    values['CompanyID']=company_id
    values['GroupID']=user['Type']
    user_repo=UserRepo(db)
    aux_user=user_repo.get_by_username(values["Username"])
    if aux_user and aux_user.id!=user_id:
        return {"error":"Username "+values["Username"]+" is already in use"}   
    user=user_repo.put(user_id, values)
    return user_repo._tojson(user)


def delete_user(user_id):
    user_repo=UserRepo(db)
    return user_repo.delete(user_id)
    


    


    