class Area:
    
    def __init__(self, company: str, name:str, responsible:str):
        self.Company= company
        self.Name= name
        self.Responsible= responsible

    def as_dict(self)-> dict:
        return {key: value for key, value in vars(self).items()}
