from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base, as_declarative, declared_attr
from sqlalchemy.orm import scoped_session, sessionmaker
import re

# Configuración de la base de datos SQLite
DATABASE_URL = "sqlite:///app/tests/test.db" 

# Creación del motor de base de datos
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# Creación de una sesión única usando scoped_session
SessionLocal = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))

# Definir una Base personalizada para los modelos
Base = declarative_base()

Base.metadata.bind = engine  

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
