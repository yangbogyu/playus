from logging import fatal
import os, pymysql, json, datetime, bcrypt
from flask import request
from flask_restx import Resource, Api, Namespace
from dotenv import load_dotenv

load_dotenv() # `.env`파일 불러옴

db = pymysql.connect(host=os.getenv('MYSQL_HOST'),
                    port=int(os.getenv('MYSQL_PORT')),
                    user=os.getenv('MYSQL_USER'),
                    passwd=os.getenv('MYSQL_PASSWORD'),
                    db=os.getenv('MYSQL_DATABASE'),
                    charset=os.getenv('MYSQL_CHARSET'),
                    cursorclass=pymysql.cursors.DictCursor)\

Player = Namespace(
    name='Login',
    description='유저관리를 위한 API'
)

@Player.route('/membership')
class Membership(Resource):
    def post(self):
        '''회원가입'''

        data = request.get_json()
        user_id = data['user_id']
        user_pw = data['user_pw']
        user_name = data['user_name']
        user_mail = data['user_mail']

        user_bcrypt = bcrypt.hashpw(user_pw.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        base = db.cursor()
        sql = f'insert into Player(user_id, user_pw, user_name, user_mail)\
                values ("{user_id}", "{user_bcrypt}", "{user_name}", "{user_mail}");'
        base.execute(sql)
        db.commit()
        base.close()
        print(user_pw)
        return {'membership' : True}

@Player.route('/membership/<string:user_id>')
class CheckID(Resource):
    def get(self, user_id):
        '''회원가입 ID중복 확인'''
        base = db.cursor()
        sql = f'select user_id\
                from Player\
                where user_id = "{user_id}"'
        base.execute(sql)
        user = base.fetchall()
        base.close()
        if user != '':
            return {'ID': False}
        return {'ID': True}


@Player.route('/login')
class Login(Resource):
    def put(self):
        '''로그인 인증'''

        data = request.get_json()
        user_id = data['user_id']
        user_pw = data['user_pw']

        base = db.cursor()
        sql = f'select user_id\
                from Player\
                where user_id = "{user_id}"'
        base.execute(sql)
        user = base.fetchall()
        if user == '':
            return{'user': False}
        else :
            base = db.cursor()
            sql = f'select user_pw\
                from Player\
                where user_id = "{user_id}"'
            base.execute(sql)
            user = {"user":base.fetchall()}
            for r in user['user']:
                user_bcrypt = r['user_pw']
                PW = bcrypt.checkpw(user_pw.encode('utf-8'), user_bcrypt.encode('utf-8'))
                return {'user': PW}
        