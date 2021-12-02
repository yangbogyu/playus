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



db = setDB()

# data = request.get_json()
# room_no = data['room_no']
# user_name = data['user_name']
# room_notice = data['room_notice']

room_no = 11
user_name = 'test'
room_notice = '이기면 치킨'

base = db.cursor() # 댓글 추가
sql = f'select user_static from Room_user\
        where room_no = {room_no}\
        and user_name = "{user_name}";'
base.execute(sql)
notice = base.fetchall()
base.close()

if notice:
    if notice[0]['user_static'] == 'M':
        
        base = db.cursor() # 공지 수정
        sql = f'update Room set room_notice = "{room_notice}"\
                where room_no = {room_no};'
        base.execute(sql)
        db.commit()
        base.close()
    else:
        print('아님')
        
print('끝')

