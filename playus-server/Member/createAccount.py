from logging import fatal
import os, pymysql, json, datetime, bcrypt, jwt
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

Create = Namespace(
    name='createAccount',
    description='createAccount API'
    )

@Create.route('')
class CreateAccount(Resource):
    def post(self):
        '''회원가입'''

        data = request.get_json()
        user_name = data['user_name']
        user_pw = data['user_pw']
        user_phone = data['user_phone']
        user_mail = data['user_mail']

        #id 체크
        base = db.cursor()
        sql = f'select user_name from User\
                where user_name = "{user_name}";'
        base.execute(sql)
        id = base.fetchall()
        if id:
            base.close()
            return {'id': False}
        else:
            #phone 체크
            base = db.cursor()
            sql = f'select user_phone from User\
                where user_phone = "{user_phone}";'
            base.execute(sql)
            phone = base.fetchall()
            if phone:
                base.close()
                return {'phone': False}
            else :
                #mail 체크
                base = db.cursor()
                sql = f'select user_mail from User\
                    where user_mail = "{user_mail}";'
                base.execute(sql)
                mail = base.fetchall()
                if mail:
                    return {'mail': False}

        # 중복없음 비밀번호 암호화
        user_bcrypt = bcrypt.hashpw(user_pw.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        #db값 저장
        base = db.cursor()
        sql = f'insert into User(user_name, user_pw, user_phone, user_mail)\
                values ("{user_name}", "{user_bcrypt}", "{user_phone}", "{user_mail}");'
        base.execute(sql)
        db.commit()
        base.close()
        return {'createAccount' : True}

@Create.route('/<string:user_name>')
class CheckID(Resource):
    def get(self, user_name):
        '''회원가입 ID중복 확인'''
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