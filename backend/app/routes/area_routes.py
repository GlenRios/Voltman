from flask import Blueprint, Flask, jsonify, request
from Configurations.dependencies import AC as ac
from Configurations.CustomError import CustomError
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity
from auth.permission import branch_management_permission_required


area_bp = Blueprint("area", __name__)

@area_bp.route("/<int:id>/", methods=['GET'])
@branch_management_permission_required
def list_area(id):
    areas= ac.get_all(id)
    return jsonify(areas), 200

@area_bp.route("/", methods=["POST",])
@branch_management_permission_required
def create_area():
    data = request.json
    new_area = ac.post(data)
    return jsonify(new_area), 200

@area_bp.route("/<int:id>/", methods=["PUT", "PATCH"])
@branch_management_permission_required
def update_area(id):
    data = request.json
    updated_area= ac.put(id, data)
    return jsonify(updated_area), 200

@area_bp.route("/<int:id>/", methods=["DELETE",])
@branch_management_permission_required
def delete_area(id):
    ac.delete(id)
    return jsonify({'messagge': 'Area deleted successfully.'}), 200