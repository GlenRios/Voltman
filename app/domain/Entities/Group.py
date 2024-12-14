from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date, Boolean, Table
from sqlalchemy.orm import relationship, as_declarative
from sqlalchemy.ext.declarative import declared_attr

from Base import Base

# Entity: Group
class Group(Base):
    __tablename__ = 'group'
    
    GroupID = Column(Integer, primary_key=True, autoincrement=True)
    Name = Column(String, nullable=False)

    permissions = relationship('Permission', secondary=Base.group_permission, back_populates='groups')
    people = relationship('Person', back_populates='group')