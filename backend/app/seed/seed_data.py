from Configurations.database import SessionLocal
from db.models import Group, Company, User

def seed_data():
    db= SessionLocal()

    groups=[
        Group.GroupModel(Name= 'SuperAdmin'),
        Group.GroupModel(Name= 'Admin'),
        Group.GroupModel(Name= 'Manacher'),
        Group.GroupModel(Name= 'Analyst'),
    ]

    if not db.query(Group.GroupModel).all():
        db.add_all(groups)
        db.commit()

    company= Company.CompanyModel(Limit= 100.0, Increase= 20.0, Extra_Percent= 15.0, Type= 'type0', Name= 'company0', Addr= 'addr0')  
    if not db.query(Company.CompanyModel).filter(Company.CompanyModel.Name== 'company0').first():
        db.add(company)
        db.commit()

    super_user= User.UserModel(Username= 'SuperAdmin', Password= 'voltman000', CompanyID= 1, GroupID= 1)
    if not db.query(User.UserModel).filter(User.UserModel.Username== 'SuperAdmin').first():
        db.add(super_user)
        db.commit()

    db.close()

    