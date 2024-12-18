
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

# Ruta al archivo de la base de datos
db_file = "app/tests/test.db"

# Verificar si el archivo existe y eliminarlo
if os.path.exists(db_file):
    os.remove(db_file)

# Crear todas las tablas definidas en los modelos
Base.metadata.create_all(bind=engine)

def init_Groups():
    group1= Group(Name='Analyst')
    group2= Group(Name='Manacher')
    group3= Group(Name='Admin')
    db.add(group1)
    db.add(group2)
    db.add(group3)
    db.commit()
    
db=SessionLocal()

init_Groups()
user_repo=UserRepo(db)
company_repo=CompanyRepo(db)

values=[{'Limit':20,'Name':'Company1', 'Type':'Type1', 'Address':'Address1','Increase':20,'ExtraPercentage':20},
        {'Limit':20,'Name':'Company2', 'Type':'Type2', 'Address':'Address2','Increase':20,'ExtraPercentage':20},
        {'Limit':20,'Name':'Company3', 'Type':'Type3', 'Address':'Address3','Increase':20,'ExtraPercentage':20}]
for val in values:
    company_repo.post(val)

tester = Tester()
users = tester.create_users(50)

for item in users:
    user_repo.post(item)
 


