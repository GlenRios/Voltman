from db.models.Bill import BillModel
from db.repos.BaseRepo import BaseRepo
from domain.Bill import Bill
from domain.Company import Company
from db.repos.CompanyRepo import CompanyRepo
from datetime import timedelta, date
from Configurations.CustomError import CustomError
from sqlalchemy import extract


class BillRepo(BaseRepo):
    
    # Initializes the BillRepo by inheriting from the BaseRepo and injecting the company_repo for handling company data
    def __init__(self, db , company_repo: CompanyRepo):
        super().__init__(db, BillModel)  # Calls the parent constructor with BillModel
        self.company_repo = company_repo  # Stores the company repository instance for accessing company-related data
    
    # Calculates the consumption between two dates for a given company
    def get_consume(self, company: str ,start_date: date, end_date: date) -> float:
        # Retrieves the company ID using the company name
        idCompany = self.company_repo.get_byName(company).id
        # Retrieves the consumption readings for the start and end date
        start_consumption = self.db.query(BillModel.Reading).filter(BillModel.BillDate == start_date, BillModel.CompanyID == idCompany).first()
        end_consumption = self.db.query(BillModel.Reading).filter(BillModel.BillDate == end_date, BillModel.CompanyID == idCompany).first()
        # Returns the difference in reading, calculating consumption
        return (end_consumption.Reading if end_consumption else 0) - (start_consumption.Reading if start_consumption else 0)
    
    
    # Retrieves bills for a given company in a specified date range
    def get_in_date_range(self, company: str, start_date: date, end_date: date):
        idCompany = self.company_repo.get_byName(company).id
        # Retrieves all bills within the date range
        bills = self.db.query(BillModel).filter(BillModel.BillDate.between(start_date, end_date), BillModel.CompanyID == idCompany).all()
        return bills
    
    # Converts a BillModel instance to a domain Bill object
    def to_Bill(self, bill: BillModel) -> Bill:
        # Retrieves the company name associated with the bill
        company_name = self.company_repo.get(bill.CompanyID).Name
        # Returns a Bill domain object with relevant bill details
        return Bill(bill.id,
                    bill.BillDate, 
                    company_name, 
                    bill.Reading, 
                    bill.DailyConsumption,
                    bill.Cost)

    # Retrieves a list of company names and overlimit for each bill
    def get_company_names(self, items: list[BillModel]):
        companies = []
        for item in items:
            # Retrieves the company name and overlimit (negative of OverLimit)
            name, overlimit = self.company_repo.get(item.CompanyID).Name, -item.OverLimit
            companies.append((name, overlimit))
        return companies    

    # Retrieves the bill for the previous day based on the given company and bill date
    def prev_day(self, company, bill_date: date):
        # Calculate the previous day's date
        previous_day = bill_date - timedelta(days=1)
        # Retrieves the bill for the previous day
        previous_day_bill = self.db.query(BillModel).filter(
            BillModel.CompanyID == company,
            BillModel.BillDate == previous_day
        ).first()
        return previous_day_bill
    
    # Retrieves bills where the overlimit has been exceeded in the specified month and year
    def get_limit_exceeded(self, month: int, year: int):
        # Retrieves all bills from the specified month and year where OverLimit is negative (indicating exceeded limit)
        bills = self.db.query(BillModel).filter(extract('month', BillModel.BillDate) == month, extract('year', BillModel.BillDate) == year, BillModel.OverLimit < 0).all()
        latest_bills = {}

        # Updates latest_bills to store the most recent bill for each company
        for bill in bills:
            if bill.CompanyID not in latest_bills or bill.BillDate > latest_bills[bill.CompanyID].BillDate:
                latest_bills[bill.CompanyID] = bill

        # Returns the latest bills with overlimit exceeded for the month/year
        filtered_bills = list(latest_bills.values())
        return filtered_bills
    
    # Maps the provided input values to the model's format for creating a bill entry
    def to_model(self, values: dict) -> dict:
        # Retrieves the company using the company name
        company = self.company_repo.get_byName(values['Company'])

        # Retrieves the previous day's bill
        previous_day_bill = self.prev_day(company.id, values['Date'])

        # Initializes daily consumption based on the provided reading
        daily_consumption = values['Reading']

        # Checks if the reading is valid (must not be less than the previous day's reading)
        if previous_day_bill:
            if previous_day_bill.Reading > values['Reading']:
                raise CustomError('Reading cannot be less than the last reading', 400)
            # Adjusts daily consumption by subtracting the previous day's reading
            daily_consumption -= previous_day_bill.Reading
        # Ensures there is a previous day record when the first record for the company is being inserted
        elif self.db.query(BillModel).filter(BillModel.CompanyID == company.id).first():
            raise CustomError('Invalid date, this error may be due to the fact that you did not insert a record from the previous day, check that you have done so', 400)
        
        # Sets the overlimit for the bill, considering the previous day's overlimit or the company's limit
        prev_overlimit = previous_day_bill.OverLimit if (previous_day_bill and previous_day_bill.BillDate.month == values['Date'].month) else company.Limit
        overlimit = prev_overlimit - daily_consumption

        # Calculates the cost of the bill, considering the extra percent and increase rate
        cost = (1 + company.Extra_Percent) * daily_consumption + company.Increase

        # Returns the data that can be used to create a new bill model
        return {'BillDate': values['Date'],
                'CompanyID': company.id,
                'Reading': values['Reading'],
                'DailyConsumption': daily_consumption,
                'Cost': cost,
                'OverLimit': overlimit}
