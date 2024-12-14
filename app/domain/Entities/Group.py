from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date, Boolean, Table
from sqlalchemy.orm import relationship, as_declarative
from sqlalchemy.ext.declarative import declared_attr

from infrastructure.db_conf import Base

# Entity: Group
class Group(Base):
    __tablename__ = 'group'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    Name = Column(String, nullable=False)

    #permissions = relationship('Permission', secondary=Base.group_permission, back_populates='groups')
    people = relationship('User', back_populates='group')