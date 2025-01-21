
class AreaController:

    def __init__(self, iarea):
        self.Iarea= iarea

    def get(self, id: int):
        return self.Iarea.get(id)

    def post(self, values: dict):
        return self.Iarea.create(values)
    
    def delete(self, id: int):
        return self.Iarea.delete(id)
    
    def put(self, id, values: dict):
        return self.Iarea.update(id, values)
    
    
    
