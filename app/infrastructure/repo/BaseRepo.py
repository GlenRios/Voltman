from infrastructure.db_conf import Base
from sqlalchemy.orm import Session

class BaseRepo:
    def __init__(self, db: Session, Model):
        self.db = db
        self.Model=Model

    def validate(self, data: dict):
        columns = {
            column.name for column in self.Model.__table__.columns if not column.autoincrement
        }
        if set(data.keys()).issubset(columns):
            return True
        return False

    def post(self, values: dict):
        #given an object insert it in the bd
        new_model=self.Model()
        for key,value in values.items():
            setattr(new_model,key,value)
        self.db.add(new_model)
        self.db.commit()
        self.db.refresh(new_model)
        return new_model
        
    def get(self, id:int):
        #given an id returns the model with that id
        return self.db.query(self.Model).filter(self.Model.id==id).first()
    
    def delete(self, id: int)-> bool:
        #given an id of a Model delete it from the bd
        model = self.get(id)
        if model:
            self.db.delete(model)
            self.db.commit()
            return True
        return False
    
    def put(self, id:int ,values: dict):
        #given an id of a model modified some of its values
        model=self.get(id)
        if model:
            for key, value in values.items():
                setattr(model, key, value)
            self.db.commit()
            self.db.refresh(model)
            return model
        return None

