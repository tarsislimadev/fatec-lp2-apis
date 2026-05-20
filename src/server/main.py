from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import requests as req

app = Flask(__name__)

url = 'https://dogapi.dog/api/v2/breeds?page%5Bnumber%5D=1&page%5Bsize%5D=10'

req_headers = {
  'accept': 'application/json'
}

res_headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
}

CORS(app)

@app.route('/api/v1/dogs', methods=['POST'])
def receive_data():
  dogs = req.get(url, headers=req_headers).json()
  resp = make_response(jsonify({"message": "Data received successfully", "dogs": dogs}), 200)
  resp.headers.extend(res_headers)
  return resp

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0')
