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
                    cursorclass=pymysql.cursors.DictCursor)


user_name = 'ybg1588'
user_sport = 'user_sport'
user_place = 'user_place'
setSQL = f'set user_sport = "{user_sport}", user_place = "{user_place}"'

sql = f'update User {setSQL}\
    where user_name = "{user_name}";'

print(sql)