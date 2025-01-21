import base64
import importlib
from functools import wraps
from flask import Blueprint, Flask, jsonify, request, make_response
from flask_cors import CORS
from main import UC as uc, CC as cc, AC as ac, EC as ec
from Configurations.CustomError import CustomError
from Configurations import BASE_DIR
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import sys

def import_from_path(module_name, file_path):
    """Import a module given its name and file path."""
    spec = importlib.util.spec_from_file_location(module_name, file_path)
    module = importlib.util.module_from_spec(spec)
    # sys.modules[module_name] = module
    spec.loader.exec_module(module)
    breakpoint()
    return module

app = Flask(__name__)

SECRET_KEY=  "hsgsy(add$5231524#bdsjfkelgro*ght*73@gwqt4qthd+pjk^df#"

PLUGIN_FOLDER = "plugins"

app.config["JWT_SECRET_KEY"] = SECRET_KEY
app.config['JWT_TOKEN_LOCATION'] = ['headers']  # Indica que los tokens se almacenarán en cookies
app.config['JWT_COOKIE_SECURE'] = False  # Cambiar a True en producción (HTTPS obligatorio)
app.config['JWT_COOKIE_SAMESITE'] = 'None'  # Evita que cookies se envíen en solicitudes de terceros
app.config['JWT_COOKIE_CSRF_PROTECT'] = False  # Habilitar protección CSRF
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 3600  # 1 hora
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = 3600  # 1 hora

jwt_ = JWTManager(app)

CORS(app)
api = Blueprint("api", __name__, url_prefix="/api")


@app.errorhandler(CustomError)
def handle_custom_error(e):
    response = {"error": e.args[0]}
    return jsonify(response), e.status_code

# Route to loggin
@app.route("/api/user/login", methods= ['POST'])
def login():
    data = request.json
    username= data['Username']
    uc.login(data)
    token = create_access_token(identity=username)
    return jsonify(token= token), 200

# Route to get the list of users
@app.route("/api/user/", methods=["GET"])
@jwt_required( optional=False )
def get_users():
    username = get_jwt_identity()
    users= uc.get_all_in_company(username)
    return jsonify(users), 200

# Route to add a new user
@app.route("/api/user", methods=["POST"])
def add_user():
    new_user = request.json
    new_user=uc.post(new_user)
    return jsonify(new_user), 200
    
