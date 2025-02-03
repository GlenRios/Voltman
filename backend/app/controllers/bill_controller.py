from Use_Cases.Interfaces.IBill import IBill
from datetime import datetime, timedelta, date
from Configurations.CustomError import CustomError

class BillController():
    # Initialize the controller with the IBill interface
    def __init__(self, Ibill: IBill):
        self.Ibill = Ibill  # Interface for bill-related operations

    # Create new bills from the provided values
    def post(self, values: list):
        for val in values:
            # Convert 'Date' to a date object
            val['Date'] = datetime.strptime(val['Date'], "%Y-%m-%d").date()
            
            # Ensure the bill date is not in the future
            if val['Date'] > datetime.now().date():
                raise CustomError("Invalid date, it is bigger than today's date", 400)
            
            # Create the bill using the Ibill interface
            self.Ibill.create(val)
        
        return True

    # Calculate total consumption for a specified date range and company
    def get_consume(self, values: dict):
        # Parse the start and end dates from the input
        start_date = datetime.strptime(values['startDate'], '%Y-%m-%d').date()
        end_date = datetime.strptime(values['endDate'], "%Y-%m-%d").date()
        
        # Ensure the dates are valid
        if start_date > end_date:
            raise CustomError("Invalid input, EndDate can't be less than StartDate", 400)
        elif end_date > datetime.now().date():
            raise CustomError("Invalid date, it is bigger than today's date", 400)
        
        # Get the company name from the input
        company = values['Company']
        
        # Use the Ibill interface to calculate consumption and fetch bills
        total, bills = self.Ibill.calculate_consume(start_date, end_date, company)
        
        # Format the response
        answ = {}
        answ['Total'] = total
        answ['Data'] = [{"Date": bill.Date, "Value": bill.DailyConsumption} for bill in bills]
        
        return answ

    # Calculate the monthly average consumption for a list of companies
    def calculate_monthly_average_consumption(self, companies):
        end_date = datetime.now().date()
        start_date = end_date - timedelta(days=3 * 365)  # 3 years back
        
        from collections import defaultdict
        answ = defaultdict(list)
        
        # For each company, calculate their monthly average consumption
        for company in companies:
            monthly_average_consumptions = self.Ibill.calculate_average_monthly_consumption(company, start_date, end_date)
            for (year, month), average in monthly_average_consumptions.items():
                answ[f'{year}-{month}'].append((company, average))
        
        # Format the response
        response = []
        for key, values in answ.items():
            res = {'Date': key}
            for company, average in values:
                res[company] = average
            response.append(res)
        
        return response

    # Get the list of companies that exceeded the consumption limit for a specific month
    def get_companies_limit_exceeded(self, date: str):
        date = datetime.strptime(date, "%Y-%m-%d").date()
        
        # Ensure the date is not in the future
        if date > datetime.now().date():
            raise CustomError("Invalid date, it is bigger than today's date", 400)
        
        # Get the month and year from the date
        month = date.month
        year = date.year
        
        # Fetch companies exceeding the limit using the Ibill interface
        items = self.Ibill.get_companies_limit_exceeded(month, year)
        items.sort(key=lambda x: x[1])
        # Format the response
        answ = []
        for name, overlimit in items:
            answ.append({'Name': name, 'OverLimit': overlimit})
        
        return answ

    # Predict future consumption for a specific company
    def predict_consume(self, company):
        end_date = datetime.now().date()
        start_date = end_date - timedelta(days=5 * 365)  # 5 years back
        
        # Use the Ibill interface to predict consumption
        pred, data = self.Ibill.predict_consume(company, start_date, end_date)
        
        # Format the response
        answ = {'Prediction': pred, 'Data': data}
        return answ
    
    # Retrieves the companies that exceeded the consumption limit for the actual month
    def get_alerts(self, company):
        date= datetime.now().date()
        # Get the month and year from the date
        month = date.month
        year = date.year    
        # Fetch companies exceeding the limit using the Ibill interface
        items = self.Ibill.get_companies_limit_exceeded(month, year)
        # Format the response
        answ=[]
        for name, _ in items:
            answ.append({'Name': name, 'Bool': (name==company)})

        return answ  

    # Calculate the cost of a company in an especific range of time
    def get_cost(self, values: dict):
        # Parse the start and end dates from the input
        start_date = datetime.strptime(values['startDate'], '%Y-%m-%d').date()
        end_date = datetime.strptime(values['endDate'], "%Y-%m-%d").date()
        
        # Ensure the dates are valid
        if start_date > end_date:
            raise CustomError("Invalid input, EndDate can't be less than StartDate", 400)
        elif end_date > datetime.now().date():
            raise CustomError("Invalid date, it is bigger than today's date", 400)
        
        company= values['Company']

        cost, bills= self.Ibill.get_cost(company, start_date, end_date)

        data= []

        for bill in bills:
            data.append({'Date': bill.Date, 'Cost': bill.Cost})

        answ= {'Total': cost, 'Data': data}    
        return answ
    
    # Compare the consumption before and after a date
    def compare_consumption(self, values: dict):
        
        date= datetime.strptime(values['Date'], '%Y-%m-%d').date()
        company= values['Name']
        
        after_date = datetime.now().date()- timedelta(days=1)
        before_date = date - timedelta(days= (after_date - date).days)

        total_before, bills_before, total_after, bills_after= self.Ibill.compare_consumption(company, before_date, date, after_date)

        answ={'TotalAfter': total_after, 'TotalBefore': total_before}
        answ['DataAfter'] = [{"Date": bill.Date, "Value": bill.DailyConsumption} for bill in bills_after]
        answ['DataBefore'] = [{"Date": bill.Date, "Value": bill.DailyConsumption} for bill in bills_before]
        return answ



