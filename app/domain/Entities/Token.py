from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date, Boolean, Table
from sqlalchemy.orm import relationship, as_declarative
from sqlalchemy.ext.declarative import declared_attr

from Base import Base


class Token(Base):
    __tablename__='token'

    value = Column(String, nullable=False)
    user_id = Column(
        None,
        ForeignKey("user.id"),
    )
    user = relationship(
        'User',
        back_populates="token",
        single_parent=True
        )