from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date, Boolean, Table, DateTime
from sqlalchemy.orm import relationship
from Configurations.db_configuration import Base

class EquipmentModel(Base):

    id = Column(Integer, primary_key=True, autoincrement=True)
    AreaID = Column(Integer, ForeignKey('area_model.id'), nullable=False)
    AverageDailyConsumption = Column(Float, nullable=False, default=0)
    MaintenanceStatus = Column(String, nullable=False, default="")
    EnergyEfficiency = Column(Float, nullable=False, default=0)
    NominalCapacity = Column(Float, nullable=False, default=0)
    EstimatedLifespan = Column(Float, nullable=False, default=0)
    InstallationDate = Column(DateTime, nullable=False, default=datetime.now())
    UsageFrequency = Column(String, nullable=False, default="")
    Type = Column(String, nullable=False, default="")
    Brand = Column(String, nullable=False, default="")
    Model = Column(String, nullable=False, default="")
    CriticalEnergySystem = Column(String, nullable=False, default="")

    area = relationship('AreaModel', back_populates='equipments')
