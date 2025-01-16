from datetime import datetime
class Bill:

    def __init__(self, date: datetime, company: str, reading: float, cost: float, over_limit: bool):
        self.Date= date
        self.Company= company
        self.Reading= reading
        self.Cost= cost
        self.Over_Limit= over_limit

    def as_dict(self)-> dict:
        return {key: value for key, value in vars(self).items()}
