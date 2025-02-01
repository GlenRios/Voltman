class Area:
    """
    Represents an Area entity. Contains information about a specific area within a company,
    including its ID, company, name, and the responsible person for the area.
    """

    def __init__(self, id: int, company: str, name: str, responsible: str):
        """
        Initializes a new Area instance with the provided parameters.
        """
        self.id = id  # Unique identifier for the area
        self.Company = company  # The company that owns or is responsible for the area
        self.Name = name  # The name of the area (e.g., "Sales", "Operations")
        self.Responsible = responsible  # The person or role in charge of the area

    def as_dict(self) -> dict:
        """
        Converts the Area instance into a dictionary representation.

        Useful for serialization, such as when returning area data in an API response.

        Returns:
        - dict: A dictionary containing the area data (key-value pairs).
        """
        return {key: value for key, value in vars(self).items()}  # Converts all instance variables to a dictionary
