class User:

    def __init__(self,id: int, password: str, username: str, company: str, group: str):
        self.id= id
        self.Username= username
        self.Password= password
        self.Company= company
        self.Type= group
        
    def as_dict(self)-> dict:
        return {key: value for key, value in vars(self).items()}    