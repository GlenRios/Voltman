from app.Configurations.CustomError import CustomError
from datetime import datetime

class EquipmentController:

    # Initialize the controller with the IEquipment and IArea interfaces
    def __init__(self, iequipment, iarea):
        self.Iequipment = iequipment  # Interface for equipment-related operations
        self.Iarea = iarea  # Interface for area-related operations

    # Get an equipment by its ID
    def get(self, id: int):
        return self.Iequipment.get(id)

    # Create new equipment
    def post(self, values: dict):
        # Convert the 'Installation_Date' to a date object
        values['Installation_Date'] = datetime.strptime(values['Installation_Date'], '%Y-%m-%d').date()

        # Check if the area exists by using the IArea interface
        area = self.Iarea.get_by_name(values['Area'], values['Company'])
        
        # If area is valid, create the equipment
        if area:
            return self.Iequipment.create(values)

        # If area is invalid, raise a custom error
        raise CustomError('Invalid Area', 500)
    
    # Delete an equipment by its ID
    def delete(self, id: int):
        return self.Iequipment.delete(id)

    # Update an equipment by its ID
    def put(self, id, values: dict):
        # Convert the 'Installation_Date' to a date object
        values['Installation_Date'] = datetime.strptime(values['Installation_Date'], '%Y-%m-%d').date()

        # Check if the area exists by using the IArea interface
        area = self.Iarea.get_by_name(values['Area'], values['Company'])
        
        # If area is valid, update the equipment
        if area:
            return self.Iequipment.update(id, values)

        # If area is invalid, raise a custom error
        raise CustomError('Invalid Area', 500)

    # Get all equipment for a list of areas
    def get_all(self, areas: list):
        equipments = []
        
        # For each area, get the equipment and convert them
        for area in areas:
            eq = self.Iarea.get_equipments(area['id'])
            eq = self.Iequipment.convert(eq)
            equipments.extend(eq)  # Add the equipment to the list
        
        return equipments  

    # Get all equipment for a specific area
    def get_equipments_in_area(self, area: int):
        eq = self.Iarea.get_equipments(area)
        eq = self.Iequipment.convert(eq)
        return eq
 

    
