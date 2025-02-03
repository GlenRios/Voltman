
class CompanyController:

    # Initialize the controller with the ICompany interface for company-related operations
    def __init__(self, icompany):
        self.Icompany = icompany  # Interface for company operations

    # Get a company by its name
    def get(self, name: str):
        return self.Icompany.get(name)
    
    # Get a company by its ID
    def get_by_id(self, id: int):
        return self.Icompany.get_by_id(id)

    # Create a new company
    def post(self, values: dict):
        return self.Icompany.create(values)
    
    # Delete a company by its ID
    def delete(self, id: int):
        return self.Icompany.delete(id)
    
    # Update a company's information by its ID
    def put(self, id: int, values: dict):
        return self.Icompany.update(id, values)
    
    # Get all companies
    def get_all(self):
        return self.Icompany.get_all()
    
    # Update the company's formula for 'Increase' and 'Extra_Percent'
    def update_formule(self, data: dict, id: int):
        # Get the company by its ID
        company = self.get_by_id(id)
        # Update the company's formula fields
        company['Increase'] = data['Increase']
        company['Extra_Percent'] = data['Extra_Percent']
        # Apply the updated formula and save the company data
        return self.put(id, company)
