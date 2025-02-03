from db.repos.BillRepo import BillRepo
from domain.Bill import Bill

class IBill:
    
    def __init__(self, repo: BillRepo):
        self.repo = repo

    def create(self, values: dict):
        """
        Creates a new bill and returns it as a dictionary.
        """
        values = self.repo.to_model(values)  # Convert the input data into the model format
        bill = self.repo.post(values, unique_fields=['BillDate', 'CompanyID'])  # Save the bill to the repository
        return self.repo.to_Bill(bill).as_dict()  # Convert the saved bill back into a dictionary and return

    def get_bills_in_range(self, start_date, end_date, company):
        """
        Retrieves a list of bills for a specific company in a given date range.
        """
        reports = self.repo.get_in_date_range(company, start_date, end_date)
        bills = [self.repo.to_Bill(bill) for bill in reports]  # Convert all reports into Bill objects
        return bills

    def calculate_consume(self, start_date, end_date, company):
        """
        Calculates the total consumption and retrieves the bills in the specified date range.
        """
        consume = self.repo.get_consume(company, start_date, end_date)
        bills = self.get_bills_in_range(start_date, end_date, company)
        return consume, bills

    def get_monthly_consumption(self, bills: list[Bill]):
        """
        Calculates the total consumption for each month based on the list of bills.
        """
        monthly_consumption = {}
        for bill in bills:
            bill_date = bill.Date
            reading = bill.DailyConsumption
            
            # Extract year and month
            year_month = (bill_date.year, bill_date.month)
            
            # Sum readings for this year and month
            if year_month not in monthly_consumption:
                monthly_consumption[year_month] = []
            
            monthly_consumption[year_month].append(reading)
        return monthly_consumption

    def get_companies_limit_exceeded(self, month, year):
        """
        Retrieves the companies that exceeded their consumption limit in a specific month and year.
        """
        items = self.repo.get_limit_exceeded(month, year)
        return self.repo.get_company_names(items)

    def calculate_average_monthly_consumption(self, company, start_date, end_date):
        """
        Calculates the average monthly consumption for a company in a specified date range.
        """
        bills = self.get_bills_in_range(start_date, end_date, company)
        monthly_consumption = self.get_monthly_consumption(bills)
        monthly_averages = {}
        
        for (year, month), readings in monthly_consumption.items():
            average_consumption = sum(readings) / max(1, len(readings))  # Calculate average
            monthly_averages[(year, month)] = average_consumption

        return monthly_averages

    def predict_consume(self, company, start_date, end_date):
        """
        Predicts the consumption for a company based on its historical data and calculates the 3-month moving average.
        """
        bills = self.get_bills_in_range(start_date, end_date, company)
        monthly_consumption = self.get_monthly_consumption(bills)

        for (year, month), readings in monthly_consumption.items():
            var = sum(readings)
            monthly_consumption[(year, month)] = var  # Sum up the consumption for the month

        group_sums = []
        current_group = []
        total = 0
        
        for (year, month), consumption in monthly_consumption.items():
            current_group.append(consumption)  # Add consumption to the current group
            # Every 3 months, calculate the sum
            if len(current_group) == 3:
                suma = sum(current_group)
                total += suma
                group_sums.append({'Date': f'{year}-{month}', 'Consume': suma})
                del current_group[0]  # Remove the first element to keep only the last 3 months

        return total / max(len(group_sums), 1), group_sums  # Return the average of 3-month sums and individual sums
    
    def get_cost(self, company, start_day, end_day):
        """
        Calculate the total cost and retrieves the costs in the specific date range
        """
        bills= self.get_bills_in_range(company, start_day, end_day)

        cost= 0
        answ= []

        for bill in bills:
            cost+= bill.Cost

        return cost, answ
    
    def compare_consumption(self, company, before_date, date, after_date):

        total_before, bills_before= self.calculate_consume(before_date, date, company)

        total_after, bills_after= self.calculate_consume(date, after_date, company)

        return total_before, bills_before, total_after, bills_after



