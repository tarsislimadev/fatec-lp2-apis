FROM python:alpine

WORKDIR /app

COPY . .

RUN python -m pip install -r requirements.txt

# CMD python main.py

CMD flask --app main run --host=0.0.0.0 --port=5000
