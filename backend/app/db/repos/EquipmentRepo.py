from db.models.Equipment import EquipmentModel
from db.repos.BaseRepo import BaseRepo
from db.repos.AreaRepo import AreaRepo
from domain.Equipment import Equipment
import datetime

class EquipmentRepo(BaseRepo):
    
    def __init__(self, db, area_repo: AreaRepo):
        super().__init__(db, EquipmentModel)
        self.area_repo= area_repo
    
    def to_Equipment(self, equipment: EquipmentModel)-> Equipment:
        area= equipment.area
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
    
   
    def to_model(self, values: dict)-> dict:
        area_id= self.area_repo.get_by_company(values['Area'], values['Company']).id
        return { 'AreaID': area_id,
                 'AverageDailyConsumption': values['Average_Daily_Consumption'] if values.__contains__ ('Average_Daily_Consumption') else 0,
                 'MaintenanceStatus': values['Maintenance_Status']if values.__contains__ ('Maintenance_Status') else "",
                 'EnergyEfficiency': values['Energy_Efficiency']if values.__contains__ ('Energy_Efficiency') else 0,
                 'NominalCapacity': values['Nominal_Capacity']if values.__contains__ ('Nominal_Capacity') else 0,
                 'EstimatedLifespan': values['Estimated_Lifespan']if values.__contains__ ('Etimated_Lifespan') else 0,
                 'InstallationDate': values['Installation_Date']if values.__contains__ ('Installation_Date') else datetime.now(),
                 'UsageFrequency': values['Usage_Frequency']if values.__contains__ ('Usage_Frequency') else "",
                 'Type': values['Type']if values.__contains__ ('Type') else "",
                 'Brand': values['Brand']if values.__contains__ ('Brand') else "",
                 'Model': values['Model']if values.__contains__ ('Model') else "",
                 'CriticalEnergySystem': values['CriticalEnergySystem']if values.__contains__ ('CriticalEnergySystem') else ""}
