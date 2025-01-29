from datetime import date
class Bill:

    def __init__(self,id: int, date: date, company: str, reading: float, daily_consumption: float,  cost: float):
        self.id= id
        self.Date= date
        self.Company= company
        self.Reading= reading
        self.DailyConsumption= daily_consumption
        self.Cost= cost

    def as_dict(self)-> dict:
        return {key: value for key, value in vars(self).items()}
