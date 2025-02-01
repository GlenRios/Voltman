from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from Configurations.db_configuration import Base

class UserModel(Base):
    """
    Represents the User model for the database.
    Contains columns for `id`, `Username`, `Password`, `CompanyID`, and `GroupID`,
    and defines relationships with `CompanyModel` and `GroupModel`.
    """

    id = Column(Integer, primary_key=True, autoincrement=True)  # Primary key
    Username = Column(String, nullable=False, unique=True)  # Unique username
    Password = Column(String, nullable=False)  # User's password
    CompanyID = Column(Integer, ForeignKey('company_model.id'), nullable=False)  # Foreign key to CompanyModel
    GroupID = Column(Integer, ForeignKey('group_model.id'), nullable=False)  # Foreign key to GroupModel

    # Relationships to the related models
    company = relationship('CompanyModel', back_populates='people')
    group = relationship('GroupModel', back_populates='people')
