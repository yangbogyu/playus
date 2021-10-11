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


seeMark = Namespace(
    name='seeMark',
    description='seeMark API'
)


@seeMark.route('/<string:user_name>')
class See(Resource):
    def get(self, user_name):
        '''즐겨찾기 정보'''

        db = pymysql.connect(host=os.getenv('MYSQL_HOST'),
                     port=int(os.getenv('MYSQL_PORT')),
                     user=os.getenv('MYSQL_USER'),
                     passwd=os.getenv('MYSQL_PASSWORD'),
                     db=os.getenv('MYSQL_DATABASE'),
                     charset=os.getenv('MYSQL_CHARSET'),
                     cursorclass=pymysql.cursors.DictCursor)

        base = db.cursor()
        sql = f'select user_sport, user_address from User\
                where user_name = "{user_name}";'
        base.execute(sql)
        mark = base.fetchall()
        base.close()
        user_sport = mark[0]["user_sport"]
        user_address = mark[0]["user_address"]

        return {"Mark": {"user_sport": user_sport, "user_address": user_address}}
