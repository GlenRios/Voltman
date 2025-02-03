from code import InteractiveConsole
from pathlib import Path

# to avoid ^[[A nonsense when pressing up arrow
import readline
import sys
from sqlalchemy import func
from sqlalchemy.sql import text


sys.path.append(str(Path(__file__).parent.parent))
from controllers import *
from db.models import Area, Bill, User, Equipment, Group, Company
from main import db

banner = """
#######################################
# mange database interactive console #
#######################################
A Client instance is already defined (as 'db') and connected to the database.
Use it to make queries.
"""
i = InteractiveConsole(locals=locals())
i.interact(banner=banner)
