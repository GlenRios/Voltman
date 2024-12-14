
from infrastructure.repo.UserRepo import UserRepo
from infrastructure.repo.CompanyRepo import CompanyRepo
from infrastructure.db_conf import engine, Base
from domain.Entities.User import User
from domain.Entities.Company import Company
from domain.Entities.Group import Group
from domain.Entities.Permission import Permission
from domain.Entities.Area import Area
from domain.Entities.Equipment import Equipment
from domain.Entities.Bill import Bill
from domain.Entities.Token import Token
from infrastructure.db_conf import SessionLocal
import os

# Ruta al archivo de la base de datos
db_file = "./test.db"

# Verificar si el archivo existe y eliminarlo
if os.path.exists(db_file):
    os.remove(db_file)

# Crear todas las tablas definidas en los modelos
Base.metadata.create_all(bind=engine)
db=SessionLocal()
