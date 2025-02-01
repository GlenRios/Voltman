
class CustomError(Exception):
    def __init__(self, message, status_code):
        super().__init__(message)  # Llama al constructor de la clase base `Exception` con el mensaje de error
        self.status_code = status_code  # Almacena el código de estado HTTP asociado con el error
