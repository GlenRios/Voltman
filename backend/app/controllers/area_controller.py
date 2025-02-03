
class AreaController:

    # Initialize the controller with the IArea and ICompany interfaces for area and company operations
    def __init__(self, iarea, icompany):
        self.Iarea = iarea  # Interface for area-related operations
        self.Icompany = icompany  # Interface for company-related operations

    # Get an area by its ID
    def get(self, id: int):
        return self.Iarea.get(id)

    # Create a new area
    def post(self, values: dict):
        return self.Iarea.create(values)
    
    # Delete an area by its ID
    def delete(self, id: int):
        return self.Iarea.delete(id)
    
    # Update an area by its ID
    def put(self, id, values: dict):
        return self.Iarea.update(id, values)
    
    # Get all areas for a specific company by the company ID
    def get_all(self, id: int):
        # Retrieve areas for the company using the ICompany interface
        areas = self.Icompany.get_areas(id)
        # Convert the areas to a suitable format for output
        return self.Iarea.convert(areas)
    
    # Get an area by its name and company name
    def get_by_company(self, company: str, name: str):
        # Retrieve the area by name and company name
        return self.Iarea.get_by_name(name, company).id

    # Get all equipments in an area by the area ID
    def get_equipments(self, id: int):
        return self.Iarea.get_equipments(id)
