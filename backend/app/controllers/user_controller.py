from Configurations.CustomError import CustomError

class UserController:

    def __init__(self, iuser, icompany):
        self.Iuser= iuser
        self.Icompany= icompany

    def login(self, values: dict):
        username= values['Username']
        password= values['Password']
        return self.Iuser.find_out(username, password)
        
    def get(self, username: str):
        if username=='SuperAdmin':
            users= self.Iuser.get_all()
            return users
        user= self.Iuser.get_by_username(username)
        name_company= user.Company
        users= self.Icompany.get_users(name_company)
        return self.Iuser.convert(users)

    def post(self, values: dict):
        return self.Iuser.create(values)


    def put(self, values: dict, id: int ):
        user = self.Iuser.get(id)
        if user['Password']== values['Password']:
            user['Username']= values['Username']
            if values['NewPassword']:
                user['Password']= values['NewPassword'] 
            return self.Iuser.update(id, user)
        raise CustomError('Incorrect Password, cant update the user because password is not correct', 500)

    def delete(self, id: int):
        return self.Iuser.delete(id)

