from app.db.models.Equipment import EquipmentModel
from app.db.repos.BaseRepo import BaseRepo
from app.db.repos.AreaRepo import AreaRepo
from app.domain.Equipment import Equipment
import datetime

class EquipmentRepo(BaseRepo):
    
    # Initializes the repository with the database session, the EquipmentModel, and the AreaRepo instance
    def __init__(self, area_repo: AreaRepo):
        super().__init__(EquipmentModel)  # Calls the parent constructor to initialize with EquipmentModel
        self.area_repo = area_repo  # Assigns the AreaRepo to access area-related data
    
    # Converts an EquipmentModel instance (from the database) to a domain Equipment instance
    def to_Equipment(self, equipment: EquipmentModel) -> Equipment:
        area = equipment.area  # Retrieves the area related to the equipment
        # Returns a domain Equipment object using values from the EquipmentModel and the associated area
        return Equipment(equipment.id,
                         area.Name, 
                         equipment.AverageDailyConsumption, 
                         equipment.MaintenanceStatus, 
                         equipment.EnergyEfficiency, 
                         equipment.NominalCapacity, 
                         equipment.EstimatedLifespan, 
                         equipment.InstallationDate, 
                         equipment.UsageFrequency, 
                         equipment.Type, equipment.Brand, 
                         equipment.Model, equipment.CriticalEnergySystem)
    
    # Converts the provided input dictionary into the format expected for creating/updating an EquipmentModel
    def to_model(self, values: dict) -> dict:
        # Retrieves the area ID by fetching the area using the area_repo and matching it by company and area names
        area_id = self.area_repo.get_by_company(values['Area'], values['Company']).id
        # Returns a dictionary mapping the input values to the correct model fields, with default values if fields are missing
        return { 'AreaID': area_id,
                 'AverageDailyConsumption': values['Average_Daily_Consumption'] if values.__contains__('Average_Daily_Consumption') else 0,
                 'MaintenanceStatus': values['Maintenance_Status'] if values.__contains__('Maintenance_Status') else "",
                 'EnergyEfficiency': values['Energy_Efficiency'] if values.__contains__('Energy_Efficiency') else 0,
                 'NominalCapacity': values['Nominal_Capacity'] if values.__contains__('Nominal_Capacity') else 0,
                 'EstimatedLifespan': values['Estimated_Lifespan'] if values.__contains__('Estimated_Lifespan') else 0,
                 'InstallationDate': values['Installation_Date'] if values.__contains__('Installation_Date') else datetime.now(),
                 'UsageFrequency': values['Usage_Frequency'] if values.__contains__('Usage_Frequency') else "",
                 'Type': values['Type'] if values.__contains__('Type') else "",
                 'Brand': values['Brand'] if values.__contains__('Brand') else "",
                 'Model': values['Model'] if values.__contains__('Model') else "",
                 'CriticalEnergySystem': values['CriticalEnergySystem'] if values.__contains__('CriticalEnergySystem') else ""}

