from logging import fatal
import os, pymysql, json, datetime, bcrypt, jwt
from flask import request
from flask_restx import Resource, Api, Namespace
from dotenv import load_dotenv

load_dotenv() # `.env`파일 불러옴


Comment = Namespace(
    name='Comment',
    description='Comment API'
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


@Comment.route('/create')
class create(Resource):
    def post(self):
        '''댓글 작성'''
        
        db = setDB()

        data = request.get_json()
        room_no = data['room_no']
        user_name = data['user_name']
        comment_data = data['comment_data']

        base = db.cursor()
        sql = f'select * from Room_user\
                where user_name = "{user_name}"\
                and room_no = {room_no};'
        base.execute(sql)
        room = base.fetchall()

        if room : # 방에 소속된 유저인지 확인
            base = db.cursor() # 댓글 추가
            sql = f'insert into Comment( room_no, user_name, comment_data)\
                    values ({room_no}, "{user_name}", "{comment_data}");'
            base.execute(sql)
            db.commit()
            base.close()
            return {'createComment' : True}
        else : 
            base.close()
            return {'createComment': False}

@Comment.route('/delete')
class delete(Resource):
    def delete(self):
        '''댓글 삭제'''
        
        db = setDB()

        data = request.get_json()
        comment_no = data['comment_no']
        room_no = data['room_no']
        user_name = data['user_name']

        base = db.cursor()
        sql = f'select * from Comment\
                where user_name = "{user_name}"\
                and comment_no = {comment_no}\
                and room_no = {room_no};'
        base.execute(sql)
        comment = base.fetchall()

        if comment : # 대상 코멘트가 있는지 확인
            base = db.cursor() # 댓글 삭제
            sql = f'delete from Comment\
                where user_name = "{user_name}"\
                and comment_no = {comment_no}\
                and room_no = {room_no};'
            base.execute(sql)
            db.commit()
            base.close()
            return {'deleteComment' : True}

        else : 
            base.close()
            return {'deleteComment': False}

@Comment.route('/<int:room_no>')
class commentData(Resource):
    def get(self, room_no):
        '''댓글 확인'''
        
        db = setDB()

        base = db.cursor()
        sql = f'select comment_no, user_name, comment_data, comment_createdAt from Comment\
                where room_no = {room_no};'
        base.execute(sql)
        comment = base.fetchall()

        if comment:
            for i in comment: # 시간 문자열 변환
                i['comment_createdAt'] = str(i['comment_createdAt']) # dataTime -> str 변경
            return {'Comment': comment}
        else : 
            return {'Comment': False}
        
