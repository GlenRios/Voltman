from db.models.Group import GroupModel
from db.repos.BaseRepo import BaseRepo

class GroupRepo(BaseRepo):
    
    def __init__(self, db):
        super().__init__(db, GroupModel)

    def get_by_type(self, group: str):
        return self.db.query(GroupModel).filter(GroupModel.Name== group).first()
    
    def get_permissions(self, group: str):
        group= self.get_by_type(group)
        permissions= group.permissions
        list=[]
        for permission in permissions:
            list.append(permission.Type)
        return list
    
    