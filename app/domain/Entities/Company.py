from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date, Boolean, Table
from sqlalchemy.orm import relationship, as_declarative
from sqlalchemy.ext.declarative import declared_attr
from infrastructure.db_conf import Base

# Entity: Company
class Company(Base):
    __tablename__ = 'company'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    Limit = Column(Float, nullable=False)
    Increase = Column(Float, nullable=False)
    ExtraPercentage = Column(Float, nullable=False)
    Type = Column(String, nullable=False)
    Name = Column(String, nullable=False)
    Address = Column(String, nullable=False)

    areas = relationship('Area', back_populates='company')
    bills = relationship('Bill', back_populates='company')
    people = relationship('User', back_populates='company')