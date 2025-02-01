from db.models.Area import AreaModel
from db.repos.BaseRepo import BaseRepo
from domain.Area import Area

class AreaRepo(BaseRepo):
    
    # Constructor for AreaRepo class, inherits from BaseRepo and injects company_repo for company data handling
    def __init__(self, db , company_repo):
        super().__init__(db, AreaModel)  # Calls the parent constructor to initialize AreaModel
        self.company_repo = company_repo  # Stores the company repository instance for accessing company data
    
    # Retrieves an AreaModel instance by area name and company name
    def get_by_company(self, name: str, company_name: str) -> AreaModel:
        # Retrieves the company based on the provided company name
        company = self.company_repo.get_byName(company_name)
        # Queries the database to get the area matching the provided name and company ID
        return self.db.query(AreaModel).filter(AreaModel.Name == name and AreaModel.CompanyID == company.id).first()
    
    # Retrieves all equipment associated with an area based on its ID
    def get_equipments(self, id: int):
        area = self.get(id)  # Retrieves the area by ID
        return area.equipments  # Returns the list of equipment associated with the area
    
    # Converts an AreaModel instance (from the database) to a domain Area object
    def to_Area(self, area: AreaModel) -> Area:
        company = self.company_repo.get(area.CompanyID)  # Retrieves the company associated with the area
        # Creates and returns a domain Area object with the area details
        return Area(area.id,
                    company.Name, 
                    area.Name, 
                    area.Responsible)
    
    # Converts the provided input values (from the UI or an API) to a dictionary format suitable for creating or updating an AreaModel
    def to_model(self, values: dict) -> dict:
        # Retrieves the company ID using the company name
        company_id = self.company_repo.get_byName(values['Company']).id
        # Returns a dictionary with the necessary data to create an AreaModel
        return {'CompanyID': company_id, 
                'Name': values['Name'], 
                'Responsible': values['Responsible']}
