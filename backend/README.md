# EMR Appointment Management - Backend Service

## Overview

This is the Python backend service for the EMR Appointment Management system. It simulates:
- **AWS Lambda** - Serverless function handler
- **AppSync/GraphQL** - GraphQL-style API structure
- **PostgreSQL** - In-memory database simulation

## Architecture

```
Flask Server (Port 5000)
    ↓
Lambda Handler (API Gateway simulation)
    ↓
Appointment Service (Business Logic)
    ↓
Data Models (PostgreSQL simulation)
    ↓
In-Memory Database
```

## Files

- `server.py` - Flask development server
- `lambda_handler.py` - Lambda function handler with API routing
- `appointment_service.py` - Business logic and validation
- `data_models.py` - Database models and CRUD operations
- `requirements.txt` - Python dependencies

## Setup

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Run the Server

```bash
python server.py
```

Server will start on `http://localhost:5000`

## API Endpoints

### Get Appointments
```bash
GET /api/appointments
GET /api/appointments?date=2025-12-16
GET /api/appointments?status=Upcoming
GET /api/appointments?doctor=Dr.%20Mehta
```

### Create Appointment
```bash
POST /api/appointments
Content-Type: application/json

{
  "name": "John Doe",
  "date": "2025-12-17",
  "time": "10:00",
  "duration": 30,
  "doctorName": "Dr. Mehta",
  "mode": "Online",
  "reason": "General consultation"
}
```

### Update Appointment Status
```bash
PUT /api/appointments/1/status
Content-Type: application/json

{
  "status": "Confirmed"
}
```

### Get Statistics
```bash
GET /api/appointments/stats
```

### Get Doctors
```bash
GET /api/doctors
```

### Health Check
```bash
GET /health
```

## Testing

### Test with cURL

```bash
# Get all appointments
curl http://localhost:5000/api/appointments

# Filter by date
curl "http://localhost:5000/api/appointments?date=2025-12-12"

# Create appointment
curl -X POST http://localhost:5000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Patient",
    "date": "2025-12-17",
    "time": "10:00",
    "duration": 30,
    "doctorName": "Dr. Mehta",
    "mode": "Online",
    "reason": "Test"
  }'

# Update status
curl -X PUT http://localhost:5000/api/appointments/1/status \
  -H "Content-Type: application/json" \
  -d '{"status": "Confirmed"}'
```

## Data Persistence

⚠️ **Important**: This service uses in-memory storage. Data will be reset when the server restarts.

For production, you would replace `data_models.py` with actual PostgreSQL database connections.
