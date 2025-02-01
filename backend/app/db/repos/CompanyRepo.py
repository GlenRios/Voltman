from db.models.Company import CompanyModel
from db.repos.BaseRepo import BaseRepo
from domain.Company import Company

class CompanyRepo(BaseRepo):
    
    # Initializes the repository by calling the parent constructor
    # and passing the CompanyModel as the model to interact with
    def __init__(self, db):
        super().__init__(db, CompanyModel)

    # Retrieves a company by its name
    def get_byName(self, name: str) -> CompanyModel:
        # Queries the database and returns the first result that matches the company name
        return self.db.query(CompanyModel).filter(CompanyModel.Name == name).first()

    # Retrieves all companies from the database
    def get_all(self) -> list[CompanyModel]:
        # Returns a list of all CompanyModel entries in the database
        return self.db.query(CompanyModel).all()
    
    # Retrieves all areas associated with a company by its ID
    def get_areas(self, id: int) -> list:
        # Gets the company by its ID and returns its associated areas
        company = self.get(id)
        return company.areas
    
    # Retrieves all people (users) associated with a company by its ID
    def get_people(self, id: int) -> list:
        # Gets the company by its ID and returns its associated users
        company = self.get(id)
        return company.people
    
    # Converts a CompanyModel object to a domain Company object
    def to_Company(self, company: CompanyModel) -> Company:
        # Maps the fields of CompanyModel to the corresponding fields of the domain Company
        return Company(
            company.id,
            company.Name,
            company.Limit,
            company.Type,
            company.Addr,
            company.Increase,
            company.Extra_Percent
        )
    
    # Converts a dictionary of values into a dictionary formatted for creating or updating a CompanyModel
    def to_model(self, values: dict) -> dict:
        # Maps the input dictionary values to the expected keys for the model
        return { 
            'Limit': values['Limit'],
            'Name': values['Name'],
            'Type': values['Type'],
            'Addr': values['Addr'], 
            'Increase': (values['Increase'] if values.__contains__('Increase') else 20),  # Default to 20 if not provided
            'Extra_Percent': (values['Extra_Percent'] if values.__contains__('Extra_Percent') else 15)  # Default to 15 if not provided
        }



        