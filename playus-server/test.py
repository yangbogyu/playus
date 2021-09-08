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

base = db.cursor()
sql = f'select user_id, user_pw\
    from Player\
    where user_id = "bogyu"'
base.execute(sql)
user = base.fetchall()
for r in user:
    user_bcrypt = r['user_pw']
    print(user_bcrypt)
print(bcrypt.checkpw("test2".encode('utf-8'), user_bcrypt.encode('utf-8')))

returnData = jwt.encode({'user_pw': 'test2'}, 'abc', algorithm='HS256')
print(returnData)