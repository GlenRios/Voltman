from flask import Blueprint, Flask, jsonify, request
from app.Configurations.dependencies import EC as ec, AC as ac
from app.Configurations.CustomError import CustomError
from app.auth.permission import branch_management_permission_required


equips_bp = Blueprint("equipment", __name__)

# equipment
@equips_bp.route("/<int:id>/", methods=['GET'])
@branch_management_permission_required
def list_equipment(id):
    areas= ac.get_all(id)
    equipments= ec.get_all(areas)
    return jsonify(equipments), 200

@equips_bp.route("/", methods=["POST",])
@branch_management_permission_required
def create_equipment():
    data = request.json
    new_equipment = ec.post(data)
    return jsonify(new_equipment), 200

@equips_bp.route("/<int:id>/", methods=["PUT", "PATCH"])
@branch_management_permission_required
def update_equipment(id):
    data = request.json
    updated_equipment= ec.put(id, data)
    return jsonify(updated_equipment), 200

@equips_bp.route("/<int:id>/", methods=["DELETE",])
@branch_management_permission_required
def delete_equipment(id):
    ec.delete(id)
    return jsonify({'message':'Equipment deleted successfully'})