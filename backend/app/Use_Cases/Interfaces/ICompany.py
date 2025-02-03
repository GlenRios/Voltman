
class ICompany:
    """
    This class provides a service layer for handling business logic 
    related to company entities. It acts as an intermediary between 
    the controller (or API layer) and the repository layer.
    """

    def __init__(self, repo):
        """
        Initialize the service with the provided repository.
        :param repo: The Company repository that handles data persistence.
        """
        self.repo = repo

    def create(self, values: dict) -> dict:
        """
        Creates a new company using the provided data and returns the created company as a dictionary.
        It checks for uniqueness of the company name before creating.
        :param values: A dictionary containing the data needed to create the company.
        :return: The created company as a dictionary.
        """
        values= self.repo.to_model(values)
        company = self.repo.post(values, ['Name'])  # Create the company and ensure its name is unique
        return self.repo.to_Company(company).as_dict()  # Convert to domain object and return as dict

    def get(self, name: str):
        """
        Retrieves a company by its name and returns its data as a dictionary.
        :param name: The name of the company to retrieve.
        :return: The company as a dictionary.
        """
        company = self.repo.get_byName(name)
        return self.repo.to_Company(company).as_dict()  # Return the company details as a dictionary

    def get_by_id(self, id: int):
        """
        Retrieves a company by its ID and returns its data as a dictionary.
        :param id: The ID of the company to retrieve.
        :return: The company as a dictionary.
        """
        company = self.repo.get(id)
        return self.repo.to_Company(company).as_dict()  # Return the company details as a dictionary

    def delete(self, id):
        """
        Deletes a company by its ID.
        :param id: The ID of the company to delete.
        :return: None
        """
        self.repo.delete(id)  # Call the repository's delete method

    def update(self, id: int, values: dict) -> dict:
        """
        Updates a company with the provided values and returns the updated company as a dictionary.
        :param id: The ID of the company to update.
        :param values: The new values to update the company with.
        :return: The updated company as a dictionary.
        """
        values= self.repo.to_model(values)
        company = self.repo.put(id, values, ['Name'])  # Update the company and ensure its name remains unique
        return self.repo.to_Company(company).as_dict()  # Convert updated company to dictionary and return

    def get_areas(self, id: int):
        """
        Retrieves the areas associated with a company and returns them.
        :param id: The ID of the company whose areas we need to retrieve.
        :return: A list of areas.
        """
        areas = self.repo.get_areas(id)
        return areas  # Return the areas associated with the company

    def get_users(self, name: str):
        """
        Retrieves all users associated with a company by its name.
        :param name: The name of the company to retrieve users for.
        :return: A list of users.
        """
        id = self.repo.get_byName(name).id  # Get the company ID using its name
        users = self.repo.get_people(id)  # Retrieve users related to the company
        return users  # Return the users associated with the company

    def get_all(self):
        """
        Retrieves all companies from the repository and returns them as a list of dictionaries.
        :return: A list of companies as dictionaries.
        """
        companies = self.repo.get_all()  # Get all companies from the repository
        company_list = []
        for company in companies:
            company_list.append(self.repo.to_Company(company).as_dict())  # Convert each company to a dictionary
        return company_list  # Return the list of companies as dictionaries
 

