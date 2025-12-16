# Simulating Aurora database
appointments = [
    {
        "id": 1,
        "name": "Riya Sharma",
        "date": "2025-01-12",
        "time": "09:00",
        "duration": 30,
        "doctorName": "Dr. Mehta",
        "status": "Upcoming",
        "mode": "Online",
    },
    {
        "id": 2,
        "name": "Pratham Mehta",
        "date": "2025-01-12",
        "time": "10:00",
        "duration": 45,
        "doctorName": "Dr. Sharma",
        "status": "Scheduled",
        "mode": "Offline",
    },
    {
        "id": 3,
        "name": "Ishaan",
        "date": "2025-01-13",
        "time": "11:00",
        "duration": 30,
        "doctorName": "Dr. Verma",
        "status": "Confirmed",
        "mode": "Online",
    },
    {
        "id": 4,
        "name": "Rahul Sharma",
        "date": "2025-01-11",
        "time": "14:00",
        "duration": 30,
        "doctorName": "Dr. Singh",
        "status": "Cancelled",
        "mode": "Offline",
    },
    {
        "id": 5,
        "name": "Sarah Johnson",
        "date": "2025-01-12",
        "time": "09:30",
        "duration": 30,
        "doctorName": "Dr. Mehta",
        "status": "Confirmed",
        "mode": "Online",
    },
    {
        "id": 6,
        "name": "Khushal Gupta",
        "date": "2025-01-13",
        "time": "13:00",
        "duration": 30,
        "doctorName": "Dr. Verma",
        "status": "Upcoming",
        "mode": "Online",
    },
    {
        "id": 7,
        "name": "Arjun Patel",
        "date": "2025-01-14",
        "time": "09:30",
        "duration": 30,
        "doctorName": "Dr. Mehta",
        "status": "Upcoming",
        "mode": "Offline",
    },
    {
        "id": 8,
        "name": "Rashmi Sharma",
        "date": "2025-01-14",
        "time": "11:00",
        "duration": 45,
        "doctorName": "Dr. Singh",
        "status": "Scheduled",
        "mode": "Online",
    },
    {
        "id": 9,
        "name": "Selena Gomez",
        "date": "2025-01-15",
        "time": "10:00",
        "duration": 30,
        "doctorName": "Dr. Verma",
        "status": "Upcoming",
        "mode": "Offline",
    },
    {
        "id": 10,
        "name": "Priya Malhotra",
        "date": "2025-01-16",
        "time": "14:00",
        "duration": 30,
        "doctorName": "Dr. Mehta",
        "status": "Cancelled",
        "mode": "Online",
    },
]

def get_appointments(date=None, status=None):
    

    result = appointments

    if date:
        result = [a for a in result if a["date"] == date]

    if status:
        result = [a for a in result if a["status"] == status]

    return result

def update_appointment_status(appointment_id, new_status):
   
    for appointment in appointments:
        if appointment["id"] == appointment_id:
            appointment["status"] = new_status

            # Aurora write would happen here (transactional)
            # AppSync subscription would notify clients here
            return appointment

    return None
