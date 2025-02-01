from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from Configurations.db_configuration import Base

class GroupModel(Base):
    """
    Represents the Group model for the database.
    Contains columns for `id` and `Name`, and defines a relationship with the `UserModel`.
    """

    id = Column(Integer, primary_key=True, autoincrement=True)  # Primary key for the group
    Name = Column(String, nullable=False)  # Name of the group (e.g., Admin, User, etc.)

    # Relationship with UserModel to define which users belong to this group
    people = relationship('UserModel', back_populates='group')
