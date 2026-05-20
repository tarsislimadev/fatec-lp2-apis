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

def fetch_upstream_json(url):
  try:
    upstream_resp = req.get(url, headers=req_headers, timeout=10)
    upstream_resp.raise_for_status()
    return True, upstream_resp.json(), None
  except req.exceptions.RequestException as exc:
    return False, None, f"Upstream request failed: {exc}"
  except ValueError:
    return False, None, "Upstream returned invalid JSON"

@app.route('/api/v1/dogs')
def list_dogs():
  ok, dogs, error = fetch_upstream_json(f'{base_url}/breeds')
  if not ok:
    resp = make_response({"error": error}, 502)
    resp.headers.extend(res_headers)
    return resp
  resp = make_response({"dogs": dogs}, 200)
  resp.headers.extend(res_headers)
  return resp

@app.route('/api/v1/dogs/<id>')
def get_dog(id):
  ok, dog, error = fetch_upstream_json(f'{base_url}/breeds/{id}')
  if not ok:
    resp = make_response({"error": error}, 502)
    resp.headers.extend(res_headers)
    return resp
  resp = make_response({"dog": dog}, 200)
  resp.headers.extend(res_headers)
  return resp

if __name__ == '__main__':
  app.run()
