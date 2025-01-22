from sqlalchemy import create_engine
import re, os
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.orm import as_declarative, sessionmaker, declarative_base
from sqlalchemy import Table, Column, Integer, ForeignKey

DATABASE_URL = "sqlite:///app/tests/test.db" 
TEST_DB_URL = "sqlite:///app/tests/unit_test.db"
engine = create_engine(DATABASE_URL, echo=True)  # `echo=True` muestra las consultas SQL
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

@as_declarative()
class Base:
    """Automated table name, surrogate pk, and serializing"""

    @declared_attr
    def __tablename__(cls):  # pylint: --disable=no-self-argument
        cls_name = cls.__name__
        table_name = list(cls_name)
        for index, match in enumerate(re.finditer("[A-Z]", cls_name[1:])):
            table_name.insert(match.end() + index, "_")
        table_name = "".join(table_name).lower()
        return table_name

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
    


group_permission = Table(
    'group_permission', Base.metadata,
    Column('GroupID', Integer, ForeignKey('group_model.id'), primary_key=True),
    Column('PermissionID', Integer, ForeignKey('permission_model.id'), primary_key=True)
)

    
from db.models import User, Company, Area, Bill, Permission, Group, Equipment

def init_db():
    db_file = "app/tests/test.db"

    if os.path.exists(db_file):
        os.remove(db_file)

    Base.metadata.create_all(bind= engine)

    db= SessionLocal()
    permissions= [
        Permission.PermissionModel(Type= 'users'),
        Permission.PermissionModel(Type= 'bills'),
        Permission.PermissionModel(Type= 'branches'),
        Permission.PermissionModel(Type= 'consult'),
    ]
    
    groups=[
        Group.GroupModel(Name= 'SuperAdmin'),
        Group.GroupModel(Name= 'Admin'),
        Group.GroupModel(Name= 'Manacher'),
        Group.GroupModel(Name= 'Analyst'),
    ]

    db.add_all(groups)
    db.add_all(permissions)

    company= Company.CompanyModel(Limit= 100.0, Increase= 20.0, Extra_Percent= 15.0, Type= 'type0', Name= 'company0', Addr= 'addr0')        
    db.add(company)
    db.commit()

    super_user= User.UserModel(Username= 'SuperAdmin', Password= 'voltman000', CompanyID= 1, GroupID= 1)
    db.add(super_user)
    db.commit()

    db.close()




