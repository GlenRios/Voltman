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