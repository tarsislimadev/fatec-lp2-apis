from flask import Flask, jsonify
from flask_cors import CORS
import requests as req

app = Flask(__name__)
CORS(
  app,
  resources={r"/*": {"origins": "*"}},
  methods=["GET", "POST", "OPTIONS", "HEAD"],
  allow_headers=["*"],
  max_age=600,
)

base_url = 'https://dogapi.dog/api/v2'

req_headers = {
  'accept': 'application/json'
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
    return jsonify({"error": error}), 502
  return jsonify({"dogs": dogs}), 200

@app.route('/api/v1/dogs/<id>')
def get_dog(id):
  ok, dog, error = fetch_upstream_json(f'{base_url}/breeds/{id}')
  if not ok:
    return jsonify({"error": error}), 502
  return jsonify({"dog": dog}), 200

if __name__ == '__main__':
  app.run()
