class Area:
    
    def __init__(self, id: int, company: str, name:str, responsible:str):
        self.id= id
        self.Company= company
        self.Name= name
        self.Responsible= responsible

    def as_dict(self)-> dict:
        return {key: value for key, value in vars(self).items()}
