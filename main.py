from name_image import Model
from flask import Flask, render_template, request
from flask_cors import CORS, cross_origin
import base64
import os

app = Flask(__name__)
model = Model()
CORS(app, headers=['Content-Type'])

@app.route("/", methods=["POST", "GET", 'OPTIONS'])
def index_page():
	return render_template('index.html')

@app.route('/hook', methods = ["GET", "POST", 'OPTIONS'])
def get_image():
	if request.method == 'POST':
		image_b64 = request.values['image']
		drawn_digit = request.values['digit']
		image_encoded = image_b64.split(',')[1]
		image = base64.b64decode(image_encoded.encode('utf-8'))		
		save = model.save_image(drawn_digit, image)
		
	return save

if __name__ == '__main__':
	app.run(host=os.getenv('IP', '0.0.0.0'),port=int(os.getenv('PORT', 8080)))