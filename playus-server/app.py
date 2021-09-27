from flask import Flask
from flask_restx import Api, Resource
from flask_cors import CORS, cross_origin

from Member.login import login
from Member.createAccount import Create
from Room.seeRoom import seeRoom
from Room.createRoom import createRoom
from Room.inRoom import inRoom
from Room.outRoom import outRoom


app = Flask(__name__)  # Flask 앱 생성
CORS(app)

api = Api(  # API 서버로 사용할 수 있게해줌.
    app,
    version='0.1',
    title="Playus API Server",
    description="AIP 사용설명서.",
    terms_url="https://www.notion.so/API-8a06211b8ff945849dddf4de3f94f697",
    license="신구대학교 IT소프트웨어과 Playus API")

api.add_namespace(login, '/logins')
api.add_namespace(Create, '/createAccounts')
api.add_namespace(seeRoom, '/seeRooms')
api.add_namespace(createRoom, '/createRooms')
api.add_namespace(inRoom, '/inRooms')
api.add_namespace(outRoom, '/outRooms')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
