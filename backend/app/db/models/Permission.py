from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date, Boolean, Table
from sqlalchemy.orm import relationship
from Configurations.db_configuration import Base, group_permission

class PermissionModel(Base):
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    Type = Column(String, nullable=False)

    groups = relationship('GroupModel', secondary=group_permission , back_populates='permissions')