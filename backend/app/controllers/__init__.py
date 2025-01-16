from db.repos import UserRepo, CompanyRepo
from Use_Cases.Interfaces import IUser, ICompany
from Configurations.db_configuration import SessionLocal

db= SessionLocal()

company_repo= CompanyRepo.CompanyRepo(db)
user_repo= UserRepo.UserRepo(db, company_repo)

Icompany= ICompany.ICompany(company_repo)
Iuser= IUser.IUser(user_repo)
