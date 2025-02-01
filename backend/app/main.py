from Configurations.db_configuration import init_db, SessionLocal
import os
from datetime import datetime, timedelta, date
from tests.Tester import Tester
from controllers import (
    user_controller as uc,
    company_controller as cc,
    area_controller as ac,
    equipment_controller as ec,
    bill_controller as bc
)

# from tests.test_db import build_test_db
# build_test_db()

path= "app/tests/test.db"
if not os.path.exists(path):
    init_db()
    

tester= Tester()
from db.models.Bill import BillModel
from db.repos import UserRepo, CompanyRepo, AreaRepo, EquipmentRepo, GroupRepo, BillRepo
from Use_Cases.Interfaces import IUser, ICompany, IArea, IEquipment, IBill

db= SessionLocal()

company_repo= CompanyRepo.CompanyRepo(db)
group_repo= GroupRepo.GroupRepo(db)
user_repo= UserRepo.UserRepo(db, company_repo, group_repo)
area_repo = AreaRepo.AreaRepo(db, company_repo)
equipment_repo = EquipmentRepo.EquipmentRepo(db, area_repo)
bill_repo= BillRepo.BillRepo(db, company_repo)

Icompany= ICompany.ICompany(company_repo)
Iuser= IUser.IUser(user_repo)
Iarea = IArea.IArea(area_repo)
Iequipment = IEquipment.IEquipment(equipment_repo)
Ibill= IBill.IBill(bill_repo)

UC= uc.UserController(Iuser, Icompany)
CC= cc.CompanyController(Icompany)
AC= ac.AreaController(Iarea, Icompany)
EC= ec.EquipmentController(Iequipment, Iarea)
BC= bc.BillController(Ibill)

# ###########test############
list_companies=[]
groups=['Admin', 'Manacher', 'Analyst']
list_areas=[]
def create_companies(n: int):
    companies= tester.create_companies(n)
    for company in companies:
        list_companies.append(company['Name'])
        CC.post(company)

def create_users(n: int):
    users= tester.create_users(n, list_companies, groups)
    for user in users:
        UC.post(user)

def create_areas(n: int):
    areas= tester.create_areas(n, list_companies)
    for area in areas:
        list_areas.append([area['Name'], area['Company']])
        AC.post(area)


def create_equipments(n: int):
    equipments= tester.create_equipments(n, list_areas)
    for eq in equipments:
        EC.post(eq)

def create_bills(n, company):
    date= datetime.now().date()- timedelta(days=n)
    bills= tester.create_bills(n, date, company)    
    BC.post(bills)


#create_companies(10)
#create_users(300)
#create_areas(100)
#create_equipments(300)
#for company in list_companies:
#    create_bills(1500, company)



