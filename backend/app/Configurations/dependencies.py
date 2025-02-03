from app.db.repos import UserRepo, CompanyRepo, AreaRepo, EquipmentRepo, BillRepo
from app.Use_Cases.Interfaces import IUser, ICompany, IArea, IEquipment, IBill
from app.controllers import (
    user_controller as uc,
    company_controller as cc,
    area_controller as ac,
    equipment_controller as ec,
    bill_controller as bc
)

company_repo= CompanyRepo.CompanyRepo()
user_repo= UserRepo.UserRepo(company_repo)
area_repo = AreaRepo.AreaRepo(company_repo)
equipment_repo = EquipmentRepo.EquipmentRepo(area_repo)
bill_repo= BillRepo.BillRepo(company_repo)

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