from app.Configurations.CustomError import CustomError

class IArea:
    """
    This service class provides the business logic for area management. It acts as an intermediary between the API layer
    and the repository layer for managing areas in the system.
    """

    def __init__(self, repo):
        """
        Initialize the IArea service with the provided Area repository.
        :param repo: The Area repository that handles data persistence.
        """
        self.repo = repo

    def create(self, values: dict) -> dict:
        """
        Creates a new area with the provided values and returns the created area as a dictionary.
        Ensures that the area name and company ID are unique before creating the area.
        :param values: The data to create a new area.
        :return: The created area as a dictionary.
        """
        values = self.repo.to_model(values)  # Convert input data to model format
        area = self.repo.post(values, unique_fields=['Name', 'CompanyID'])  # Ensure unique name and company ID
        return self.repo.to_Area(area).as_dict()  # Return the created area as a dictionary

    def get(self, id: int):
        """
        Retrieves an area by its ID and returns its data as a dictionary.
        :param id: The ID of the area to retrieve.
        :return: The area as a dictionary.
        """
        area = self.repo.get(id)  # Fetch the area by ID from the repository
        return self.repo.to_Area(area).as_dict()  # Convert to Area entity and return as dict

    def get_equipments(self, id: int):
        """
        Retrieves the list of equipment associated with a specific area.
        :param id: The ID of the area.
        :return: A list of equipment associated with the area.
        """
        equipments = self.repo.get_equipments(id)  # Get the equipments for the area
        return equipments

    def delete(self, id: int):
        """
        Deletes an area by its ID.
        :param id: The ID of the area to delete.
        :return: None
        """
        self.repo.delete(id)  # Delete the area from the repository

    def update(self, id: int, values: dict) -> dict:
        """
        Updates an existing area with the provided values and returns the updated area as a dictionary.
        :param id: The ID of the area to update.
        :param values: The new values for updating the area.
        :return: The updated area as a dictionary.
        """
        values = self.repo.to_model(values)  # Convert input values to model format
        area = self.repo.put(id, values, unique_fields=['Name', 'CompanyID'])  # Ensure unique name and company ID
        return self.repo.to_Area(area).as_dict()  # Return the updated area as a dictionary

    def get_by_name(self, name: str, company: str):
        """
        Retrieves an area by its name and associated company name.
        :param name: The name of the area.
        :param company: The name of the company associated with the area.
        :return: The area as an Area entity.
        """
        area = self.repo.get_by_company(name, company)  # Get the area by its name and company
        if area:
            return self.repo.to_Area(area)  # Return the area as an Area entity
        raise CustomError('Object not found', 404)  # Raise an error if the area is not found

    def convert(self, areas: list):
        """
        Converts a list of AreaModel instances to a list of Area entities as dictionaries.
        :param areas: A list of AreaModel instances to convert.
        :return: A list of areas as dictionaries.
        """
        return [self.repo.to_Area(area).as_dict() for area in areas]  # Convert and return as a list of dictionaries
