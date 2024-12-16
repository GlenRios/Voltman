from infrastructure.db_conf import engine, Base
from domain.Entities.User import User
from domain.Entities.Company import Company
from domain.Entities.Group import Group
from domain.Entities.Permission import Permission
from domain.Entities.Area import Area
from domain.Entities.Equipment import Equipment
from domain.Entities.Bill import Bill
from domain.Entities.Token import Token
from faker import Faker
import random

class Tester:
    def __init__(self):
        self.fake=Faker()

    def create_user(self):
        rand = random.randint(1,3)
        return  {'Username':self.fake.text(20), 'Password': self.fake.password(8),'CompanyID': rand,'GroupID':1}
    
    def create_users(self,n:int):
        users=[]
        for _ in range(n): users.append(self.create_user())
        return users