from datetime import datetime
class Bill:

    def __init__(self,id: int, date: datetime, company: str, reading: float, increase: int, extra_percent: int):
        self.id= id
        self.Date= date
        self.Company= company
        self.Reading= reading
        self.cost= self.calculate_cost(increase, extra_percent)

    def as_dict(self)-> dict:
        return {key: value for key, value in vars(self).items()}

    def calculate_cost(self, increase: int , extra_percet: int):
        return self.Reading *(1+extra_percet) + increase