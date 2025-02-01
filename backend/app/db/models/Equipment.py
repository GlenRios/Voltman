from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from Configurations.db_configuration import Base

class EquipmentModel(Base):
    """
    Represents the Equipment model for the database.
    Contains columns for various equipment properties like `id`, `AreaID`, `AverageDailyConsumption`,
    and `MaintenanceStatus`, and defines a relationship with the `AreaModel`.
    """

    id = Column(Integer, primary_key=True, autoincrement=True)  # Primary key for the equipment
    AreaID = Column(Integer, ForeignKey('area_model.id'), nullable=False)  # Foreign key to AreaModel
    AverageDailyConsumption = Column(Float, nullable=False, default=0)  # Average daily consumption in kWh or similar
    MaintenanceStatus = Column(String, nullable=False, default="")  # Status of equipment's maintenance
    EnergyEfficiency = Column(Float, nullable=False, default=0)  # Energy efficiency rating (0 to 1)
    NominalCapacity = Column(Float, nullable=False, default=0)  # Nominal capacity (e.g., in kW)
    EstimatedLifespan = Column(Float, nullable=False, default=0)  # Estimated lifespan of the equipment (in years)
    InstallationDate = Column(DateTime, nullable=False, default=datetime.now())  # Date of installation
    UsageFrequency = Column(String, nullable=False, default="")  # Frequency of use (e.g., "daily", "weekly")
    Type = Column(String, nullable=False, default="")  # Type of the equipment (e.g., "air_conditioner")
    Brand = Column(String, nullable=False, default="")  # Equipment brand
    Model = Column(String, nullable=False, default="")  # Model name or number
    CriticalEnergySystem = Column(String, nullable=False, default="")  # Whether this equipment is part of critical energy systems

    # Relationship to AreaModel to define which area the equipment belongs to
    area = relationship('AreaModel', back_populates='equipments')

