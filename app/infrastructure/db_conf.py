from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, as_declarative

# Crear motor de conexión
DATABASE_URL = "sqlite:///mi_base_de_datos.db"
engine = create_engine(DATABASE_URL, echo=True)

# Base para los modelos
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
    

# Crear sesión
SessionLocal = sessionmaker(bind=engine)

Base.metadata.create_all(bind=engine)