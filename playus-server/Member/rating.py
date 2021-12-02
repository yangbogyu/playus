from logging import fatal
import os
import pymysql
import json
import datetime
import bcrypt
import jwt
from flask import request
from flask_restx import Resource, Api, Namespace
from dotenv import load_dotenv

load_dotenv()  # `.env`파일 불러옴

def setDB():
    db = pymysql.connect(host=os.getenv('MYSQL_HOST'),
                        port=int(os.getenv('MYSQL_PORT')),
                        user=os.getenv('MYSQL_USER'),
                        passwd=os.getenv('MYSQL_PASSWORD'),
                        db=os.getenv('MYSQL_DATABASE'),
                        charset=os.getenv('MYSQL_CHARSET'),
                        cursorclass=pymysql.cursors.DictCursor)
    return db

rating = Namespace(
    name='rating',
    description='ratings API'
)

@rating.route('/create')
class ratingADD(Resource):
    def post(self):
        '''평점 주기'''
        db = setDB()

        data = request.get_json()
        user_name = data['user_name']
        rating_user = data['rating_user']
        rating_data = data['rating_data']

        base = db.cursor()
        sql = f'select * from Rating\
                where user_name = "{user_name}"\
                and rating_user = "{rating_user}";'
        base.execute(sql)
        rating = base.fetchall()

        if rating: # 같은사람 평점 준 적 있으면

            base = db.cursor() # 댓글 추가
            sql = f'update Rating\
                    set rating_data = {rating_data}\
                    where user_name = "{user_name}"\
                    and rating_user = "{rating_user}";'
            base.execute(sql)
            db.commit()
            base.close()
            return {'createRating' : True}
            
        else: # 평점 처음 준다면
            base = db.cursor() # 댓글 추가
            sql = f'insert into Rating( user_name, rating_user, rating_data)\
                    values ("{user_name}", "{rating_user}", {rating_data});'
            base.execute(sql)
            db.commit()
            base.close()
            return {'createRating' : True}

@rating.route('/delete')
class ratingDEL(Resource):
    def delete(self):
        '''평점 삭제'''

        db = setDB()

        data = request.get_json()
        user_name = data['user_name']
        rating_user = data['rating_user']

        base = db.cursor()
        sql = f'select * from Rating\
                where user_name = "{user_name}"\
                and rating_user = "{rating_user}";'
        base.execute(sql)
        rating = base.fetchall()

        if rating: # 평점 준적 있으면

            base = db.cursor() # 댓글 삭제
            sql = f'delete from Rating\
                    where user_name = "{user_name}"\
                    and rating_user = "{rating_user}";'
            base.execute(sql)
            db.commit()
            base.close()
            return {'deleteRating' : True}

        else: # 평점 준적 없으면
            return {'deleteRating' : False}

@rating.route('/<string:user_name>')
class ratingGET(Resource):
    def get(self, user_name):
        '''평점 조회'''

        db = setDB()

        base = db.cursor()
        sql = f'select rating_data from Rating\
                where rating_user = "{user_name}";'
        base.execute(sql)
        user = base.fetchall()
        rating_data = 0

        if user:
            for r in user:
                rating_data += r['rating_data']
            return {"Rating" : round(rating_data/len(user),1)}
        else :
            return {"Rating" : 5}
