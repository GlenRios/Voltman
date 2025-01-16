from db.models.Equipment import EquipmentModel
from db.repos.BaseRepo import BaseRepo
from db.repos.AreaRepo import AreaRepo
from domain.Equipment import Equipment

class EquipmentRepo(BaseRepo):
    
    def __init__(self, db, area_repo):
        super().__init__(db, EquipmentModel)
        self.area_repo= area_repo

    
    def get_allInArea(self, idArea: int)->list[EquipmentModel]:
        return self.db.query(EquipmentModel).filter(EquipmentModel.AreaID==idArea).all()

    
    def to_Equipment(self, equipment: EquipmentModel)-> Equipment:
        area= equipment.area
        return Equipment(area.Name, 
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
                 'AverageDailyConsumption': values['AverageDailyConsumption'],
                 'MaintenanceStatus': values['MaintenanceStatus'],
                 'EnergyEfficience': values['EnergyEfficiency'],
                 'NominalCapacity': values['NominalCapacity'],
                 'EstimatedLifespan': values['EstimatedLifespan'],
                 'InstallationDate': values['InstallationDate'],
                 'UsageFrecuency': values['UsageFrecuency'],
                 'Type': values['Type'],
                 'Brand': values['Brand'],
                 'Model': values['Model'],
                 'CriticalEnergySystem': values['CriticalEnergySystem']}
