from Use_Cases.Interfaces.IBill import IBill
from datetime import datetime, timedelta, date

class BillController():

    def __init__(self, Ibill: IBill):
        self.Ibill= Ibill

    def post(self, values: list):
        for val in values:
            val['Date']= datetime.strptime(val['Date'], "%Y-%m-%d").date()
            self.Ibill.create(val)
        return True    
    
    def get_consume(self, values: dict):
        start_date= datetime.strptime(values['startDate'], '%Y-%m-%d').date()
        end_date= datetime.strptime(values['endDate'], "%Y-%m-%d").date()
        company= values['Company']
        total, bills= self.Ibill.calculate_consume(start_date, end_date, company)
        answ={}
        answ['Total']=total
        answ['Values']= [{"Date": bill.Date, "Value": bill.DailyConsumption} for bill in bills]
        return answ


    def calculate_monthly_average_consumption(self, companies):
        end_date= datetime.now().date()
        start_date= end_date- timedelta(days= 3*365)
        answ=[]
        for company in companies:
            monthly_average_consumptions= self.Ibill.calculate_average_monthly_consumption(company, start_date, end_date)
            for (year, month), average in monthly_average_consumptions.items():
                answ.append({'Name': company, 'Date': f'{year}-{month}', 'Average': average})  
        return answ                      
                
