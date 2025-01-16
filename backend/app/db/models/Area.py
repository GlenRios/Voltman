from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from Configurations.db_configuration import Base


class AreaModel(Base):
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    CompanyID = Column(Integer, ForeignKey('company_model.id'), nullable=False)
    Name = Column(String, nullable=False)
    Responsible = Column(String, nullable=False)

    company = relationship('CompanyModel', back_populates='areas')
    equipments = relationship('EquipmentModel', back_populates='area')
