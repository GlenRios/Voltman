from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from Configurations.database import Base

class CompanyModel(Base):
    """
    Represents the Company model for the database.
    Contains columns for company details like `id`, `Limit`, `Increase`, `Extra_Percent`,
    and `Name`, and defines relationships with the `AreaModel`, `BillModel`, and `UserModel`.
    """

    id = Column(Integer, primary_key=True, autoincrement=True)  # Primary key for the company
    Limit = Column(Float, nullable=False, default=0)  # Consumption limit
    Increase = Column(Float, nullable=False, default=20)  # Increase percentage, to calculate the cost
    Extra_Percent = Column(Float, nullable=False, default=15)  # Extra percentage, to calculate the cost
    Reading = Column(Integer, default=0)  # The latest reading 
    Last_Reading = Column(Integer, default=0)  # The previous reading
    Type = Column(String, nullable=False, default="")  # Type of the company (could be a category)
    Name = Column(String, nullable=False, unique=True)  # Company name (must be unique)
    Addr = Column(String, nullable=False, unique=True, default="")  # Company address (unique)

    # Relationships with related models
    areas = relationship('AreaModel', back_populates='company')  # Areas related to this company
    bills = relationship('BillModel', back_populates='company')  # Bills related to this company
    people = relationship('UserModel', back_populates='company')  # Users associated with this company

