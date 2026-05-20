from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import requests as req

app = Flask(__name__)

base_url = 'https://dogapi.dog/api/v2'

req_headers = {
  'accept': 'application/json'
}

resp_headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
}

CORS(app)

@app.route('/api/v1/dogs', methods=['POST'])
def list_dogs():
  print("Received request for list of dogs")
  dogs = req.get(f'{base_url}/breeds', headers=req_headers).json()
  resp = make_response(jsonify({"message": "Data received successfully", "dogs": dogs}), 200)
  resp.headers = resp.headers.extend(resp_headers)
  return resp

@app.route('/api/v1/dogs/<id>', methods=['POST'])
def get_dog(id):
  print(f"Received request for dog with id: {id}")
  dog = req.get(f'{base_url}/breeds/{id}', headers=req_headers).json()
  resp = make_response(jsonify({"message": "Dog found", "dog": dog}), 200)
  resp.headers = resp.headers.extend(resp_headers)
  return resp

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0')
