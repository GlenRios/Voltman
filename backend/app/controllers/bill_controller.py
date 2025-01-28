from Use_Cases.Interfaces.IBill import IBill
from datetime import datetime

class BillController():

    def __init__(self, Ibill: IBill):
        self.Ibill= Ibill

    def post(self, values: list):
        for val in values:
            val['Date']= datetime.strptime(val['Date'], '%Y-%m-%d')
            self.Ibill.create(val)
        return True    
    