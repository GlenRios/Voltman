from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date, Boolean, Table
from sqlalchemy.orm import relationship
from Configurations.db_configuration import Base

class BillModel(Base):
    
    id= Column(Integer, primary_key=True, autoincrement= True)
    BillDate = Column(Date, nullable= False)
    CompanyID = Column(Integer, ForeignKey('company_model.id'), nullable= False)
    Reading = Column(Float, nullable=False)
    Cost = Column(Float, nullable=False)
    OverLimit = Column(Boolean, nullable=False)

    company = relationship('CompanyModel', back_populates='bills')