from db.models.Equipment import EquipmentModel
from db.repos.BaseRepo import BaseRepo
from db.repos.AreaRepo import AreaRepo
from domain.Equipment import Equipment
import datetime

class EquipmentRepo(BaseRepo):
    
    def __init__(self, db, area_repo):
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
                 'AverageDailyConsumption': values['AverageDailyConsumption'] if values.__contains__ ('AverageDailyConsumption') else 0,
                 'MaintenanceStatus': values['MaintenanceStatus']if values.__contains__ ('MaintenanceStatus') else "",
                 'EnergyEfficience': values['EnergyEfficiency']if values.__contains__ ('EnergyEfficiency') else 0,
                 'NominalCapacity': values['NominalCapacity']if values.__contains__ ('NominalCapacity') else 0,
                 'EstimatedLifespan': values['EstimatedLifespan']if values.__contains__ ('EtimatedLifespan') else 0,
                 'InstallationDate': values['InstallationDate']if values.__contains__ ('InstallationDate') else datetime.now(),
                 'UsageFrecuency': values['UsageFrecuency']if values.__contains__ ('UsageFrecuency') else "",
                 'Type': values['Type']if values.__contains__ ('Type') else "",
                 'Brand': values['Brand']if values.__contains__ ('Brand') else "",
                 'Model': values['Model']if values.__contains__ ('Model') else "",
                 'CriticalEnergySystem': values['CriticalEnergySystem']if values.__contains__ ('CriticalEnergySystem') else ""}
