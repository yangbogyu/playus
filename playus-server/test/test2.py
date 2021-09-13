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


user_id = '11243'
user_phone = '123144'
user_mail = 'user_mail'

#id 체크
base = db.cursor()
sql = f'select user_id from User\
        where user_id = "{user_id}";'
base.execute(sql)
id = base.fetchall()


if id:
    base.close()
    print('아이디 중복')
else:
    #phone 체크
    base = db.cursor()
    sql = f'select user_phone from User\
        where user_phone = "{user_phone}";'
    base.execute(sql)
    phone = base.fetchall()

    if phone:
        print('번호 중복')
    else :
        #mail 체크
        base = db.cursor()
        sql = f'select user_mail from User\
                where user_mail = "{user_mail}";'
        base.execute(sql)
        mail = base.fetchall()
        if mail:
            print('메일 중복')
        else:
            print('중복없음')



    