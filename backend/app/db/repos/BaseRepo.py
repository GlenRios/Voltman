from sqlalchemy.orm import Session 
from sqlalchemy.exc import IntegrityError, NoResultFound
from app.Configurations.CustomError import CustomError
from app.Configurations.database import SessionLocal

class BaseRepo:
    # Constructor para inicializar la conexión de la base de datos y el modelo
    def __init__(self, Model):
        self.db = SessionLocal()
        self.Model = Model

    # Método para crear un nuevo registro en la base de datos
    def post(self, values: dict, unique_fields=None):
        # Si se definen campos únicos, verificamos si ya existe un registro con esos valores
        if unique_fields:
            filters = {field: values[field] for field in unique_fields if (hasattr(self.Model, field) and field in values)}
            if filters:
                existing_entity = self.db.query(self.Model).filter_by(**filters).first()
                if existing_entity:
                    raise CustomError('Error creating item. Object has an attribute unique that is already in use', 400)
        
        # Creamos el nuevo modelo y lo agregamos a la base de datos
        new_model = self.Model(**values)
        self.db.add(new_model)
        self.db.commit()
        self.db.refresh(new_model)  # Refresca el objeto para obtener los valores actualizados desde la DB
        return new_model

    # Método para obtener un registro de la base de datos por ID
    def get(self, id: int):
        return self.db.query(self.Model).filter(self.Model.id == id).first()

    # Método para eliminar un registro de la base de datos
    def delete(self, id: int) -> bool:
        model = self.get(id)
        if model:
            try:
                self.db.delete(model)
                self.db.commit()  # Realizamos el commit para confirmar la eliminación
                return True
            except NoResultFound:
                raise CustomError("Error: Item does not exist.", 404)  # Si no se encuentra el modelo, lanzar error
            except IntegrityError:
                self.db.rollback()  # En caso de error, hacemos rollback
                raise CustomError("It cannot be deleted because it has dependencies.", 403)  # Si el modelo tiene dependencias
            except Exception as e:
                self.db.rollback()  # En cualquier otro error, hacemos rollback
                raise CustomError(f"Unexpected error: {e}", 500)  # Error inesperado
        return False

    # Método para actualizar un registro existente
    def put(self, id: int, values: dict, unique_fields=None):
        model = self.get(id)
        if model:
            # Si se definen campos únicos, verificamos que no haya duplicados
            if unique_fields:
                filters = {field: values[field] for field in unique_fields if field in values}
                existing_entity = self.db.query(self.Model).filter_by(**filters).first()
                if existing_entity and existing_entity.id != id:
                    raise CustomError('Error modifying item. Object has an attribute unique that is already in use', 400)

            # Si todo está bien, actualizamos los valores del modelo
            for key, value in values.items():
                setattr(model, key, value)
            self.db.commit()  # Guardamos los cambios
            self.db.refresh(model)  # Refrescamos el modelo para obtener la versión actualizada
            return model
        return None
