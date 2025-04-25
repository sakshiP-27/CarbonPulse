import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib
import os
import math

# Define the path to save the model
MODEL_PATH = "rf_model.joblib"


def load_and_preprocess_data():
    """
    Load and preprocess the carbon footprint dataset.
    In a real application, you would load data from a file or database.
    For this example, I'm creating a function to simulate loading the data.
    """
    # Sample data based on the provided schema
    data = pd.read_csv('carbon_footprint_data.csv')

    # Select relevant columns for prediction based on the schema and activities
    selected_columns = [
        'Body Type', 'Sex', 'Diet', 'How Often Shower',
        'Heating Energy Source', 'Transport', 'Vehicle Type',
        'Monthly Grocery Bill', 'Frequency of Traveling by Air',
        'Vehicle Monthly Distance Km', 'Waste Bag Size',
        'Waste Bag Weekly Count', 'How Long TV PC Daily Hour',
        'How Many New Clothes Monthly', 'How Long Internet Daily Hour',
        'Energy efficiency', 'Recycling', 'CarbonEmission'
    ]

    data = data[selected_columns].copy()

    # Handle missing values
    for col in data.columns:
        if data[col].dtype == 'object':
            data[col].fillna('unknown', inplace=True)
        else:
            data[col].fillna(data[col].median(), inplace=True)

    return data


def train_model():
    """Train the Random Forest Regressor model"""
    data = load_and_preprocess_data()

    # Split features and target
    X = data.drop('CarbonEmission', axis=1)
    y = data['CarbonEmission']

    # Identify categorical columns
    categorical_cols = X.select_dtypes(include=['object']).columns.tolist()
    numeric_cols = X.select_dtypes(include=['int64', 'float64']).columns.tolist()

    # Create preprocessing pipelines
    categorical_transformer = Pipeline(steps=[
        ('onehot', OneHotEncoder(handle_unknown='ignore'))
    ])

    numeric_transformer = Pipeline(steps=[
        ('scaler', StandardScaler())
    ])

    # Combine preprocessing steps
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numeric_transformer, numeric_cols),
            ('cat', categorical_transformer, categorical_cols)
        ])

    # Create the model pipeline
    model = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))
    ])

    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train the model
    model.fit(X_train, y_train)

    # Make predictions for evaluation
    y_train_pred = model.predict(X_train)
    y_test_pred = model.predict(X_test)

    # Calculate metrics
    # R² score
    train_r2 = r2_score(y_train, y_train_pred)
    test_r2 = r2_score(y_test, y_test_pred)

    # Mean Absolute Error
    train_mae = mean_absolute_error(y_train, y_train_pred)
    test_mae = mean_absolute_error(y_test, y_test_pred)

    # Root Mean Squared Error
    train_rmse = math.sqrt(mean_squared_error(y_train, y_train_pred))
    test_rmse = math.sqrt(mean_squared_error(y_test, y_test_pred))

    # Print evaluation metrics
    print("\n===== Model Evaluation =====")
    print(f"Training Set Metrics:")
    print(f"  R² Score: {train_r2:.4f}")
    print(f"  MAE: {train_mae:.4f}")
    print(f"  RMSE: {train_rmse:.4f}")

    print(f"\nTest Set Metrics:")
    print(f"  R² Score: {test_r2:.4f}")
    print(f"  MAE: {test_mae:.4f}")
    print(f"  RMSE: {test_rmse:.4f}")
    print("===========================\n")

    # Save the model
    joblib.dump(model, MODEL_PATH)
    print(f"Model saved to {MODEL_PATH}")

    # Return the model and metrics
    metrics = {
        'train_r2': train_r2,
        'test_r2': test_r2,
        'train_mae': train_mae,
        'test_mae': test_mae,
        'train_rmse': train_rmse,
        'test_rmse': test_rmse
    }

    return model, metrics


def predict_carbon_footprint(user_data):
    """
    Predict carbon footprint using the trained model

    Args:
        user_data: Dictionary containing user activity data

    Returns:
        Predicted carbon footprint value
    """
    # Load the model if it exists, otherwise train it
    if os.path.exists(MODEL_PATH):
        model = joblib.load(MODEL_PATH)
    else:
        model, _ = train_model()

    # Convert user data to DataFrame
    user_df = pd.DataFrame([user_data])

    # Make prediction
    prediction = model.predict(user_df)[0]

    return prediction


if __name__ == "__main__":
    # Train and save the model, and print evaluation metrics
    model, metrics = train_model()

    metrics_df = pd.DataFrame([metrics])
    metrics_df.to_csv('model_metrics.csv', index=False)
    print(f"Model metrics saved to model_metrics.csv")
