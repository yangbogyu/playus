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


user_name = 'test'

#id 체크
base = db.cursor()
sql = f'select mark_sport, mark_place from Mark\
        where user_name = "{user_name}";'
base.execute(sql)
mark = base.fetchall()
base.close()
print(mark)

for i in mark:
    mark_sport = i['mark_sport']
    mark_place = i['mark_place']

if mark_sport:
    sport = True
else:
    sport = False
if mark_place:
    place = True
else:
    place = False

if sport and place:
    sql = f'select room_title, room_place, room_time, room_total from Room\
        where room_sport = "{mark_sport}" and room_place = "{mark_place}";'
elif sport:
    sql = f'select room_title, room_place, room_time, room_total from Room\
        where room_sport = "{mark_sport}";'
elif place:
    sql = f'select room_title, room_place, room_time, room_total from Room\
        where room_place = "{mark_place}";'
else :
    sql = f'select room_title, room_place, room_time, room_total from Room;'
base = db.cursor()
base.execute(sql)
data = base.fetchall()
for i in data:
    i['room_time'] = str(i['room_time'])
print(data)

#print(f'select room_title, room_place, room_time, room_total from Room {sport_sql} and {place_sql};')
