from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date, Boolean, Table
from sqlalchemy.orm import relationship
from Configurations.db_configuration import Base

class EquipmentModel(Base):

    id = Column(Integer, primary_key=True, autoincrement=True)
    AreaID = Column(Integer, ForeignKey('area_model.id'), nullable=False)
    AverageDailyConsumption = Column(Float, nullable=False)
    MaintenanceStatus = Column(String, nullable=False)
    EnergyEfficiency = Column(Float, nullable=False)
    NominalCapacity = Column(Float, nullable=False)
    EstimatedLifespan = Column(Float, nullable=False)
    InstallationDate = Column(Date, nullable=False)
    UsageFrequency = Column(String, nullable=False)
    Type = Column(String, nullable=False)
    Brand = Column(String, nullable=False)
    Model = Column(String, nullable=False)
    CriticalEnergySystem = Column(String, nullable=False)

    area = relationship('AreaModel', back_populates='equipments')
