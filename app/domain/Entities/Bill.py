from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date, Boolean, Table
from sqlalchemy.orm import relationship, as_declarative
from sqlalchemy.ext.declarative import declared_attr
from infrastructure.db_conf import Base

# Entity: Bill
class Bill(Base):
    __tablename__ = 'bill'
    
    BillDate = Column(Date, primary_key=True)
    CompanyID = Column(Integer, ForeignKey('company.id'), primary_key=True)
    Reading = Column(Float, nullable=False)
    Cost = Column(Float, nullable=False)
    OverLimit = Column(Boolean, nullable=False)

    company = relationship('Company', back_populates='bills')