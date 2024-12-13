import os
from flask import Flask, request, jsonify
import joblib
from flask_lambda import FlaskLambda

app = Flask(__name__)

# Load the trained model
model_path = os.path.join(os.path.dirname(__file__), "compatibility_model.pkl")
model = joblib.load(model_path)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    features = [
        data["CosineSimilarity"],
        data["AgeDifference"],
        data["ZodiacCompatibility"],
        data["HobbiesOverlap"]
    ]
    prediction = model.predict([features])[0]
    return jsonify({"CompatibilityScore": prediction})

# Expose Flask app for Vercel
def handler(event, context):
    flask_lambda = FlaskLambda(app)
    return flask_lambda(event, context)

