from datetime import date

class Equipment:
    """
    Represents an Equipment entity. Contains information about a specific piece of equipment, 
    including its ID, associated area, consumption details, maintenance status, energy efficiency, 
    and other relevant attributes for managing the equipment in the system.
    """

    def __init__(self, id: int, area: str, average_daily_consumption: float, maintenance_status: str, energy_efficiency: float, nominal_capacity: float, estimated_lifespan: float, installation_date: date, usage_frequency: str, type: str, brand: str, model: str, criticalEnergySystem: str):
        self.id = id  # Unique identifier for the equipment
        self.Area = area  # The area where the equipment is installed
        self.Average_Daily_Consumption = average_daily_consumption  # The average daily consumption of the equipment (e.g., kWh)
        self.Maintenance_Status = maintenance_status  # Current maintenance status (e.g., "Operational", "Under Repair")
        self.Energy_Efficiency = energy_efficiency  # Efficiency rating (e.g., percentage of energy converted to useful work)
        self.Nominal_Capacity = nominal_capacity  # The equipment's rated capacity (e.g., in watts or similar units)
        self.Estimated_Lifespan = estimated_lifespan  # Estimated lifespan of the equipment in years or hours
        self.Installation_Date = installation_date  # The date the equipment was installed
        self.Usage_Frequency = usage_frequency  # How frequently the equipment is used (e.g., "Daily", "Weekly")
        self.Type = type  # The type or category of equipment (e.g., "HVAC", "Lighting")
        self.Brand = brand  # The brand of the equipment (e.g., "GE", "Siemens")
        self.Model = model  # The model of the equipment
        self.CriticalEnergySystem = criticalEnergySystem  # A flag indicating if the equipment is part of a critical energy system

    def as_dict(self) -> dict:
        """
        Converts the Equipment instance into a dictionary representation.

        Useful for serialization, such as when returning equipment data in an API response.

        Returns:
        - dict: A dictionary containing the equipment data (key-value pairs).
        """
        return {key: str(value) for key, value in vars(self).items()}  # Converts all instance variables to a dictionary, converting values to strings
