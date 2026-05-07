from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route('/api/data', methods=['POST'])
def receive_data():
  return request.get_json(), 200

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0')
