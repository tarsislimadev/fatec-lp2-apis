from flask import Flask, make_response
from flask_cors import CORS
import requests as req

app = Flask(__name__)
CORS(app)

base_url = 'https://dogapi.dog/api/v2'

req_headers = {
  'accept': 'application/json'
}

res_headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
}

@app.route('/api/v1/dogs', methods=['POST'])
def list_dogs():
  dogs = req.get(f'{base_url}/breeds', headers=req_headers).json()
  resp = make_response({"dogs": dogs}, 200)
  resp.headers.extend(res_headers)
  return resp

@app.route('/api/v1/dogs/<id>', methods=['POST'])
def get_dog(id):
  dog = req.get(f'{base_url}/breeds/{id}', headers=req_headers).json()
  resp = make_response({"dog": dog}, 200)
  resp.headers.extend(res_headers)
  return resp

if __name__ == '__main__':
  app.run()
