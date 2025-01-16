class Company:
    
    def __init__(self, name: str, limit: int, type: str, addr: str, increase=20 , extra_percent=15):
        self.Name= name
        self.Limit= limit
        self.Type= type
        self.Addr= addr
        self.Increase= increase
        self.Extra_Percent= extra_percent

    def as_dict(self)-> dict:
        return {key: value for key, value in vars(self).items()}