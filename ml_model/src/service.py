from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np
import os
from model import predict_carbon_footprint, train_model

app = Flask(__name__)

# Path to the trained model
MODEL_PATH = "rf_model.joblib"

# Activity mappings from the provided data
activity_mappings = {
    1: {
        "type": "electricity",
        "name": "Using Air Conditioner",
        "electricity_unit": "kwh",
        "per_hour_units": 1.5,
        "country": "GB"
    },
    2: {
        "type": "electricity",
        "name": "Using Fan",
        "electricity_unit": "kwh",
        "per_hour_units": 0.075,
        "country": "GB"
    },
    3: {
        "type": "electricity",
        "name": "Using Washing Machine",
        "electricity_unit": "kwh",
        "per_hour_units": 0.5,
        "country": "GB"
    },
    4: {
        "type": "electricity",
        "name": "Using Microwave Oven",
        "electricity_unit": "kwh",
        "per_hour_units": 1.2,
        "country": "GB"
    },
    5: {
        "type": "electricity",
        "name": "Using Light Bulb / Lights",
        "electricity_unit": "kwh",
        "per_hour_units": 0.01,
        "country": "GB"
    },
    6: {
        "type": "vehicle",
        "name": "Traveling using a Car",
        "distance_unit": "km",
        "vehicle_model_id": "7268a9b7-17e8-4c8d-acca-57059252afe9"
    },
    7: {
        "type": "flight",
        "name": "Taking a flight",
        "distance_unit": "km",
        "passengers": 1,
    }
}


def load_model():
    """Load the trained model or train if it doesn't exist"""
    if os.path.exists(MODEL_PATH):
        return joblib.load(MODEL_PATH)
    else:
        return train_model()


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy"}), 200


@app.route('/predict', methods=['POST'])
def predict():
    """
    Predict carbon footprint for the next day based on today's activities

    Expected request body:
    {
        "activities": [
            {
                "activity_id": 1,
                "carbon_footprint": 2.5,
                "type": "electricity"
            },
            ...
        ]
    }
    """
    try:
        data = request.json
        activities = data.get('activities', [])

        if not activities:
            return jsonify({"error": "No activities provided"}), 400

        # Transform activities data into features the model can use
        user_data = transform_activities_for_prediction(activities)

        # Get the model
        model = load_model()

        # Make prediction (either using direct model or your helper function)
        # Here I'm using a synthetic prediction for demonstration
        prediction = calculate_predicted_footprint(activities)

        return jsonify({
            "status": "success",
            "predicted_footprint": prediction
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/recommend', methods=['POST'])
def recommend():
    """
    Generate recommendations based on user's activities

    Expected request body:
    {
        "activities": [
            {
                "activity_id": 1,
                "carbon_footprint": 2.5,
                "title": "Using Air Conditioner",
                "type": "electricity"
            },
            ...
        ]
    }
    """
    try:
        data = request.json
        activities = data.get('activities', [])

        if not activities:
            return jsonify({"error": "No activities provided"}), 400

        # Find the activity with the highest carbon footprint
        highest_impact_activity = max(activities, key=lambda x: x['carbon_footprint'], default=None)

        if not highest_impact_activity:
            return jsonify({
                "title": "No high-impact activities found",
                "description": "Continue your eco-friendly practices!",
                "carbon_footprint": 0.0
            }), 200

        # Generate recommendation based on activity type
        recommendation = generate_recommendation(highest_impact_activity)

        return jsonify(recommendation), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


def transform_activities_for_prediction(activities):
    """
    Transform user activities into a format suitable for model prediction

    For this example, we're using a simplified approach where we count activity types
    and sum their carbon footprints.
    """
    # Create a simplified feature set based on activity data
    electricity_usage = sum(act['carbon_footprint'] for act in activities if act.get('type') == 'electricity')
    vehicle_usage = sum(act['carbon_footprint'] for act in activities if act.get('type') == 'vehicle')
    flight_usage = sum(act['carbon_footprint'] for act in activities if act.get('type') == 'flight')

    # Create a data dictionary that matches our model's expected features
    # This is a simplified version - in a real model you would match all required features
    return {
        'Body Type': 'average',
        'Sex': 'unknown',
        'Diet': 'unknown',
        'How Often Shower': 'daily',
        'Heating Energy Source': 'electricity',
        'Transport': 'mixed',
        'Vehicle Type': 'unknown',
        'Monthly Grocery Bill': 200,
        'Frequency of Traveling by Air': 'occasionally',
        'Vehicle Monthly Distance Km': vehicle_usage * 10,  # Estimating distance from footprint
        'Waste Bag Size': 'medium',
        'Waste Bag Weekly Count': 2,
        'How Long TV PC Daily Hour': 4,
        'How Many New Clothes Monthly': 2,
        'How Long Internet Daily Hour': 3,
        'Energy efficiency': 'Yes' if electricity_usage < 10 else 'No',
        'Recycling': '["Plastic","Paper"]'
    }


def calculate_predicted_footprint(activities):
    """
    Calculate predicted carbon footprint based on today's activities

    This is a simplified calculation that could be replaced with actual ML prediction
    """
    if not activities:
        return 0.0

    # Calculate total footprint
    total_footprint = sum(act['carbon_footprint'] for act in activities)

    # Apply a simple algorithm to predict next day's footprint
    # In a real scenario, we would use our trained model here
    # For this example, we're using a simple heuristic
    if len(activities) > 5:
        # More activities tend to increase tomorrow's footprint
        prediction = total_footprint * 1.1
    else:
        # Fewer activities might mean a slight decrease
        prediction = total_footprint * 0.95

    # Add some randomness to simulate real-world variability
    prediction = prediction * np.random.uniform(0.9, 1.1)

    return round(prediction, 2)


def generate_recommendation(activity):
    """Generate a recommendation based on the highest carbon footprint activity"""
    activity_type = activity.get('type', '')
    activity_title = activity.get('title', 'Unknown activity')
    carbon_footprint = activity.get('carbon_footprint', 0)

    recommendations = {
        'electricity': {
            'title': f"Reduce {activity_title} usage",
            'description': f"Your {activity_title.lower()} consumption contributes significantly to your carbon footprint. Consider using it less frequently or replacing it with more energy-efficient alternatives.",
            'carbon_footprint': carbon_footprint * 0.7  # Potential reduction
        },
        'vehicle': {
            'title': "Use public transportation",
            'description': "Your car usage has a high carbon footprint. Consider using public transportation, carpooling, or biking for short distances.",
            'carbon_footprint': carbon_footprint * 0.5  # Potential reduction
        },
        'flight': {
            'title': "Reduce air travel",
            'description': "Air travel significantly impacts your carbon footprint. Consider alternatives like trains for shorter trips or virtual meetings instead of business travel.",
            'carbon_footprint': carbon_footprint * 0.3  # Potential reduction
        }
    }

    # Default recommendation if activity type not recognized
    default_recommendation = {
        'title': "Reduce carbon footprint",
        'description': f"Your {activity_title.lower()} has a high carbon impact. Consider more eco-friendly alternatives.",
        'carbon_footprint': carbon_footprint * 0.6  # Potential reduction
    }

    return recommendations.get(activity_type, default_recommendation)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
