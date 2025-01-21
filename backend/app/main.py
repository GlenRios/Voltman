from Configurations.db_configuration import init_db, SessionLocal
import os
from tests.Tester import Tester
from controllers import (
    user_controller as uc,
    company_controller as cc,
    area_controller as ac,
    equipment_controller as ec,
)


path= "app/tests/test.db"
if not os.path.exists(path):
    init_db()

tester= Tester()

from db.repos import UserRepo, CompanyRepo, AreaRepo, EquipmentRepo
from Use_Cases.Interfaces import IUser, ICompany, IArea, IEquipment

db= SessionLocal()

company_repo= CompanyRepo.CompanyRepo(db)
user_repo= UserRepo.UserRepo(db, company_repo)
area_repo = AreaRepo.AreaRepo(db, company_repo)
equipment_repo = EquipmentRepo.EquipmentRepo(db, area_repo)

Icompany= ICompany.ICompany(company_repo)
Iuser= IUser.IUser(user_repo)
Iarea = IArea.IArea(area_repo)
Iequipment = IEquipment.IEquipment(equipment_repo)

UC= uc.UserController(Iuser, Icompany)
CC= cc.CompanyController(Icompany)
AC= ac.AreaController(Iarea)
EC= ec.EquipmentController(Iequipment)

############test############
# list_companies=[]
# groups=['Admin', 'Manacher', 'Analyst']

# def create_companies(n: int):
#     companies= tester.create_companies(n)
#     for company in companies:
#         list_companies.append(company['Name'])
#         CC.post(company)

# def create_users(n: int):
#     users= tester.create_users(n, list_companies, groups)
#     for user in users:
#         UC.post(user)

# create_companies(6)
# create_users(30)
