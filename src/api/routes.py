from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/registro', methods=['POST'])
def registrar_usuario():
    email = request.json.get('email')
    password = request.json.get('password')
    
    if not email:
        return 'Debes especificar un email', 400
    if not password:
        return 'Debes especificar un password', 400

    usuario_ya_existe = User.query.filter_by(email=email).first()
    if usuario_ya_existe:
        return 'El usuario ya existe', 400

    nuevo_usuario = User(email=email, password=password, is_active=True) 

    db.session.add(nuevo_usuario)
    db.session.commit()

    return jsonify({
        "id": nuevo_usuario.id,
        "email": nuevo_usuario.email,
        "is_active": nuevo_usuario.is_active 
    }), 201

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    usuario = User.query.filter_by(email=email, password=password).first()

    if usuario is None:
        return jsonify({"msg": "email o contraseña incorrecto"}), 401
    
    access_token = create_access_token(identity=usuario.id)
    #print(f"Token: {access_token}, ID: {usuario.id}, Password: {password}")
    return jsonify({ "token": access_token, "user_id": usuario.id })

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    id_usuario_actual = get_jwt_identity()
    usuario = User.query.get(id_usuario_actual)
    
    #print(f", ID: {usuario.id}, Password: {usuario.password}")
    return jsonify({"id": usuario.id, "email": usuario.email }), 200
