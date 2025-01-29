from db.repos.BillRepo import BillRepo
from domain.Bill import Bill
class IBill:
    
    def __init__(self, repo: BillRepo):
        self.repo= repo

    def create(self, values: dict):
        values= self.repo.to_model(values)
        bill = self.repo.post(values, unique_fields=['BillDate', 'CompanyID'])
        return self.repo.to_Bill(bill).as_dict()
    
    def get_bills_in_range(self, start_date, end_date, company):
        reports= self.repo.get_in_date_range(company, start_date, end_date)
        bills=[]
        for bill in reports:
            bills.append(self.repo.to_Bill(bill))   
        return bills         

    def calculate_consume(self, start_date, end_date, company):
        consume= self.repo.get_consume(company, start_date, end_date)
        bills= self.get_bills_in_range(start_date, end_date, company)
        return consume, bills   

    def get_monthly_consumption(self, bills: list[Bill]):
        monthly_consumption = {}
        for bill in bills:
            bill_date = bill.Date
            reading = bill.DailyConsumption
            
            # Extraer año y mes
            year_month = (bill_date.year, bill_date.month)
            
            # Sumar lecturas para este año y mes
            if year_month not in monthly_consumption:
                monthly_consumption[year_month] = []
            
            monthly_consumption[year_month].append(reading)
        return monthly_consumption    

    def get_companies_limit_exceeded(self, month, year):
        items= self.repo.get_limit_exceeded(month, year)
        return self.repo.get_company_names(items)


    def calculate_average_monthly_consumption(self, company, start_date, end_date):
        bills= self.get_bills_in_range(start_date, end_date, company)
        monthly_consumption= self.get_monthly_consumption(bills)
        monthly_averages = {}
        
        for (year, month), readings in monthly_consumption.items():
            average_consumption = sum(readings) / len(readings)  # Calcular promedio
            monthly_averages[(year, month)] = average_consumption

        return monthly_averages
    
    def predict_consume(self, company, start_date, end_date):
        bills= self.get_bills_in_range(start_date, end_date, company)
        monthly_consumption= self.get_monthly_consumption(bills)

        for (year, month), readings in monthly_consumption.items():
            var= sum(readings)
            monthly_consumption[(year, month)]= var

        group_sums = []
        current_group = []
        total=0
        
        for (year, month), consumption in monthly_consumption.items():
            current_group.append(consumption)          
            # Cada 3 meses, calcular la suma
            if len(current_group) == 3:
                suma= sum(current_group)
                total+=suma
                group_sums.append({'Date': f'{year}-{month}', 'Consume':suma})
                del current_group[0]


        return total/len(group_sums) , group_sums     








    
    
