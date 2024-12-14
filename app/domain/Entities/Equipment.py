from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date, Boolean, Table
from sqlalchemy.orm import relationship, as_declarative
from sqlalchemy.ext.declarative import declared_attr

from infrastructure.db_conf import Base

# Entity: Equipment
class Equipment(Base):
    __tablename__ = 'equipment'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    AreaID = Column(Integer, ForeignKey('area.id'), nullable=False)
    AverageDailyConsumption = Column(Float, nullable=False)
    MaintenanceStatus = Column(String, nullable=False)
    EnergyEfficiency = Column(Float, nullable=False)
    NominalCapacity = Column(Float, nullable=False)
    EstimatedLifespan = Column(Float, nullable=False)
    InstallationDate = Column(Date, nullable=False)
    UsageFrequency = Column(String, nullable=False)
    EquipmentType = Column(String, nullable=False)
    Brand = Column(String, nullable=False)
    Model = Column(String, nullable=False)
    CriticalEnergySystem = Column(String, nullable=False)

    area = relationship('Area', back_populates='equipments')
