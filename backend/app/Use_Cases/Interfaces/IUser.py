from domain.User import User
from db.repos.UserRepo import UserRepo
from Configurations.CustomError import CustomError

class IUser:
    """
    This service class provides the business logic layer for user management.
    It acts as an intermediary between the API layer and the repository layer.
    """

    def __init__(self, repo: UserRepo):
        """
        Initialize the IUser service with the provided User repository.
        :param repo: The User repository that handles data persistence.
        """
        self.repo = repo

    def create(self, values: dict) -> dict:
        """
        Creates a new user based on the provided data and returns the created user as a dictionary.
        Ensures that the username is unique before creating the user.
        :param values: The data used to create the new user.
        :return: The created user as a dictionary.
        """
        values = self.repo.to_model(values)  # Convert input data to model format
        user = self.repo.post(values, unique_fields=['Username'])  # Create user, ensuring unique username
        return self.repo.to_User(user).as_dict()  # Return the created user as a dictionary

    def get(self, id: int) -> dict:
        """
        Retrieves a user by their ID and returns their data as a dictionary.
        :param id: The ID of the user to retrieve.
        :return: The user as a dictionary.
        """
        user = self.repo.get(id)  # Fetch the user by ID from the repository
        return self.repo.to_User(user).as_dict()  # Convert to User entity and return as dict

    def delete(self, id: int):
        """
        Deletes a user by their ID.
        :param id: The ID of the user to delete.
        :return: None
        """
        return self.repo.delete(id)  # Delete the user from the repository

    def update(self, id: int, values: dict) -> dict:
        """
        Updates an existing user's data based on the provided values and returns the updated user as a dictionary.
        :param id: The ID of the user to update.
        :param values: The new values to update the user with.
        :return: The updated user as a dictionary.
        """
        values = self.repo.to_model(values)  # Convert input values to model format
        user = self.repo.put(id, values, ['Username'])  # Update user, ensuring unique username
        return self.repo.to_User(user).as_dict()  # Return the updated user as a dictionary

    def get_all(self):
        """
        Retrieves all users from the repository and returns them as a list of dictionaries.
        :return: A list of all users as dictionaries.
        """
        users = self.repo.get_all()  # Get all users from the repository
        return self.convert(users)  # Convert and return users as dictionaries

    def get_by_username(self, username: str):
        """
        Retrieves a user by their username and returns their data as a User entity.
        Raises an error if the user is not found.
        :param username: The username of the user to retrieve.
        :return: The User entity corresponding to the username.
        """
        user = self.repo.get_by_username(username)  # Fetch user by username
        if user:
            return self.repo.to_User(user)  # Return the user as a User entity
        raise CustomError('Incorrect username or password', 404)  # Raise error if user is not found

    def get_id(self, username: str):
        """
        Retrieves the ID of a user based on their username.
        :param username: The username of the user.
        :return: The ID of the user.
        """
        return self.repo.get_by_username(username).id  # Return the ID of the user based on username

    def find_out(self, username: str, password: str):
        """
        Verifies if a user exists and if the provided password matches the stored password.
        Raises an error if the username or password is incorrect.
        :param username: The username of the user.
        :param password: The password to check.
        :return: True if the user exists and the password matches, otherwise raises an error.
        """
        user = self.get_by_username(username)  # Get the user by username
        if password != user.Password:  # Compare passwords
            raise CustomError("Incorrect username or password", 404)  # Raise error if passwords don't match
        return True  # Return True if credentials are correct

    def convert(self, users):
        """
        Converts a list of UserModel instances into a list of User entities as dictionaries.
        :param users: A list of UserModel instances to convert.
        :return: A list of users as dictionaries.
        """
        return [self.repo.to_User(user).as_dict() for user in users]  # Convert and return as list of dictionaries
