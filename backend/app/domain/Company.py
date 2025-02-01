class Company:
    """
    Represents a Company entity. Contains details about the company such as its name, 
    type, address, financial limits, and other related data.
    """
    
    def __init__(self, id: int, name: str, limit: int, type: str, addr: str, increase=20, extra_percent=15):
        """
        Initializes a new Company instance with the provided parameters.
        """
        self.id = id  # Unique identifier for the company
        self.Name = name  # Name of the company
        self.Limit = limit  # Consumption limit
        self.Type = type  # Type or classification of the company
        self.Addr = addr  # Address of the company
        self.Increase = increase  # Percentage increase for operations or limits
        self.Extra_Percent = extra_percent  # Additional percentage (e.g., for growth or adjustments)

    def as_dict(self) -> dict:
        """
        Converts the Company instance into a dictionary representation.
        
        Useful for serialization, such as when returning company data in an API response.
        
        Returns:
        - dict: A dictionary containing the company data (key-value pairs).
        """
        return {key: value for key, value in vars(self).items()}  # Converts all instance variables to a dictionary
