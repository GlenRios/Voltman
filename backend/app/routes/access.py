from flask import Blueprint, Flask, jsonify, request
from main import UC as uc
from Configurations.CustomError import CustomError
from auth.permission import USER_MANAGEMENT_PERMISSION, BRANCH_MANAGEMENT_PERMISSION, REGISTER_CONSUME_PERMISSION, QUERY_PERMISSION
from flask_jwt_extended import get_jwt_identity, jwt_required


access_bp = Blueprint("access", __name__)

@access_bp.route("/<string:permission>/", methods=["GET"])
@jwt_required(optional=False)
def protected(permission):
    username= get_jwt_identity()
    user= uc.get(username)
    role= user.Type

    if permission=='users': 
        return "ok", (403 if role not in USER_MANAGEMENT_PERMISSION else 200)
    if permission=='branches':
        return "ok",( 403 if role not in BRANCH_MANAGEMENT_PERMISSION else 200)
    if permission=='bills':
        return "ok", (403 if role not in REGISTER_CONSUME_PERMISSION else 200)
    if permission == 'log_out':
        #implementar logout
        return "ok", 200
    if permission=='consults':
        return "ok", 200