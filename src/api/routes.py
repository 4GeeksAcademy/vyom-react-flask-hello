"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

bcrypt = Bcrypt()
jwt = JWTManager()
# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/users')
@jwt_required()
def get_users_list():
    try:
        users = User.query.all()
        list_users = [user.serialize() for user in users]

        if not list_users:
            return jsonify({'results': []}), 200

        return jsonify({'results': list_users}), 200

    except Exception as e:
        return jsonify({'error': 'Falla en el servidor'}), 500


@api.route('/register', methods=['POST'])
def create_user():
    try:
        email = request.json.get('email')
        user_name = request.json.get("user_name")
        first_name = request.json.get("first_name")
        last_name = request.json.get('last_name')
        password = request.json.get('password')

        if not email or not user_name or not first_name or not last_name or not password:
            return({'error': 'Complete todos los datos necesarios'}), 404

        existing_user_name = User.query.filter_by(user_name = user_name).first()
        existing_email = User.query.filter_by(email=email).first()

        if existing_email or existing_user_name:
            return jsonify({'error': 'El usuario o email ya existen'}), 409

        password_has = bcrypt.generate_password_hash(password).decode('utf-8')

        new_user = User(user_name=user_name, email=email, first_name=first_name, last_name=last_name, password=password_has)

        db.session.add(new_user)
        db.session.commit()

        return jsonify({'msg': 'todo bien papu'})

    except Exception as e:
        return jsonify({'error': 'Falla en el servidor'})


@api.route('/login', methods=['POST'])
def login_user():
    try:

        email = request.json.get('email')
        password = request.json.get('password')

        if not email or not password:
            return jsonify({'error': 'Complete email y password'}), 400

        existing_user = User.query.filter_by(email=email).first() # comprobamos si el email ingresado existe en nuestra base de datos

        if not existing_user:
            return jsonify({'error': f'{email} no existe en la base de datos'}), 404 
        
        password_from_db = existing_user.password

        password_comparation = bcrypt.check_password_hash(password_from_db, password) # comprueba si la contrasena hasheada en la db pertenece al usuario

        if password_comparation:
            user_id = existing_user.id
            access_token = create_access_token(identity=user_id)
            return jsonify({'access_token': access_token, 'user_name': existing_user.user_name, "email": existing_user.email}), 200
        else:
            return jsonify({'error': 'Contrasena incorrecta'}), 404


    except Exception as e:
        return jsonify({'error': 'Falla en el servidor ' + str(e)}), 500

