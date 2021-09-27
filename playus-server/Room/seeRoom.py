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

seeRoom = Namespace(
    name='seeRoom',
    description='Room API'
)

@seeRoom.route('/<string:user_name>')
class Room(Resource):
    def get(self, user_name):
        '''방 리스트'''

        base = db.cursor()
        sql = f'select user_sport, user_place from user\
                where user_name = "{user_name}";'
        base.execute(sql)
        mark = base.fetchall()
        base.close()

        # 값 받아서 저장
        if mark:
            for i in mark:
                user_sport = i['user_sport'] # 종목
                user_place = i['user_place'] # 장소
        else :
            user_sport = False
            user_place = False

        if user_sport :
            sport = True
        else :
            sport = False
        if user_place :
            place = True
        else :
            place = False

        if sport and place:
            sql = f'select r.room_no, r.room_title, r.room_place, r.room_time, r.room_total, u.user_name, COUNT(*) as room_user\
                from Room as r\
                right outer join Room_user as u\
                on u.room_no = r.room_no\
                where r.room_sport = "{user_sport}" and r.room_place = "{user_place}"\
                group by r.room_no having count(*);'
        elif sport:
            sql = f'select r.room_no, r.room_title, r.room_place, r.room_time, r.room_total, u.user_name, COUNT(*) as room_user\
                from Room as r\
                right outer join Room_user as u\
                on u.room_no = r.room_no\
                where r.room_sport = "{user_sport}"\
                group by r.room_no having count(*);'
        elif place:
            sql = f'select r.room_no, r.room_title, r.room_place, r.room_time, r.room_total, u.user_name, COUNT(*) as room_user\
                from Room as r\
                right outer join Room_user as u\
                on u.room_no = r.room_no\
                where r.room_place = "{user_place}"\
                group by r.room_no having count(*);'
        else :
            sql = f'select r.room_no, r.room_title, r.room_place, r.room_time, r.room_total, u.user_name, COUNT(*) as room_user\
                from Room as r\
                right outer join Room_user as u\
                on u.room_no = r.room_no\
                group by r.room_no having count(*);'
                
        base = db.cursor()
        base.execute(sql)
        data = base.fetchall()
        for i in data:
            i['room_time'] = str(i['room_time'])
        return {'Rooms' : data}

        