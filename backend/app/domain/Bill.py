from datetime import date

class Bill:
    """
    Represents a Bill entity. Contains information about a billing record, including 
    the bill's ID, the date it was issued, associated company, reading values, 
    daily consumption, and the total cost.
    """

    def __init__(self, id: int, date: date, company: str, reading: float, daily_consumption: float, cost: float):
        """
        Initializes a new Bill instance with the provided parameters.
        """
        self.id = id  # Unique identifier for the bill
        self.Date = date  # Date the bill was issued (in 'date' format)
        self.Company = company  # Company associated with the bill
        self.Reading = reading  # Reading value recorded (e.g., meter reading)
        self.DailyConsumption = daily_consumption  # The daily consumption recorded
        self.Cost = cost  # The total cost of the bill

    def as_dict(self) -> dict:
        """
        Converts the Bill instance into a dictionary representation.

        Useful for serialization, such as when returning bill data in an API response.

        Returns:
        - dict: A dictionary containing the bill data (key-value pairs).
        """
        return {key: value for key, value in vars(self).items()}  # Converts all instance variables to a dictionary

