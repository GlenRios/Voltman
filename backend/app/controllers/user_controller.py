from Configurations.CustomError import CustomError

class UserController:
    
    # Initialize the controller with interfaces for user and company operations
    def __init__(self, iuser, icompany):
        self.Iuser = iuser  # Interface for user operations
        self.Icompany = icompany  # Interface for company operations

    # Login method: checks the user credentials (username and password)
    def login(self, values: dict):
        username = values['Username']
        password = values['Password']
        # Calls the IUser interface to verify the username and password
        return self.Iuser.find_out(username, password)
        
    # Get all users in the company. For 'SuperAdmin', get all users.
    def get_all_in_company(self, username: str):
        # If the user is 'SuperAdmin', return all users
        if username == 'SuperAdmin':
            users = self.Iuser.get_all()
            users = [item for item in users if item['Username'] != username]
            return users
        # Otherwise, get the company associated with the user
        user = self.Iuser.get_by_username(username)
        name_company = user.Company
        # Get users from that company
        users = self.Icompany.get_users(name_company)
        users = self.Iuser.convert(users)  # Converts the list of users to dictionaries
        users = [item for item in users if item['Username'] != username]
        return users
    
    # Get user by username
    def get(self, username: str):
        return self.Iuser.get_by_username(username)

    # Create a new user
    def post(self, values: dict):
        return self.Iuser.create(values)
    
    # Check if the user has the correct role and permission
    def protected(self, role: str, permission: str):
        permissions = self.Iuser.get_permissions(role)
        if permissions not in permissions:
            return False  # User doesn't have the required permission
        return True  # User has the required permission

    # Update user information if the current password matches
    def put(self, values: dict, id: int):
        # Get the user by their ID
        user = self.Iuser.get(id)
        if user['Password'] == values['Password']:
            # If password is correct, update it with the new one if provided
            if values['NewPassword']:
                values['Password'] = values['NewPassword']
            return self.Iuser.update(id, values)
        # If the password doesn't match, raise an error
        raise CustomError('Incorrect Password, cant update the user because password is not correct', 500)

    # Delete a user by their ID
    def delete(self, id: int):
        return self.Iuser.delete(id)
