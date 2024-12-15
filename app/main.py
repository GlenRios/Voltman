
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
from tests.tester_db import Tester
from controllers import get_users

# # Ruta al archivo de la base de datos
# db_file = "app/tests/test.db"

# # Verificar si el archivo existe y eliminarlo
# if os.path.exists(db_file):
#     os.remove(db_file)

# # Crear todas las tablas definidas en los modelos
# Base.metadata.create_all(bind=engine)

# def init_Groups():
#     group1= Group(Name='Analyst')
#     group2= Group(Name='Manacher')
#     group3= Group(Name='Admin')
#     db.add(group1)
#     db.add(group2)
#     db.add(group3)
#     db.commit()
    
db=SessionLocal()

# init_Groups()
# user_repo=UserRepo(db)
# company_repo=CompanyRepo(db)

# company_repo.post(20,'Type1','Company1','Address1')

# tester= Tester()
# users=tester.create_users(20)

# for item in users:
#     user_repo.post(item)


