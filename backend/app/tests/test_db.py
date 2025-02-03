from datetime import datetime
import os
from pathlib import Path
import unittest
import sys

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

sys.path.append(str(Path(__file__).parent.parent))
from Use_Cases.Interfaces.IUser import IUser
from Use_Cases import liquidate_bill, total_consumption, over_consumption, average_consumption, predict_consumption, compare_consumption
from db.repos.UserRepo import UserRepo
from db.repos.CompanyRepo import CompanyRepo
from db.models.Group import GroupModel

ENGINE = "sqlite:///app/tests/unit_test.db" 
from Configurations.database import Base

def build_test_db(
        name=ENGINE,
    ):
    """
    Create test database and schema.
    """
    engine = create_engine(name)

    # Nuke everything and build it from scratch.
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)

    return engine

class Test_API(unittest.TestCase):
    
    def setUp(self):
        engine = build_test_db()
        self.db = sessionmaker(autocommit=False, autoflush=False, bind=engine)()

        self.company_repo = CompanyRepo(db=self.db)
        self.user_repo = UserRepo(db=self.db, company_repo=self.company_repo)

    def tearDown(self):
        pass

    def test_login(self):
        group = GroupModel(Name="blobs")
        self.db.add(group)
        company = self.company_repo.post(values=dict(Limit=-1, Increase=-1, Extra_Percent=-1, Type="", Name="blobcorp", Addr=""))
        user = self.user_repo.post(values=dict(Username="blob", Password="doko", company=company, group=group))
        self.db.commit()

        iuser = IUser(self.user_repo)

        self.assertTrue(iuser.find_out("blob", "doko"))

    def test_liquidate_registro(self):
        sucursal = self.company_repo.post(dict(Name="blobcorp", Last_Reading=0, Reading=0, Limit=100))
        self.db.commit()

        sucursal.Reading = 50

        registro = liquidate_bill(self.db, sucursal)

        self.assertEqual(sucursal.Last_Reading, sucursal.Reading)
        self.assertEqual(registro.OverLimit, 0)

        sucursal.Reading = 150

        registro = liquidate_bill(self.db, sucursal)
        self.assertEqual(registro.OverLimit, 50)

    def test_total_consumption(self):
        sucursal = self.company_repo.post(dict(Name="blobcorp", Last_Reading=0, Reading=100, Limit=9999))
        self.db.commit()

        sucursal.Reading = 150
        registro = liquidate_bill(self.db, sucursal, date=datetime(2000, 10, 1))

        sucursal.Reading = 300
        registro = liquidate_bill(self.db, sucursal, date=datetime(2000, 10, 2))

        sucursal.Reading = 500
        registro = liquidate_bill(self.db, sucursal, date=datetime(2000, 10, 3))

        self.db.commit()

        self.assertEqual(
            total_consumption(
                self.db,
                sucursal,
                start_date=datetime(2000, 10, 1),
                end_date=datetime(2000, 10, 3)
            ),
            350,
        )

    def test_over_consumption(self):
        sucursal = self.company_repo.post(dict(Name="blobcorp", Last_Reading=0, Reading=1, Limit=0))
        self.db.commit()
        registro = liquidate_bill(self.db, sucursal, date=datetime(2000, 10, 1))
        self.db.commit()

        self.assertEqual(
            over_consumption(self.db, start_date=datetime(2000, 10, 1), end_date=datetime(2000, 10, 1)),
            [registro],
        )

    def test_average_consumption(self):
        sucursal = self.company_repo.post(dict(Name="blobcorp", Last_Reading=0, Reading=1, Limit=0))
        self.db.commit()
        registro = liquidate_bill(self.db, sucursal, date=datetime(2000, 10, 1))
        self.db.commit()

        self.assertEqual(
            average_consumption(self.db, sucursal, start_date=datetime(2000, 10, 1), end_date=datetime(2000, 10, 1)),
            total_consumption(self.db, sucursal, start_date=datetime(2000, 10, 1), end_date=datetime(2000, 10, 1)),
        )



def main_suite() -> unittest.TestSuite:
    s = unittest.TestSuite()
    load_from = unittest.defaultTestLoader.loadTestsFromTestCase
    s.addTests(load_from(Test_API))
    
    return s

def run():
    t = unittest.TextTestRunner()
    t.run(main_suite())

if __name__ == "__main__":
    run()
