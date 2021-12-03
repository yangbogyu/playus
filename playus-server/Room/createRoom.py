from logging import fatal
import os, pymysql, json, datetime, bcrypt, jwt
from flask import request
from flask_restx import Resource, Api, Namespace
from dotenv import load_dotenv

load_dotenv() # `.env`파일 불러옴


createRoom = Namespace(
    name='createRoom',
    description='createRoom API'
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

@createRoom.route('')
class Create(Resource):
    def post(self):
        '''방 만들기'''
        
        db = setDB()

        data = request.get_json()
        user_name = data['user_name']
        room_title = data['room_title']
        room_time = data['room_time']
        room_place = data['room_place']
        room_total = data['room_total']
        room_sport = data['room_sport']
        room_address = data['room_address']


        base = db.cursor()
        sql = f'select room_title from Room\
            where room_title = "{room_title}";'
        base.execute(sql)
        data = base.fetchall()

        if data:
            return {'createRoom' : False}
        else:
            #방 만들기
            base = db.cursor()
            sql = f'insert into Room(room_title, room_time , room_place, room_total, room_sport, room_address)\
                values ("{room_title}", "{room_time}", "{room_place}", "{room_total}", "{room_sport}", "{room_address}");'
            base.execute(sql)
            db.commit()
            base.close()

            # 만든 방 번호 확인
            base = db.cursor()
            sql = f'select room_no from Room\
                where room_title = "{room_title}";'
            base.execute(sql)
            room_no = base.fetchall()

            # 방참가자 테이블 값 추가
            base = db.cursor()
            sql = f'insert into Room_user(room_no, user_name, user_static)\
                values ("{room_no[0]["room_no"]}", "{user_name}", "M");'
            base.execute(sql)
            db.commit()
            base.close()
            return {'createRoom' : True}
