from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date, Boolean, Table
from sqlalchemy.orm import relationship
from Configurations.db_configuration import Base, group_permission

class GroupModel(Base):
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    Name = Column(String, nullable=False)

    permissions = relationship('PermissionModel', secondary= group_permission, back_populates='groups')
    people = relationship('UserModel', back_populates='group')