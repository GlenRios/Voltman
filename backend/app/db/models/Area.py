from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from Configurations.db_configuration import Base

class AreaModel(Base):
    """
    Represents an Area within a company. Contains information about the area such as its `Name`, 
    the `Responsible` person, and links it to the `CompanyModel` and `EquipmentModel`.
    """

    id = Column(Integer, primary_key=True, autoincrement=True)  # Primary key for the area record
    CompanyID = Column(Integer, ForeignKey('company_model.id'), nullable=False)  # Foreign key linking the area to a company
    Name = Column(String, nullable=False)  # Name of the area (e.g., 'Office', 'Warehouse')
    Responsible = Column(String, nullable=False)  # Person responsible for the area

    # Relationship with the CompanyModel, linking each area to a company
    company = relationship('CompanyModel', back_populates='areas')
    
    # Relationship with the EquipmentModel, linking the area to multiple equipment records
    equipments = relationship('EquipmentModel', back_populates='area')

