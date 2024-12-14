from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date, Boolean, Table
from sqlalchemy.orm import relationship, as_declarative
from sqlalchemy.ext.declarative import declared_attr

from infrastructure.db_conf import Base

# Entity: Permission
class Permission(Base):
    __tablename__ = 'permission'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    Tipo = Column(String, nullable=False)

    #groups = relationship('Group', secondary=Base.group_permission, back_populates='permissions')