from flask import Blueprint, jsonify, request
from main import BC as bc, CC as cc, AC as ac, EC as ec
from flask_jwt_extended import jwt_required

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