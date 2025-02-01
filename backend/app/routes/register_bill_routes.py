from flask import Blueprint, jsonify, request
from main import BC as bc
from auth.permission import register_consume_permission_required


bill_bp = Blueprint("bill", __name__)

@bill_bp.route("/", methods= ['POST'])
@register_consume_permission_required
def create_bill():
    data= request.json
    bc.post(data)
    return jsonify({'message':'Operation Successfully'}), 200