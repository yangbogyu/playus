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

#id 체크
base = db.cursor()
sql = f'select mark_sport, mark_time, mark_place from Mark\
        where user_name = "{user_name}";'
base.execute(sql)
mark = base.fetchall()
base.close()
print(mark)

for i in mark:
    mark_sport = i['mark_sport']
    mark_time = i['mark_time']
    mark_place = i['mark_place']

if mark_sport:
    sport_sql = f'where mark_sport = "{mark_sport}"'
else:
    sport_sql = ''

if mark_time:
    time_sql = f'where mark_sport = "{mark_sport}"'
else:
    time_sql = ''

if mark_place:
    place_sql = f'where mark_place = "{mark_place}"'
else:
    place_sql = ''

base = db.cursor()
sql = f'select room_title, room_place, mark_place from Room\
        {sport_sql}{time_sql}{place_sql};'

print(sport_sql+time_sql, place_sql)
