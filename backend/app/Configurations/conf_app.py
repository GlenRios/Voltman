from flask import Flask
from flask_cors import CORS
from app.Configurations import ConfigApp
from app.auth.jwt_extension import init_jwt
from app.Configurations.database import Base, engine, Base, SessionLocal
from flask_migrate import Migrate

# Import Blueprints for different routes
from app.routes.user_routes import user_bp
from app.routes.company_routes import branch_bp
from app.routes.area_routes import area_bp
from app.routes.equipments_routes import equips_bp
from app.routes.access import access_bp
from app.routes.register_bill_routes import bill_bp
from app.routes.query_routes import consult_bp
from app.routes.plugins import plugin_bp

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
from app.Configurations.CustomError import CustomError
from app.seed.seed_data import seed_data

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

    with app.app_context():
        Base.metadata.create_all(bind=engine)
        seed_data()
    # Inicializar Flask-Migrate
    migrate = Migrate(app, engine, base=Base)

    register_routes(app)
    register_error_handlers(app)

    return app
