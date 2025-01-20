from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date, Boolean, Table
from sqlalchemy.orm import relationship
from Configurations.db_configuration import Base

class CompanyModel(Base):

    id = Column(Integer, primary_key=True, autoincrement=True)
    Limit = Column(Float, nullable=False, default=0)
    Increase = Column(Float, nullable=False, default=20)
    Extra_Percent = Column(Float, nullable=False, default=15)
    Reading = Column(Integer, default=0)
    Last_Reading = Column(Integer, default=0)
    Type = Column(String, nullable=False, default="")
    Name = Column(String, nullable=False, unique=True)
    Addr = Column(String, nullable=False, unique=True, default="")

    areas = relationship('AreaModel', back_populates='company')
    bills = relationship('BillModel', back_populates='company')
    people = relationship('UserModel', back_populates='company')
