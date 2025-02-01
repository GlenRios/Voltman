from flask import Blueprint, Flask, jsonify, request
from main import CC as cc, UC as uc
from Configurations.CustomError import CustomError
from Configurations import BASE_DIR
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity
from auth.permission import branch_management_permission_required, branch_edit_formule_permission_required, branch_post_delete_permission_required

branch_bp = Blueprint("branch", __name__)

@branch_bp.route("/", methods= ['GET'])
@branch_management_permission_required
def list_branch():
    username = get_jwt_identity()
    user= uc.get(username)
    group= user.Type
    
    if group == 'SuperAdmin':
        companies= cc.get_all()
        return jsonify(companies) , 200
    
    company = cc.get(user.Company)
    return jsonify([company]), 200

@branch_bp.route("/info/<string:name>/", methods= ['GET'])
@branch_management_permission_required
def get_branch(name):
    company= cc.get(name)
    return jsonify(company), 200

@branch_bp.route("/", methods=["POST",])
@branch_post_delete_permission_required
def create_branch():
    data = request.json
    new_company = cc.post(data)
    return jsonify(new_company), 200

@branch_bp.route("/<int:id>/", methods=["PUT", "PATCH"])
@branch_management_permission_required
def update_branch(id):
    data = request.json
    updated_company= cc.put(id, data)
    return jsonify(updated_company) , 200

@branch_bp.route("/formule/<int:id>/", methods=["PUT", "PATCH"])
@branch_edit_formule_permission_required
def update_formule(id):
    data = request.json
    updated_company= cc.update_formule(data, id)
    return jsonify(updated_company), 200

@branch_bp.route("/<int:id>/", methods=["DELETE"])
@branch_post_delete_permission_required
def delete_branch(id):
    cc.delete(id)
    return jsonify({'message': 'Company deleted successfully'}), 200