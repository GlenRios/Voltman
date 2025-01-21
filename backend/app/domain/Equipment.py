from datetime import datetime

class Equipment:

    def __init__(self,id: int, area: str, average_daily_consumption: float, maintenance_status: str, energy_efficiency: float, nominal_capacity: float, estimated_lifespan: float, installation_date: datetime, usage_frequency: str, type: str, bran: str, model: str, criticalEnergySystem: str):
        self.id= id
        self.Area= area
        self.Average_Daily_Consumption= average_daily_consumption
        self.Maintenance_Status= maintenance_status
        self.Energy_Efficiency= energy_efficiency
        self.Nominal_Capacity= nominal_capacity
        self.Estimated_Lifespan= estimated_lifespan
        self.Installation_Date= installation_date
        self.Usage_Frequency= usage_frequency
        self.Type= type
        self.Bran= bran
        self.Model= model
        self.CriticalEnergySystem= criticalEnergySystem

    def as_dict(self)-> dict:
        return {key: value for key, value in vars(self).items()}