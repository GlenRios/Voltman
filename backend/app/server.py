from functools import wraps
from flask import Blueprint, Flask, jsonify, request, make_response
from flask_cors import CORS
from controllers import user_controller as uc
from Configurations.CustomError import CustomError
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity


app = Flask(__name__)
CORS(app)
api = Blueprint("api", __name__, url_prefix="/api")


@app.errorhandler(CustomError)
def handle_custom_error(e):
    response = {"error": e.args[0]}
    return jsonify(response), e.status_code

# Route to loggin
@app.route("/api/user/login/", methods= ['POST'])
def login():
    data = request.get_json()
    username= data.get('Username')
    uc.login(data)
    token = create_access_token(identity={'Username': username})
    return jsonify(token= token), 200

# Route to get the list of users
@app.route("/api/user/", methods=["GET"])
def get_users():
    data= request.json
    token= data['token']
    username= get_jwt_identity()  
    users= uc.get(username)
    return jsonify(users),200

# Route to add a new user
@app.route("/api/user", methods=["POST"])
def add_user():
    new_user = request.json
    new_user=uc.post(new_user)
    return jsonify(new_user), 200
    
# Route to modify an existing user
@app.route("/api/user/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    updated_user = request.json
    updated_user=uc.put(updated_user, user_id)
    return jsonify(updated_user) , 200
     

# Route to delete an user
@app.route("/api/user/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    uc.delete(user_id)
    return jsonify({"message": "User deleted successfully"}), 200

app.run(port= 5050)


