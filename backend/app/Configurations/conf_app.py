from flask import Flask
from flask_cors import CORS
from Configurations import ConfigApp
from auth.jwt_extension import init_jwt
from Configurations.database import Base, SessionLocal, engine
from flask_migrate import Migrate

# Import Blueprints for different routes
from routes.user_routes import user_bp
from routes.company_routes import branch_bp
from routes.area_routes import area_bp
from routes.equipments_routes import equips_bp
from routes.access import access_bp
from routes.register_bill_routes import bill_bp
from routes.query_routes import consult_bp
from routes.plugins import plugin_bp

# Register routes for the app
def register_routes(app):
    app.register_blueprint(user_bp, url_prefix="/api/user")
    app.register_blueprint(branch_bp, url_prefix='/api/branch')
    app.register_blueprint(area_bp, url_prefix='/api/area')
    app.register_blueprint(equips_bp, url_prefix='/api/equipment')
    app.register_blueprint(access_bp, url_prefix='/api/access')
    app.register_blueprint(bill_bp, url_prefix='/api/bill')
    app.register_blueprint(consult_bp, url_prefix='/api/consult')
    app.register_blueprint(plugin_bp, url_prefix='/api/plugin')

from flask import jsonify
from Configurations.CustomError import CustomError
from seed.seed_data import seed_data

# Error handlers for the app
def register_error_handlers(app):
    @app.errorhandler(CustomError)
    def handle_custom_error(e):
        response = {"error": e.args[0]}
        return jsonify(response), e.status_code

    @app.errorhandler(404)
    def handle_not_found(e):
        return jsonify({"error": "Resource not found"}), 404

    @app.errorhandler(500)
    def handle_internal_error(e):
        return jsonify({"error": "Internal Server Error"}), 500    

# Create and configure the Flask app
def create_app():
    app = Flask(__name__)
    
    app.config.from_object(ConfigApp)

    init_jwt(app)
    CORS(app)

    # Crear tablas si no existen
    Base.metadata.create_all(bind=engine)
    # Insertar datos base
    seed_data()
    # Inicializar Flask-Migrate
    Migrate(app, engine)

    register_routes(app)
    register_error_handlers(app)

    return app
