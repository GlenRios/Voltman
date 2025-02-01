from db.models.User import UserModel
from db.repos.BaseRepo import BaseRepo
from domain.User import User
from db.models.Group import GroupModel

class UserRepo(BaseRepo):
    
    # Initializes the repository and sets up additional repository dependencies (company_repo and group_repo)
    def __init__(self, db, company_repo):
        super().__init__(db, UserModel)  # Calls the parent constructor to initialize with the UserModel
        self.company_repo = company_repo  # Assigns the company repository to access company-related data
    
    # Retrieves a user by their username
    def get_by_username(self, name: str) -> UserModel:
        # Queries the database and returns the first user with the provided username
        return self.db.query(UserModel).filter(UserModel.Username == name).first()

    # Converts a UserModel instance to a domain User instance
    def to_User(self, user: UserModel) -> User:
        # Fetches the company and group related to this user
        company = self.company_repo.get(user.CompanyID)  # Gets the company using the company_repo
        group = user.group  # Fetches the group directly from the UserModel
        # Returns a domain User object using values from the UserModel and related entities
        return User(user.id, 
                    user.Password,
                    user.Username, 
                    company.Name, 
                    group.Name)
    
    # Retrieves all users from the database
    def get_all(self):
        # Returns all UserModel entries from the database
        return self.db.query(UserModel).all()

    # Converts the provided input dictionary into the format expected for creating/updating a UserModel
    def to_model(self, values: dict) -> dict:
        # Fetches the company and group ID based on the provided company name and group type
        company_id = self.company_repo.get_byName(values['Company']).id
        group_id = self.db.query(GroupModel).filter(GroupModel.Name== values['Type']).first().id
        # Returns a dictionary that maps the input values to the correct model fields
        return {'Username': values['Username'], 
                'Password': values['Password'], 
                'CompanyID': company_id, 
                'GroupID': group_id}


