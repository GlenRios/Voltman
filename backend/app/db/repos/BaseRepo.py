
from sqlalchemy.orm import Session 
from sqlalchemy.exc import IntegrityError, NoResultFound
from sqlalchemy import or_
from Configurations.CustomError import CustomError

class BaseRepo:
    def __init__(self, db: Session, Model):
        self.db = db
        self.Model=Model


    def post(self, values: dict, unique_fields= None):
        if unique_fields:
            filters = {field: values[field] for field in unique_fields if (hasattr(self.Model, field) and field in values)}
            if filters:
                existing_entity = self.db.query(self.Model).filter_by(**filters).first()
                if existing_entity:
                    raise CustomError('Error creating user. Object has an attribute unique that is already in use', 500)
        
        new_model=self.Model(**values)
        self.db.add(new_model)
        self.db.commit()
        self.db.refresh(new_model)
        return new_model
        
    
    def get(self, id: int):
        #given an id returns the model with that id
        return self.db.query(self.Model).filter(self.Model.id==id).first()
    
   
    def delete(self, id: int)-> bool:
        #given an id of a Model delete it from the bd
        model = self.get(id)
        if model:
            try:
                self.db.delete(model)
                self.db.commit()
                return True
            except NoResultFound:
                raise CustomError("Error: Item does not exist.",404)
            except IntegrityError as e:
                self.db.rollback()
                raise CustomError(f"Integrity Error: there may be dependencies that prevent deletion.", 300)
            except Exception as e:
                self.db.rollback()
                raise CustomError(f"Error inesperado: {e}", 500)
        return False
    
   
    def put(self, id:int ,values: dict, unique_fields= None):
        #given an id of a model modified some of its values
        model=self.get(id)
        if model:
            if unique_fields:
                filters = {field: values[field] for field in unique_fields if field in values}
                existing_entity = self.db.query(self.Model).filter_by(**filters).first()
                if existing_entity and existing_entity.id!= id:
                    raise CustomError('Error modifying user. Object has an attribute unique that is already in use', 500)

            for key, value in values.items():
                setattr(model, key, value)
            self.db.commit()
            self.db.refresh(model)
            return model
        return None
    

    