# Route to modify an existing user
@app.route("/api/user/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    updated_user = request.json
    updated_user=uc.put(updated_user, user_id)
    return jsonify(updated_user) , 200
     

# Route to delete an user
@app.route("/api/user/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    uc.delete(user_id)
    return jsonify({"message": "User deleted successfully"}), 200


# helper functions for the plugin functionality
def get_plugins():
    """
    Yield all the available plugins.
    Notice it's a generator.
    """
    for plugin in (BASE_DIR / PLUGIN_FOLDER).glob("*.py"):
        if plugin.name.endswith("__init__.py"):
            continue
        yield plugin.name.split(".")[0]

def export_data(name, data):
    """
    1. Dynamically load the required libraries for plugins (must have been installed beforehand)
    2. Send the data to the controller (usually HTML)
    3. Clean up by de-importing the libraries (probably not required)
    """
    env_path = BASE_DIR / PLUGIN_FOLDER / "env"

    python = f"python{sys.version_info.major}.{sys.version_info.minor}"

    lib = env_path / "lib" / python  / "site-packages"
    lib64 = env_path / "lib64" / python / "site-packages"
    plugin_dir = BASE_DIR

    sys.path.extend((
        str(lib),
        str(lib64),
        str(plugin_dir),
    ))

    plugin = import_from_path(name, plugin_dir / "plugins" / f"{name}.py")

    controller = plugin.Controller

    result = controller.export(data)

    sys.path.remove(str(lib))
    sys.path.remove(str(lib64))
    sys.path.remove(str(plugin_dir))

    return result

@app.route("/api/plugin/")
def plugin_list():
    return list(get_plugins())

@app.route("/api/plugin/<name>/", methods=["POST",])
def plugin_export(name):
    """
    Wrapper function that, given a plugin and 
    """
    kwargs = request.json

    data = kwargs.get("data", "<html></html>")

    result = export_data(name, data)

    return {
        "data": base64.b64encode(result).decode("utf8"),
    }

BRANCH_READ_PERMISSION = (
    "SuperAdmin",
    "Admin",
    "Manacher", # lmao
)

BRANCH_WRITE_PERMISSION = (
    "SuperAdmin",
    "Admin",
)

# branch

@app.route("/api/branch/", methods= ['GET'])
@jwt_required(optional=False)
def list_branch():
    username = get_jwt_identity()
    user= uc.get(username)
    group= user.Type
    if group is 'SuperAdmin':
        companies= cc.get_all()
        return jsonify(companies) , 200
    
    company = cc.get(user.Company)
    return jsonify(company), 200


@app.route("/api/branch/", methods=["POST",])
def create_branch():
    data = request.json
    new_company = cc.post(data)
    return new_company

@app.route("/api/branch/<int:id>", methods=["PUT", "PATCH"])
def update_branch(id):
    data = request.json
    updated_company= cc.put(id, data)
    return jsonify(updated_company) , 200

@app.route("/api/branch/<int:id>", methods=["DELETE",])
def delete_branch(id):
    cc.delete(id)
    return jsonify({'message': 'Company deleted successfully'}), 200



# area
@app.route("/api/area/")
#@jwt_required(optional=False)
def list_area():
    #username = get_jwt_identity()
    #users= uc.get(username)

    group = uc.Iuser.repo.get(1).group
    if group.Name not in BRANCH_READ_PERMISSION:
        raise CustomError("Not allowed", 403)

    company = uc.Iuser.repo.get(1).company

    return [area.as_dict() for area in company.areas]

@app.route("/api/area/", methods=["POST",])
#@jwt_required( optional=False )
def create_area():
    data = request.json
    new_area = ac.post(data)

    return new_area

@app.route("/api/area/<int:id>", methods=["PUT", "PATCH"])
#@jwt_required(optional=False)
def update_area(id):
    data = request.json
    repo = ac.Iarea.repo
    updated_area = repo.put(id, data, ["Name",])
    if not updated_area:
        return "Not found", 404
    return updated_area.as_dict()

@app.route("/api/area/<int:id>", methods=["DELETE",])
def delete_area(id):
    repo = ac.Iarea.repo
    existed = repo.delete(id)
    
    return "", 200 if existed else 404

# equipment
@app.route("/api/equipment/")
#@jwt_required(optional=False)
def list_equipment():
    #username = get_jwt_identity()
    #users= uc.get(username)

    group = uc.Iuser.repo.get(1).group
    if group.Name not in BRANCH_READ_PERMISSION:
        raise CustomError("Not allowed", 403)

    company = uc.Iuser.repo.get(1).company

    items = []
    for area in company.areas:
        for equipment in area.equipments:
            items.append(equipment.as_dict())
    return items

@app.route("/api/equipment/", methods=["POST",])
#@jwt_required( optional=False )
def create_equipment():
    data = request.json
    new_equipment = ec.post(data)

    return new_equipment

@app.route("/api/equipment/<int:id>", methods=["PUT", "PATCH"])
#@jwt_required(optional=False)
def update_equipment(id):
    data = request.json
    repo = ec.Iequipment.repo
    updated_equipment = repo.put(id, data, ["Name",])
    if not updated_equipment:
        return "Not found", 404
    return updated_equipment.as_dict()

@app.route("/api/equipment/<int:id>", methods=["DELETE",])
def delete_equipment(id):
    repo = ec.Iequipment.repo
    existed = repo.delete(id)
    
    return "", 200 if existed else 404

app.run(port= 5050,debug=True)


