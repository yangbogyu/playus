from logging import fatal
import os
import pymysql

from flask import request
from flask_restx import Resource, Api, Namespace
from dotenv import load_dotenv

load_dotenv()  # `.env`파일 불러옴

inRoom = Namespace(
    name='inRoom',
    description='inRoom API'
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

@inRoom.route('')
class In(Resource):
    def post(self):
        '''방 들어가기'''

        db = setDB()

        # 데이터 형식
        data = request.get_json()
        room_no = data['room_no']
        user_name = data['user_name']
        print(room_no, user_name)

        # 이미 들어간 방인지 확인
        base = db.cursor()
        # select count(user_name) from Room_user
        # where room_no = 1 and user_name = "test";
        sql = f'select user_name from Room_user\
          where room_no = "{room_no}" and user_name = "{user_name}";'
        base.execute(sql)
        data = base.fetchall()
        base.close()

        # 데이터가 있으면 return false
        if data:
            return {'inRoom': False}
        # 없으면 return true
        else:
            # 방 만들기
            base = db.cursor()
            # insert into Room_user (room_no, user_name, user_static)
            # values (1, "test", "M");
            sql = f'insert into Room_user(room_no, user_name, user_static)\
                values ("{room_no}", "{user_name}", "P");'
            base.execute(sql)
            db.commit()
            base.close()

            return {'inRoom': True}
