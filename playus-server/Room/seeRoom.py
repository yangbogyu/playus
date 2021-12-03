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

seeRoom = Namespace(
    name='seeRoom',
    description='seeRoom API'
)


@seeRoom.route('/master/<string:user_name>')
class Master(Resource):
    def get(self, user_name):
        '''내가 만든 방 리스트'''

        db = setDB()

        sql = f'select r.room_no, r.room_title, r.room_sport, r.room_place,r.room_address, r.room_time, r.room_total, u.user_name\
                from Room as r\
                right outer join Room_user as u\
                on u.room_no = r.room_no\
                where u.user_name = "{user_name}" and u.user_static = "M";'

        base = db.cursor()
        base.execute(sql)
        data = base.fetchall()
        base.close()

        if data:
            wherelist = []
            whereSQL = 'where r.room_no = '
            for i in data:
                wherelist.append(str(i['room_no']))
            whereSQL = whereSQL + " or r.room_no = ".join(wherelist)
            print(whereSQL)
        else:
            return {'MasterRooms' : False}
        
        sql = f'select r.room_no, r.room_title, r.room_sport, r.room_place,r.room_address, r.room_time, r.room_total, u.user_name, COUNT(*) as room_user\
                from Room as r\
                right outer join Room_user as u\
                on u.room_no = r.room_no {whereSQL}\
                group by r.room_no having count(*);'

        base = db.cursor()
        base.execute(sql)
        data = base.fetchall()
        base.close()
        for i in data:
            i['room_time'] = str(i['room_time']) # dataTime -> str 변경
        return {'MasterRooms' : data}

@seeRoom.route('/people/<string:user_name>')
class People(Resource):
    def get(self, user_name):
        '''참여한 방 리스트'''

        db = setDB()

        sql = f'select r.room_no from Room as r\
                right outer join Room_user as u\
                on u.room_no = r.room_no\
                where u.user_name = "{user_name}" and u.user_static = "P";'

        base = db.cursor()
        base.execute(sql)
        data = base.fetchall()
        base.close()

        if data:
            wherelist = []
            whereSQL = 'where r.room_no = '
            for i in data:
                wherelist.append(str(i['room_no']))
            whereSQL = whereSQL + " or r.room_no = ".join(wherelist)
            print(whereSQL)
        else:
            return {'PeopleRooms' : False}
        
        sql = f'select r.room_no, r.room_title, r.room_sport, r.room_place,r.room_address, r.room_time, r.room_total, u.user_name, COUNT(*) as room_user\
                from Room as r\
                right outer join Room_user as u\
                on u.room_no = r.room_no {whereSQL}\
                group by r.room_no having count(*);'

        base = db.cursor()
        base.execute(sql)
        data = base.fetchall()
        base.close()
        for i in data:
            i['room_time'] = str(i['room_time']) # dataTime -> str 변경
        return {'PeopleRooms' : data}

@seeRoom.route('/list/<int:room_no>')
class list(Resource):
    def get(self, room_no):
        '''특정 방 참여자 리스트'''

        db = setDB()

        sql = f'select user_name, user_static from Room_user\
                where room_no = {room_no};'

        base = db.cursor()
        base.execute(sql)
        data = base.fetchall()
        base.close()


        if data:
            return {'RoomList' : data,
                    'RoomRatings' : False}
        else:
            return {'RoomList' : False}
        