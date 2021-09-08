from flask import Flask
from flask_restx import Api, Resource

from login import Player

app = Flask(__name__) # Flask 앱 생성
api = Api(# API 서버로 사용할 수 있게해줌.
    app,
    version='0.1',
    title="Playus API Server",
    description="AIP 사용설명서.",
    terms_url="/",
    license="MIT")

api.add_namespace(Player, '/players')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)