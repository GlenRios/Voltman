from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date, Boolean, Table
from sqlalchemy.orm import relationship, as_declarative
from sqlalchemy.ext.declarative import declared_attr
from Configurations.db_configuration import Base

class UserModel(Base):
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    Username = Column(String, nullable=False, unique=True)
    Password = Column(String, nullable=False)
    CompanyID = Column(Integer, ForeignKey('company_model.id'), nullable=False)
    GroupID = Column(Integer, ForeignKey('group_model.id'), nullable=False)

    company = relationship('CompanyModel', back_populates='people')
    group = relationship('GroupModel', back_populates='people')