from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date, DateTime, Boolean, Table
from sqlalchemy.orm import relationship
from Configurations.db_configuration import Base

class BillModel(Base):
    """
    Represents the Bill model for the database.
    Contains columns for bill details like `BillDate`, `Reading`, `DailyConsumption`, `Cost`,
    and `OverLimit`, and defines a relationship with the `CompanyModel`.
    """

    id = Column(Integer, primary_key=True, autoincrement=True)  # Primary key for the bill record
    BillDate = Column(Date, nullable=False)  # The date the bill was issued
    CompanyID = Column(Integer, ForeignKey('company_model.id'), nullable=False)  # Foreign key to link this bill to a company
    Reading = Column(Float, nullable=False)  # Reading value associated with the bill (e.g., electricity meter reading)
    DailyConsumption = Column(Float, nullable=False)  # The daily consumption recorded for the company
    Cost = Column(Float, nullable=False)  # The cost of the consumption
    OverLimit = Column(Integer, default=0, nullable=False)  # Flag to indicate if the company went over the consumption limit (default 0)

    # Relationship with the CompanyModel, linking each bill to a company
    company = relationship('CompanyModel', back_populates='bills')

