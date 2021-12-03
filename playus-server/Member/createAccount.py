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

def setDB():
    db = pymysql.connect(host=os.getenv('MYSQL_HOST'),
                        port=int(os.getenv('MYSQL_PORT')),
                        user=os.getenv('MYSQL_USER'),
                        passwd=os.getenv('MYSQL_PASSWORD'),
                        db=os.getenv('MYSQL_DATABASE'),
                        charset=os.getenv('MYSQL_CHARSET'),
                        cursorclass=pymysql.cursors.DictCursor)
    return db

Create = Namespace(
    name='createAccount',
    description='createAccount API'
)


@Create.route('')
class CreateAccount(Resource):
    def post(self):
        '''회원가입'''

        db = setDB()

        data = request.get_json()
        user_name = data['user_name']
        user_pw = data['user_pw']
        user_phone = data['user_phone']
        user_mail = data['user_mail']
        user_sport = data['user_sport']
        user_address = data['user_address']

        # 스포츠, 지역 null확인
        if user_sport == "" and user_address == "":
            setSQL = 'null, null'
        elif user_sport == "":
            setSQL = f'null, "{user_address}"'
        elif user_address == "":
            setSQL = f'"{user_sport}",null'
        else:
            setSQL = f'"{user_sport}", "{user_address}"'

        # id 체크
        base = db.cursor()
        sql = f'select user_name from User\
                where user_name = "{user_name}";'
        base.execute(sql)
        id = base.fetchall()
        if id:
            base.close()
            return {'id': False}
        else:
            # phone 체크
            base = db.cursor()
            sql = f'select user_phone from User\
                where user_phone = "{user_phone}";'
            base.execute(sql)
            phone = base.fetchall()
            if phone:
                base.close()
                return {'phone': False}
            else:
                # mail 체크
                base = db.cursor()
                sql = f'select user_mail from User\
                    where user_mail = "{user_mail}";'
                base.execute(sql)
                mail = base.fetchall()
                base.close()
                if mail:
                    return {'mail': False}

        # 중복없음 비밀번호 암호화
        user_bcrypt = bcrypt.hashpw(user_pw.encode(
            'utf-8'), bcrypt.gensalt()).decode('utf-8')

        # db값 저장
        base = db.cursor()
        sql = f'insert into User(user_name, user_pw, user_phone, user_mail, user_sport, user_address)\
                values ("{user_name}", "{user_bcrypt}", "{user_phone}", "{user_mail}", {setSQL});'
        base.execute(sql)
        db.commit()
        base.close()
        return {'createAccount': True}


@Create.route('/IDCheck/<string:user_name>')
class IDCheck(Resource):
    def get(self, user_name):
        '''회원가입 ID 중복 확인'''

        db = setDB()

        base = db.cursor()
        sql = f'select user_name\
                from User\
                where user_name = "{user_name}"'
        base.execute(sql)
        user = base.fetchall()
        base.close()
        if user:
            return {'id': False}
        return {'id': True}


@Create.route('/mailCheck/<string:user_mail>')
class MailCheck(Resource):
    def get(self, user_mail):
        '''회원가입 이메일 중복 확인'''

        db = setDB()
        
        base = db.cursor()
        sql = f'select user_mail\
                from User\
                where user_mail = "{user_mail}"'
        base.execute(sql)
        user = base.fetchall()
        base.close()
        if user:
            return {'mail': False}
        return {'mail': True}


@Create.route('/phoneCheck/<string:user_phone>')
class PhoneCheck(Resource):
    def get(self, user_phone):
        '''회원가입 핸드폰 번호 중복 확인'''

        db = setDB()
        
        base = db.cursor()
        sql = f'select user_phone\
                from User\
                where user_phone = "{user_phone}"'
        base.execute(sql)
        user = base.fetchall()
        base.close()
        if user:
            return {'phone': False}
        return {'phone': True}
