"""
Flask Development Server
Wraps the Lambda handler for local development and testing
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from lambda_handler import lambda_handler

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


@app.route('/api/<path:path>', methods=['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'])
def api_route(path):
    """Route all /api/* requests to Lambda handler"""
    
    # Handle OPTIONS preflight requests
    if request.method == 'OPTIONS':
        return '', 204
    
    # Build Lambda event object from Flask request
    event = {
        "httpMethod": request.method,
        "path": f"/api/{path}",
        "queryStringParameters": dict(request.args),
        "headers": dict(request.headers),
        "body": request.get_data(as_text=True) if request.data else None
    }
    
    # Call Lambda handler
    response = lambda_handler(event)
    
    # Parse response
    status_code = response.get("statusCode", 200)
    headers = response.get("headers", {})
    body = response.get("body", "{}")
    
    # Return Flask response
    return body, status_code, headers


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "service": "EMR Appointment Service",
        "version": "1.0.0"
    })


@app.route('/', methods=['GET'])
def root():
    """Root endpoint with API documentation"""
    return jsonify({
        "service": "EMR Appointment Management API",
        "version": "1.0.0",
        "endpoints": {
            "GET /api/appointments": "Get all appointments (supports ?date=YYYY-MM-DD, ?status=Status, ?doctor=Name)",
            "POST /api/appointments": "Create new appointment",
            "PUT /api/appointments/:id/status": "Update appointment status",
            "GET /api/appointments/stats": "Get appointment statistics",
            "GET /api/doctors": "Get list of doctors",
            "GET /health": "Health check"
        },
        "documentation": "See README.md for detailed API documentation"
    })


if __name__ == '__main__':
    print("=" * 60)
    print("🏥 EMR Appointment Management Service")
    print("=" * 60)
    print("Server starting on http://localhost:5001")
    print("\nAvailable endpoints:")
    print("  GET  /api/appointments")
    print("  POST /api/appointments")
    print("  PUT  /api/appointments/:id/status")
    print("  GET  /api/appointments/stats")
    print("  GET  /api/doctors")
    print("  GET  /health")
    print("\nPress Ctrl+C to stop the server")
    print("=" * 60)
    
    app.run(host='0.0.0.0', port=5001, debug=True)
