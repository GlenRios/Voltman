
from functools import wraps
from flask import Blueprint, Flask, jsonify, request, make_response
from flask_cors import CORS
from controllers import User_Op as op

app = Flask(__name__)
CORS(app)
api = Blueprint("api", __name__, url_prefix="/api")

@app.route("/")
def index():
    return "ok"

# Ruta para obtener la lista de usuarios
@app.route("/api/user", methods=["GET"])
def get_users():
    users=op.get_users(2)
    return jsonify(users),200

# Ruta para agregar un nuevo usuario
@app.route("/api/user", methods=["POST"])
def add_user():
    new_user = request.json
    new_user=op.add_user(new_user)
    route=201
    if new_user.__contains__("error"):
        route= 300
    return jsonify(new_user), route

# Ruta para actualizar un usuario existente
@app.route("/api/user/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    updated_user = request.json
    updated_user=op.modified_user(updated_user, user_id)
    route=200
    if updated_user.__contains__("error"): 
        route=404
    return jsonify(updated_user) , route

# Ruta para eliminar un usuario
@app.route("/api/user/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    if op.delete_user(user_id):
        return jsonify({"message": "Usuario eliminado"}), 200
    return jsonify({"error": "User not found"}), 404

@app.route("/api/user/login", methods =["POST"])
def login():
    user = request.json
    response = op.check_user_login(user['Username'],user['Password'])
    if response['error']:
        return jsonify(response), 400
    

app.run(port=5050)
