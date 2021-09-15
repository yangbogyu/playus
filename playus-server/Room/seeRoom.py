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
    def post(self, user_name):
        '''방 리스트'''

        base = db.cursor()
        sql = f'select mark_sport, mark_time, mark_place from Mark\
                where user_name = "{user_name}";'
        base.execute(sql)
        mark = base.fetchall()
