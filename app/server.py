
from functools import wraps
from flask import Blueprint, Flask, jsonify, request, make_response
from flask_cors import CORS
from controllers import User_Op as op

app = Flask(__name__)
CORS(app)
api = Blueprint("api", __name__, url_prefix="/api")

# @app.route("/")
# def index():
#     print("todo se envio bien")
#     return "ok"

# Ruta para obtener la lista de usuarios
@app.route("/api/users", methods=["GET"])
def get_users():
    users=op.get_users(1)
    return jsonify(users),200

# Ruta para agregar un nuevo usuario
@app.route("/api/users", methods=["POST"])
def add_user():
    new_user = request.json
    new_user=op.add_user
    return jsonify(new_user), 201

# Ruta para actualizar un usuario existente
@app.route("/api/users/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    updated_user = request.json
    for user in users:
        if user["id"] == user_id:
            user.update(updated_user)
            return jsonify(user)
    return jsonify({"error": "Usuario no encontrado"}), 404

# Ruta para eliminar un usuario
@app.route("/api/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    global users
    users = [user for user in users if user["id"] != user_id]
    return jsonify({"message": "Usuario eliminado"}), 200

app.run(port=5050)
