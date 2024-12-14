from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date, Boolean, Table
from sqlalchemy.orm import relationship, as_declarative
from sqlalchemy.ext.declarative import declared_attr
from infrastructure.db_conf import Base
# Entity: Person
class User(Base):
    __tablename__ = 'user'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    Username = Column(String, nullable=False)
    Password = Column(String, nullable=False)
    CompanyID = Column(Integer, ForeignKey('company.id'), nullable=False)
    GroupID = Column(Integer, ForeignKey('group.id'), nullable=False)

    company = relationship('Company', back_populates='people')
    group = relationship('Group', back_populates='people')
    ##token = relationship('Token', uselist=False, back_populates="people")