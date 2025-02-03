from app.tests.Tester import Tester
from app.Configurations.dependencies import UC, CC, AC, EC, BC
from datetime import datetime, date, timedelta

def poblate(company: int, users: int, areas: int, equipments: int, registers: int):
    tester= Tester()
    list_groups= ['Admin', 'Manacher', 'Analyst']
    list_companies= []
    list_areas= []

    comp= tester.create_companies(company)
    for c in comp: 
        list_companies.append(c['Name']) 
        CC.post(c)

    ar= tester.create_areas(areas, list_companies)
    for a in ar:
        list_areas.append((a['Name'], a['Company']))    
        AC.post(a)

    user= tester.create_users(users, list_companies, list_groups)  
    for u in user: UC.post(u) 

    equips= tester.create_equipments(equipments, list_areas)  
    for e in equips: EC.post(e)

    for c in list_companies:
        date= datetime.now().date()- timedelta(days= registers + 1)
        bills= tester.create_bills(registers, date, c)
        BC.post(bills)




