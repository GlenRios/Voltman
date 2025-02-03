from flask import Blueprint, Flask, jsonify, request
from app.Configurations.dependencies import UC as uc
from app.Configurations.CustomError import CustomError
from app.Configurations import BASE_DIR
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity
from app.auth.permission import user_management_permission_required

user_bp = Blueprint("user", __name__)

# Route to loggin
@user_bp.route("/login/", methods= ['POST'])
def login():
    data = request.json
    username= data['Username']
    uc.login(data)
    token = create_access_token(identity=username)
    return jsonify(token= token), 200

# Route to get the list of users
@user_bp.route("/", methods=["GET", "POST"])
@user_management_permission_required
def get_users():
    username = get_jwt_identity()
    if request.method == "GET":
        users= uc.get_all_in_company(username)
        return jsonify(users), 200

    new_user = request.json
    new_user=uc.post(new_user)
    return jsonify(new_user), 200

# Route to modify an existing user
@user_bp.route("/<int:user_id>/", methods=["PUT"])
@user_management_permission_required
def update_user(user_id):
    updated_user = request.json
    updated_user=uc.put(updated_user, user_id)
    return jsonify(updated_user) , 200
     

# Route to delete an user
@user_bp.route("/<int:user_id>/", methods=["DELETE"])
@user_management_permission_required
def delete_user(user_id):
    uc.delete(user_id)
    return jsonify({"message": "User deleted successfully"}), 200
