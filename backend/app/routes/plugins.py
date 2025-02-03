import base64
import importlib
from app.Configurations import BASE_DIR
import sys 
from flask import Blueprint, request
from flask_jwt_extended import jwt_required


plugin_bp = Blueprint("plugin", __name__)


def import_from_path(module_name, file_path):
    """Import a module given its name and file path."""
    spec = importlib.util.spec_from_file_location(module_name, file_path)
    module = importlib.util.module_from_spec(spec)
    # sys.modules[module_name] = module
    spec.loader.exec_module(module)
    return module

PLUGIN_FOLDER = "plugins"

# helper functions for the plugin functionality
def get_plugins():
    """
    Yield all the available plugins.
    Notice it's a generator.
    """
    for plugin in (BASE_DIR / PLUGIN_FOLDER).glob("*.py"):
        if plugin.name.endswith("__init__.py"):
            continue
        yield plugin.name.split(".")[0]

def export_data(name, data):
    """
    1. Dynamically load the required libraries for plugins (must have been installed beforehand)
    2. Send the data to the controller (usually HTML)
    3. Clean up by de-importing the libraries (probably not required)
    """
    env_path = BASE_DIR / PLUGIN_FOLDER / "env"

    python = f"python{sys.version_info.major}.{sys.version_info.minor}"

    lib = env_path / "lib" / python  / "site-packages"
    lib64 = env_path / "lib64" / python / "site-packages"
    plugin_dir = BASE_DIR

    sys.path.extend((
        str(lib),
        str(lib64),
        str(plugin_dir),
    ))

    plugin = import_from_path(name, plugin_dir / "plugins" / f"{name}.py")

    controller = plugin.Controller

    result = controller.export(data)

    sys.path.remove(str(lib))
    sys.path.remove(str(lib64))
    sys.path.remove(str(plugin_dir))

    return result

@plugin_bp.route("/")
@jwt_required(optional=False)
def plugin_list():
    return list(get_plugins())

@plugin_bp.route("/<string:name>/", methods=["POST",])
@jwt_required(optional=False)
def plugin_export(name):
    """
    Wrapper function that, given a plugin and 
    """
    kwargs = request.json

    data = kwargs.get("data", "<html></html>")

    result = export_data(name, data)

    return {
        "data": base64.b64encode(result).decode("utf8"),
    }