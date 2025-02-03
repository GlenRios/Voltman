from functools import wraps
from flask_jwt_extended import get_jwt_identity, jwt_required
from app.Configurations.CustomError import CustomError  
from app.Configurations.dependencies import UC as uc

USER_MANAGEMENT_PERMISSION=[
    'SuperAdmin',
    'Admin',
]

BRANCH_MANAGEMENT_PERMISSION=[
    'SuperAdmin',
    'Admin',
    'Manacher',
]

BRANCH_POST_DELETE_PERMISSION=[
    'SuperAdmin'
]

BRANCH_EDIT_FORMULE_PERMISSION=[
    'SuperAdmin',
    'Admin',
]

REGISTER_CONSUME_PERMISSION=[
    'SuperAdmin',
    'Manacher',
]

QUERY_PERMISSION=[
    'SuperAdmin',
    'Admin',
    'Manacher',
    'Analyst'
]

def permission_required(permission_group):
    def external_wrapper(fun):
        @wraps(fun)
        def internal_wrapper(*args, **kwargs):
            username = get_jwt_identity()
            user = uc.get(username)
            group = user.Type 

            if group not in permission_group:
                raise CustomError("Not Allowed", 403)

            return fun(*args, **kwargs)
        return jwt_required(optional=False)(internal_wrapper)
    return external_wrapper

def user_management_permission_required(fun):
    return permission_required(USER_MANAGEMENT_PERMISSION)(fun)

def branch_management_permission_required(fun):
    return permission_required(BRANCH_MANAGEMENT_PERMISSION)(fun)

def branch_post_delete_permission_required(fun):
    return permission_required(BRANCH_POST_DELETE_PERMISSION)(fun)

def branch_edit_formule_permission_required(fun):
    return permission_required(BRANCH_EDIT_FORMULE_PERMISSION)(fun)

def branch_post_delete_permission_required(fun):
    return permission_required(BRANCH_POST_DELETE_PERMISSION)(fun)

def branch_post_delete_permission_required(fun):
    return permission_required(BRANCH_POST_DELETE_PERMISSION)(fun)

def register_consume_permission_required(fun):
    return permission_required(REGISTER_CONSUME_PERMISSION)(fun)

def query_permission_required(fun):
    return permission_required(QUERY_PERMISSION)(fun)
