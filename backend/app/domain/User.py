class User:
    """
    Represents a User entity. Contains information about the user, 
    including their ID, username, password, company, and user group.
    """
    
    def __init__(self, id: int, password: str, username: str, company: str, group: str):
        """
        Initializes a new User instance with the provided parameters.
        """
        self.id = id  # Unique identifier for the user
        self.Username = username  # Username for login and identification
        self.Password = password  # User's password (should be hashed in production)
        self.Company = company  # Company the user belongs to
        self.Type = group  # User's role or group (e.g., Admin, Analyst)

    def as_dict(self) -> dict:
        """
        Converts the User instance into a dictionary representation.
        
        Useful for serialization, for example, when returning user data in an API response.
        
        Returns:
        - dict: A dictionary containing the user data (key-value pairs).
        """
        return {key: value for key, value in vars(self).items()}  # Converts all instance variables to a dictionary
