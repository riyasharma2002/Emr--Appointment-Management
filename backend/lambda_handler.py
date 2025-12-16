"""
Lambda Handler - Simulates AWS Lambda + AppSync/GraphQL
Handles HTTP requests and routes to appropriate service functions
"""

import json
from typing import Dict, Any
import appointment_service


def lambda_handler(event: Dict[str, Any], context: Any = None) -> Dict[str, Any]:
    """
    Main Lambda handler function
    Simulates AWS Lambda with API Gateway integration
    
    Args:
        event: API Gateway event object
        context: Lambda context (unused in simulation)
    
    Returns:
        API Gateway response object
    """
    try:
        # Extract request details
        http_method = event.get("httpMethod", "GET")
        path = event.get("path", "/")
        query_params = event.get("queryStringParameters") or {}
        body = event.get("body")
        
        # Parse body if present
        body_data = {}
        if body:
            try:
                body_data = json.loads(body)
            except json.JSONDecodeError:
                return error_response(400, "Invalid JSON in request body")
        
        # Route to appropriate handler
        if path == "/api/appointments" or path == "/api/appointments/":
            if http_method == "GET":
                return handle_get_appointments(query_params)
            elif http_method == "POST":
                return handle_create_appointment(body_data)
        
        elif path.startswith("/api/appointments/") and path.endswith("/status"):
            # Extract appointment ID from path like /api/appointments/1/status
            parts = path.split("/")
            if len(parts) >= 4:
                try:
                    appointment_id = int(parts[3])
                    if http_method == "PUT" or http_method == "PATCH":
                        return handle_update_status(appointment_id, body_data)
                except ValueError:
                    return error_response(400, "Invalid appointment ID")
        
        elif path == "/api/appointments/stats":
            if http_method == "GET":
                return handle_get_stats()
        
        elif path == "/api/doctors":
            if http_method == "GET":
                return handle_get_doctors()
        
        elif path == "/api/health":
            return success_response({"status": "healthy", "service": "EMR Appointment Service"})
        
        # Route not found
        return error_response(404, f"Route not found: {http_method} {path}")
    
    except Exception as e:
        print(f"Error in lambda_handler: {str(e)}")
        return error_response(500, f"Internal server error: {str(e)}")


def handle_get_appointments(query_params: Dict) -> Dict:
    """Handle GET /api/appointments with optional filters"""
    try:
        date = query_params.get("date")
        status = query_params.get("status")
        doctor = query_params.get("doctor")
        
        appointments = appointment_service.get_appointments(
            date=date,
            status=status,
            doctor=doctor
        )
        
        return success_response({
            "appointments": appointments,
            "count": len(appointments)
        })
    except Exception as e:
        return error_response(500, str(e))


def handle_create_appointment(data: Dict) -> Dict:
    """Handle POST /api/appointments"""
    try:
        appointment = appointment_service.create_appointment(data)
        return success_response({
            "appointment": appointment,
            "message": "Appointment created successfully"
        }, status_code=201)
    except ValueError as e:
        return error_response(400, str(e))
    except Exception as e:
        return error_response(500, str(e))


def handle_update_status(appointment_id: int, data: Dict) -> Dict:
    """Handle PUT /api/appointments/:id/status"""
    try:
        new_status = data.get("status")
        if not new_status:
            return error_response(400, "Missing 'status' field in request body")
        
        appointment = appointment_service.update_appointment_status(appointment_id, new_status)
        
        if appointment:
            return success_response({
                "appointment": appointment,
                "message": "Status updated successfully"
            })
        else:
            return error_response(404, f"Appointment with ID {appointment_id} not found")
    except ValueError as e:
        return error_response(400, str(e))
    except Exception as e:
        return error_response(500, str(e))


def handle_get_stats() -> Dict:
    """Handle GET /api/appointments/stats"""
    try:
        stats = appointment_service.get_appointment_stats()
        return success_response(stats)
    except Exception as e:
        return error_response(500, str(e))


def handle_get_doctors() -> Dict:
    """Handle GET /api/doctors"""
    try:
        doctors = appointment_service.get_doctors()
        return success_response({"doctors": doctors})
    except Exception as e:
        return error_response(500, str(e))


def success_response(data: Any, status_code: int = 200) -> Dict:
    """Create a successful API response"""
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",  # CORS
            "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        },
        "body": json.dumps(data)
    }


def error_response(status_code: int, message: str) -> Dict:
    """Create an error API response"""
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        },
        "body": json.dumps({
            "error": message,
            "statusCode": status_code
        })
    }
