import os

import pdfkit

from plugins import BaseController

class Controller(BaseController):

    @staticmethod
    def export(data: str) -> bytes:
        with open("/tmp/res.pdf", "wb") as file:
            file.write(pdfkit.from_string(data))
        return pdfkit.from_string(data)
