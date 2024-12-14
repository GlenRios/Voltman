from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, as_declarative,declarative_base
from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date, Boolean, Table

DATABASE_URL = "sqlite:///./test.db" 

engine = create_engine(DATABASE_URL, echo=True)  # `echo=True` muestra las consultas SQL
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
@as_declarative()
class Base:

    def as_dict(self):
        """
        I won't recursively serialialize all related fields because it will cause trouble
        with circular dependencies (for example, in Location, Paths can lead eventually to the same Location)
        """
        return {
            column: getattr(self, column) for column in self.__table__.columns.keys()
        }

    def __str__(self):
        return f"[ {self.__class__.__name__} ] ({self.as_dict()})"

    def __repr__(self):
        return self.__str__()
    
        # Association Table: Group Permission
    # group_permission = Table(
    #     'group_permission', Base.metadata,
    #     Column('GroupID', Integer, ForeignKey('group.id'), primary_key=True),
    #     Column('PermissionID', Integer, ForeignKey('permission.id'), primary_key=True)
    # )
    






