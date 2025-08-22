
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from app.models import Admin, db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Email and password required'}), 400
    
    admin = Admin.query.filter_by(email=data['email']).first()
    
    if admin and admin.check_password(data['password']):
        access_token = create_access_token(identity=admin.admin_id)
        return jsonify({
            'access_token': access_token,
            'admin': {
                'id': admin.admin_id,
                'name': admin.name,
                'email': admin.email
            }
        }), 200
    
    return jsonify({'error': 'Invalid credentials'}), 401

