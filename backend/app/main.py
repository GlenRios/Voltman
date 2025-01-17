from Configurations.db_configuration import init_db, SessionLocal
import os
from tests.Tester import Tester
from controllers import user_controller as uc, company_controller as cc

path= "app/tests/test.db"
if not os.path.exists(path):
    init_db()

tester= Tester()

############test############
# list_companies=[]
# groups=['Admin', 'Manacher', 'Analyst']

# def create_companies(n: int):
#     companies= tester.create_companies(n)
#     for company in companies:
#         list_companies.append(company['Name'])
#         cc.post(company)

# def create_users(n: int):
#     users= tester.create_users(n, list_companies, groups)
#     for user in users:
#         uc.post(user)

# create_companies(6)
# create_users(30)
