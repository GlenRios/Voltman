 
from faker import Faker
import random

class Tester:
    
    def __init__(self):
        self.fake=Faker()
    
    def create_user(self, companies, groups):
        return  {'Username':self.fake.text(20), 'Password': self.fake.password(8),'Company': random.choice(companies), 'Type': random.choice(groups)}
    
    def create_users(self,n:int, companies, groups):
        users=[]
        for _ in range(n): users.append(self.create_user(companies, groups))
        return users
    
    def create_company(self):
        return {'Limit': self.fake.pyfloat(min_value=1000.00, max_value=1500.00, right_digits=2),
                'Increase': 20,
                'Extra_Percent': 15,
                'Type': f'type{random.randint(1, 10) }',
                'Name': self.fake.company(),
                'Addr': self.fake.address()}

    def create_companies(self, n: int):
        companies=[]
        for _ in range(n): companies.append(self.create_company())
        return companies
