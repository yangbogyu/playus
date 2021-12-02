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

outRoom = Namespace(
    name='outRoom',
    description='outRoom API'
)

def setDB():
    db = pymysql.connect(host=os.getenv('MYSQL_HOST'),
                    port=int(os.getenv('MYSQL_PORT')),
                    user=os.getenv('MYSQL_USER'),
                    passwd=os.getenv('MYSQL_PASSWORD'),
                    db=os.getenv('MYSQL_DATABASE'),
                    charset=os.getenv('MYSQL_CHARSET'),
                    cursorclass=pymysql.cursors.DictCursor)
    return db

@outRoom.route('')
class Out(Resource):
    def delete(self):
        '''방 나가기'''

        db = setDB()

        data = request.get_json()
        user_name = data['user_name']
        room_no = data['room_no']

        base = db.cursor()
        sql = f'select user_static from Room_user\
                where user_name = "{user_name}"and room_no = "{room_no}";'
        base.execute(sql)
        data = base.fetchall()
        base.close()
        static = data[0]["user_static"]

        if static == "P":  # 일반 참가자
            base = db.cursor()
            sql = f'delete from Room_user\
                where user_name = "{user_name}" and room_no = "{room_no}";'
            base.execute(sql)
            db.commit()
            base.close()

            return {"out": True}
        else:
            return {"out": False}
