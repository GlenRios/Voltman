from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date, Boolean, Table
from sqlalchemy.orm import relationship, as_declarative
from sqlalchemy.ext.declarative import declared_attr

from Base import Base


# Entity: Area
class Area(Base):
    __tablename__ = 'area'
    
    AreaID = Column(Integer, primary_key=True, autoincrement=True)
    CompanyID = Column(Integer, ForeignKey('company.CompanyID'), nullable=False)
    Name = Column(String, nullable=False)
    Responsible = Column(String, nullable=False)

    company = relationship('Company', back_populates='areas')
    equipments = relationship('Equipment', back_populates='area')