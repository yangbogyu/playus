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

outRoom = Namespace(
    name='outRoom',
    description='Room API'
)

@outRoom.route('')
class Out(Resource):
    def delete(self):
        '''방 나가기'''

        data = request.get_json()
        user_name = data['user_name']
        room_no = data['room_no']

        base = db.cursor()
        sql = f'select user_static from Room_user\
                where user_name = "{user_name}"and room_no = "{room_no}";'
        base.execute(sql)
        data = base.fetchall()
        base.close()
        static = data[0]["user_static"]

        if static == "P" : # 일반 참가자
            base = db.cursor()
            sql = f'delete from Room_user\
                where user_name = "{user_name}" and room_no = "{room_no}";'
            base.execute(sql)
            db.commit()
            base.close()
            return {"delete" : True}
        
        elif static == "M" : # 방장
            base = db.cursor()
            sql = f'select user_name from Room_user\
                where room_no = "{room_no}";'
            base.execute(sql)
            data = base.fetchall()
            base.close()
            # 전부 삭제
            for i in data:
                base = db.cursor()
                sql = f'delete from Room_user\
                    where user_name = "{i["user_name"]}" and room_no = "{room_no}";'
                base.execute(sql)
                db.commit()
                base.close()
            
            base = db.cursor()
            sql = f'delete from Room\
                where room_no = "{room_no}";'
            base.execute(sql)
            db.commit()
            base.close()
            return {"delete" : True}
        else :
            return {"delete" : False}
                