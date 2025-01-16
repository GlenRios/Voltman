from controllers.__init__ import Icompany
from Configurations.CustomError import CustomError

def post(values: dict):
    return Icompany.create(values)