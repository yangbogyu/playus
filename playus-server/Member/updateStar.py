from logging import fatal
import os, pymysql, json, datetime, bcrypt, jwt
from flask import request
from flask_restx import Resource, Api, Namespace
from dotenv import load_dotenv

load_dotenv() # `.env`파일 불러옴
def setDB():
    db = pymysql.connect(host=os.getenv('MYSQL_HOST'),
                    port=int(os.getenv('MYSQL_PORT')),
                    user=os.getenv('MYSQL_USER'),
                    passwd=os.getenv('MYSQL_PASSWORD'),
                    db=os.getenv('MYSQL_DATABASE'),
                    charset=os.getenv('MYSQL_CHARSET'),
                    cursorclass=pymysql.cursors.DictCursor)
    return db

updateStar = Namespace(
    name='updateStar',
    description='updateStar API'
)


@updateStar.route('')
class update(Resource):
    def put(self):
        '''즐겨찾기 업데이트'''

        db = setDB()

        data = request.get_json()
        user_name = data['user_name']
        user_sport = data['user_sport'] 
        user_address = data['user_address']

        print(f'user_name = {user_name}, user_sport = {user_sport}, user_address = {user_address}')

        # 들어온 값 확인
        if user_sport == None and user_address == None :
            setSQL = 'set user_sport = null, user_address = null'
        elif user_sport == None:
            setSQL = f'set user_sport = null, user_address = "{user_address}"'
        elif user_address == None :
            setSQL = f'set user_sport = "{user_sport}", user_address = null'
        else :
            setSQL = f'set user_sport = "{user_sport}", user_address = "{user_address}"'

        # update 실행
        base = db.cursor()
        sql = f'update User {setSQL}\
            where user_name = "{user_name}";'
        base.execute(sql)
        db.commit()
        base.close()

        return{"updateStar" : True}


        