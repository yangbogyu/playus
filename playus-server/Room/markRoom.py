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

markRoom = Namespace(
    name='markRoom',
    description='markRoom API'
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

@markRoom.route('/<string:user_name>')
class Mark(Resource):
    def get(self, user_name):
        '''방 리스트'''

        db = setDB()
                            
        base = db.cursor()
        sql = f'select user_sport, user_address from User\
                where user_name = "{user_name}";'
        base.execute(sql)
        mark = base.fetchall()
        base.close()

        user_sport, user_address = None, None

        # 값 받아서 저장
        if mark:
            for i in mark:
                user_sport = i['user_sport'] # 종목
                user_address = i['user_address'] # 장소
        
        # where문
        where_sql = False
        if user_sport != None and user_address != None:
            where_sql = f'where r.room_sport = "{user_sport}" and r.room_address like "%{user_address}%"'
        elif user_sport != None and user_address == None:
            where_sql = f'where r.room_sport = "{user_sport}"'
        elif user_sport == None and user_address != None:
            where_sql = f'where r.room_address like "%{user_address}%"'

        if where_sql == False:    
            sql = f'select r.room_no, r.room_title, r.room_sport, r.room_place,r.room_address, r.room_time, r.room_total, u.user_name, COUNT(*) as room_user\
                from Room as r\
                right outer join Room_user as u\
                on u.room_no = r.room_no\
                where r.room_time > now()\
                group by r.room_no having count(*);'
        else:
            sql = f'select r.room_no, r.room_title, r.room_sport, r.room_place,r.room_address, r.room_time, r.room_total, u.user_name, COUNT(*) as room_user\
                from Room as r\
                right outer join Room_user as u\
                on u.room_no = r.room_no {where_sql}\
                and r.room_time > now()\
                group by r.room_no having count(*);'

        base = db.cursor()
        base.execute(sql)
        data = base.fetchall()
        base.close()
        for i in data:
            i['room_time'] = str(i['room_time']) # dataTime -> str 변경
        return {'MarkRooms' : data}

