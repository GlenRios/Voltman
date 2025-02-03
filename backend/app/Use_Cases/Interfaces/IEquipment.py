
class IEquipment:
    """
    This service class provides the business logic for managing equipment.
    It acts as an intermediary between the API layer and the repository layer for equipment data management.
    """

    def __init__(self, repo):
        """
        Initializes the IEquipment service with the provided Equipment repository.
        :param repo: The Equipment repository that handles data persistence.
        """
        self.repo = repo

    def create(self, values: dict) -> dict:
        """
        Creates a new equipment with the provided values and returns the created equipment as a dictionary.
        :param values: The data to create a new equipment.
        :return: The created equipment as a dictionary.
        """
        values = self.repo.to_model(values)  # Convert input data to model format
        equipment = self.repo.post(values)  # Save the equipment to the repository
        return self.repo.to_Equipment(equipment).as_dict()  # Convert the saved equipment to a dictionary and return it

    def get(self, id: int):
        """
        Retrieves an equipment by its ID and returns its data as a dictionary.
        :param id: The ID of the equipment to retrieve.
        :return: The equipment as a dictionary.
        """
        equipment = self.repo.get(id)  # Fetch the equipment by ID from the repository
        return self.repo.to_Equipment(equipment).as_dict()  # Convert to Equipment entity and return as dict

    def delete(self, id: int):
        """
        Deletes an equipment by its ID.
        :param id: The ID of the equipment to delete.
        :return: None
        """
        self.repo.delete(id)  # Delete the equipment from the repository

    def update(self, id: int, values: dict) -> dict:
        """
        Updates an existing equipment with the provided values and returns the updated equipment as a dictionary.
        :param id: The ID of the equipment to update.
        :param values: The new values for updating the equipment.
        :return: The updated equipment as a dictionary.
        """
        values = self.repo.to_model(values)  # Convert input values to model format
        equipment = self.repo.put(id, values)  # Update the equipment in the repository
        return self.repo.to_Equipment(equipment).as_dict()  # Return the updated equipment as a dictionary

    def convert(self, equipments):
        """
        Converts a list of EquipmentModel instances to a list of Equipment entities as dictionaries.
        :param equipments: A list of EquipmentModel instances to convert.
        :return: A list of equipments as dictionaries.
        """
        return [self.repo.to_Equipment(equipment).as_dict() for equipment in equipments]  # List comprehension for conversion