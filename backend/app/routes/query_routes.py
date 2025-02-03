from flask import Blueprint, jsonify, request
from app.Configurations.dependencies import BC as bc, CC as cc, AC as ac, EC as ec, UC as uc
from flask_jwt_extended import jwt_required, get_jwt_identity

consult_bp = Blueprint("consult", __name__)


@consult_bp.route("/companies/", methods=['GET'])
@jwt_required(optional=False)
def get_all_companies():
    return cc.get_all(), 200

@consult_bp.route('/areas/<string:company>/', methods=['GET'])
@jwt_required(optional=False)
def get_consult_areas(company):
    id= cc.get(company)['id']
    areas= ac.get_all(id)
    return jsonify(areas), 200


@consult_bp.route('/equipments/<string:Company>/<string:Name>/', methods=['GET'])
@jwt_required(optional=False)
def get_equipments_in_area(Company, Name):
    id= ac.get_by_company(Company, Name)
    equips= ec.get_equipments_in_area(id)
    return jsonify(equips) , 200


@consult_bp.route('/totalConsumption/', methods= ['POST',])
@jwt_required(optional=False)
def get_consume():
    data= request.json
    answ= bc.get_consume(data)
    print(answ)
    return jsonify(answ), 200

@consult_bp.route('/averageMonthly/', methods=['POST'])
@jwt_required(optional=False)
def calculate_average_consume():
    data= request.json
    answ= bc.calculate_monthly_average_consumption(data)
    return answ, 200

@consult_bp.route('/limitExceeded/<string:date>/', methods=['GET'])
@jwt_required(optional=False)
def limitExceeded(date):
    answ= bc.get_companies_limit_exceeded(date)
    return jsonify(answ), 200


@consult_bp.route('/prediction/<string:company>/', methods=['GET'])
@jwt_required(optional=False)
def predict(company):
    answ= bc.predict_consume(company)
    return jsonify(answ), 200

@consult_bp.route('/alerts/', methods=['GET'])
@jwt_required(optional=False)
def show_alerts():
    username= get_jwt_identity()
    user = uc.get(username)
    company= user.Company
    answ= bc.get_alerts(company)
    return jsonify(answ), 200

@consult_bp.route('/getCost/', methods=['POST'])
@jwt_required(optional=False)
def get_cost():
    data= request.json
    answ= bc.get_cost(data)
    return jsonify(answ), 200

@consult_bp.route('/compareConsumption/', methods=['POST'])
@jwt_required(optional=False)
def compare_consumption():
    data= request.json
    answ= bc.compare_consumption(data)
    return jsonify(answ), 200



