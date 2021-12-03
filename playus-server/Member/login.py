from logging import fatal
import os
import pymysql
import json
import datetime
import bcrypt
import jwt
from flask import request
from flask_restx import Resource, Api, Namespace
from dotenv import load_dotenv

load_dotenv()  # `.env`파일 불러옴

def setDB(): # db연동
    db = pymysql.connect(host=os.getenv('MYSQL_HOST'),
                    port=int(os.getenv('MYSQL_PORT')),
                    user=os.getenv('MYSQL_USER'),
                    passwd=os.getenv('MYSQL_PASSWORD'),
                    db=os.getenv('MYSQL_DATABASE'),
                    charset=os.getenv('MYSQL_CHARSET'),
                    cursorclass=pymysql.cursors.DictCursor)
    return db

login = Namespace(
    name='login',
    description='login API'
)


@login.route('')
class Login(Resource):
    def put(self):
        '''로그인 인증'''

        db = setDB()
                    
        data = request.get_json()
        # data = json.loads(request.data)
        user_name = data['user_name']
        user_pw = data['user_pw']

        base = db.cursor()
        sql = f'select user_name\
                from User\
                where user_name = "{user_name}"'
        base.execute(sql)
        user = base.fetchall()
        print(user)

        if user:
            base = db.cursor()
            sql = f'select user_pw\
                from User\
                where user_name = "{user_name}"'
            base.execute(sql)
            user = base.fetchall()
            for r in user:
                user_bcrypt = r['user_pw']
                PW = bcrypt.checkpw(user_pw.encode(
                    'utf-8'), user_bcrypt.encode('utf-8'))
                return {'login': PW}
        else:
            return {'login': False}
