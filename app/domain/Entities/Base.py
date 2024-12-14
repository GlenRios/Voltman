from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date, Boolean, Table
from sqlalchemy.orm import relationship, as_declarative
from sqlalchemy.ext.declarative import declared_attr

from app.infrastructure.db_conf import Base
    # Association Table: Group Permission
group_permission = Table(
    'group_permission', Base.metadata,
    Column('GroupID', Integer, ForeignKey('group.GroupID'), primary_key=True),
    Column('PermissionID', Integer, ForeignKey('permission.PermissionID'), primary_key=True)
)