from logging import fatal
import os, pymysql, json, datetime, bcrypt, jwt
from flask import request
from flask_restx import Resource, Api, Namespace
from dotenv import load_dotenv

load_dotenv() # `.env`파일 불러옴


Notice = Namespace(
    name='Notice',
    description='Notice API'
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


@Notice.route('/update')
class create(Resource):
    def post(self):
        '''공지 작성'''
        
        db = setDB()

        data = request.get_json()
        room_no = data['room_no']
        user_name = data['user_name']
        room_notice = data['room_notice']

        base = db.cursor() # 방장 체크
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
                return {'notice' : True}
            else:
                return {'notice' : False}
            return {'notice' : False}


@Notice.route('/<int:room_no>')
class create(Resource):
    def get(self, room_no):
        '''공지 확인'''

        db = setDB()

        base = db.cursor() # 공지확인
        sql = f'select room_notice from Room\
                where room_no = {room_no};'
        base.execute(sql)
        notice = base.fetchall()
        base.close()

        return {'notice' : notice[0]['room_notice']}

