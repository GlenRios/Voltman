from controllers.__init__ import Iuser, Icompany
from Configurations.CustomError import CustomError

def login(values: dict):
    username= values['Username']
    password= values['Password']
    return Iuser.find_out(username, password)
    
def get(username: str):
    user= Iuser.get_by_username(username)
    name_company= user.Company
    users= Icompany.get_users(name_company)
    return Iuser.convert(users)

def post(values: dict):
    return Iuser.create(values)


def put(values: dict, id: int ):
    user = Iuser.get(id)
    if user['Password']== values['Password']:
        user['Password']= values['NewPassword']
        return Iuser.update(id, user)
    raise CustomError('Incorrect Password, cant update the user because password is not correct', 500)

def delete(id: int):
    return Iuser.delete(id)

