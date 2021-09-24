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
    sql = f'select r.room_no, r.room_title, r.room_place, r.room_time, r.room_total, u.user_name, COUNT(*) as room_user\
        from Room as r\
        right outer join Room_user as u\
        on u.room_no = r.room_no\
        where r.room_sport = "{mark_sport}" and r.room_place = "{mark_place}"\
        group by r.room_no having count(*);'
elif sport:
    sql = f'select r.room_no, r.room_title, r.room_place, r.room_time, r.room_total, u.user_name, COUNT(*) as room_user\
        from Room as r\
        right outer join Room_user as u\
        on u.room_no = r.room_no\
        where r.room_sport = "{mark_sport}"\
        group by r.room_no having count(*);'
elif place:
    sql = f'select r.room_no, r.room_title, r.room_place, r.room_time, r.room_total, u.user_name, COUNT(*) as room_user\
        from Room as r\
        right outer join Room_user as u\
        on u.room_no = r.room_no\
        where r.room_place = "{mark_place}"\
        group by r.room_no having count(*);'
else :
    sql = f'select r.room_no, r.room_title, r.room_place, r.room_time, r.room_total, u.user_name, COUNT(*) as room_user\
        from Room as r\
        right outer join Room_user as u\
        on u.room_no = r.room_no\
        group by r.room_no having count(*);'

base = db.cursor()
base.execute(sql)
data = base.fetchall()
for i in data:
    i['room_time'] = str(i['room_time'])
print(data)

base = db.cursor()
sql = f'select room_no from Room\
    where room_title = "성남축구";'
base.execute(sql)
room_no = base.fetchall()

print(room_no[0]['room_no'])
#print(f'select room_title, room_place, room_time, room_total from Room {sport_sql} and {place_sql};')
