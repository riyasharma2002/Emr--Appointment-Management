"""
Data Models - Simulating PostgreSQL database with Python classes
This module provides in-memory data storage mimicking a PostgreSQL database
"""

from datetime import datetime
from typing import List, Dict, Optional

class Database:
    def __init__(self):
        self._appointments = []
        self._doctors = []
        self._next_appointment_id = 1
        self._initialize_sample_data()
    
    def _initialize_sample_data(self):
        self._doctors = [
            {"id": 1, "name": "Dr. Mehta", "specialization": "General Medicine"},
            {"id": 2, "name": "Dr. Sharma", "specialization": "Cardiology"},
            {"id": 3, "name": "Dr. Verma", "specialization": "Dermatology"},
            {"id": 4, "name": "Dr. Singh", "specialization": "Orthopedics"},
        ]
        
        # Sample appointments
        sample_appointments = [
            {
                "name": "Riya Sharma",
                "date": "2025-12-16",
                "time": "09:00",
                "duration": 30,
                "doctorName": "Dr. Mehta",
                "status": "Upcoming",
                "mode": "Online",
                "reason": "General health consultation"
            },
            {
                "name": "Pratham Mehta",
                "date": "2025-12-12",
                "time": "10:00",
                "duration": 45,
                "doctorName": "Dr. Sharma",
                "status": "Scheduled",
                "mode": "Offline",
                "reason": "Follow-up after blood test results"
            },
            {
                "name": "Ishaan",
                "date": "2025-12-13",
                "time": "11:00",
                "duration": 30,
                "doctorName": "Dr. Verma",
                "status": "Confirmed",
                "mode": "Online",
                "reason": "Cold, cough, and fever consultation"
            },
            {
                "name": "Rahul Sharma",
                "date": "2025-12-14",
                "time": "14:00",
                "duration": 30,
                "doctorName": "Dr. Singh",
                "status": "Cancelled",
                "mode": "Offline",
                "reason": "Routine physical check-up"
            },
            {
                "name": "Sarah Johnson",
                "date": "2025-12-15",
                "time": "09:30",
                "duration": 30,
                "doctorName": "Dr. Mehta",
                "status": "Confirmed",
                "mode": "Online",
                "reason": "Diabetes management review"
            },
            {
                "name": "Khushal Gupta",
                "date": "2025-12-16",
                "time": "13:00",
                "duration": 30,
                "doctorName": "Dr. Verma",
                "status": "Upcoming",
                "mode": "Online",
                "reason": "Skin allergy consultation"
            },
            {
                "name": "Arjun Patel",
                "date": "2025-12-17",
                "time": "09:30",
                "duration": 30,
                "doctorName": "Dr. Mehta",
                "status": "Upcoming",
                "mode": "Offline",
                "reason": "Blood pressure monitoring"
            },
            {
                "name": "Rashmi Sharma",
                "date": "2025-12-18",
                "time": "11:00",
                "duration": 45,
                "doctorName": "Dr. Singh",
                "status": "Scheduled",
                "mode": "Online",
                "reason": "Post-surgery follow-up consultation"
            },
            {
                "name": "Selena Gomez",
                "date": "2025-12-19",
                "time": "10:00",
                "duration": 30,
                "doctorName": "Dr. Verma",
                "status": "Upcoming",
                "mode": "Offline",
                "reason": "Nutrition and diet counseling"
            },
            {
                "name": "Priya Malhotra",
                "date": "2025-12-16",
                "time": "14:00",
                "duration": 30,
                "doctorName": "Dr. Mehta",
                "status": "Cancelled",
                "mode": "Online",
                "reason": "Migraine and headache consultation"
            },
            {
                "name": "Amit Kumar",
                "date": "2025-12-16",
                "time": "15:30",
                "duration": 60,
                "doctorName": "Dr. Sharma",
                "status": "Scheduled",
                "mode": "Offline",
                "reason": "Cardiac rehabilitation session"
            },
            {
                "name": "Sneha Reddy",
                "date": "2025-12-17",
                "time": "11:00",
                "duration": 30,
                "doctorName": "Dr. Verma",
                "status": "Confirmed",
                "mode": "Online",
                "reason": "Eczema follow-up"
            },
            {
                "name": "Vikram Singh",
                "date": "2025-12-17",
                "time": "16:00",
                "duration": 45,
                "doctorName": "Dr. Singh",
                "status": "Upcoming",
                "mode": "Offline",
                "reason": "Knee pain assessment"
            },
            {
                "name": "Anjali Gupta",
                "date": "2025-12-18",
                "time": "10:30",
                "duration": 30,
                "doctorName": "Dr. Mehta",
                "status": "Scheduled",
                "mode": "Online",
                "reason": "Annual wellness check"
            },
            {
                "name": "Rohan Das",
                "date": "2025-12-19",
                "time": "14:00",
                "duration": 30,
                "doctorName": "Dr. Verma",
                "status": "Confirmed",
                "mode": "Offline",
                "reason": "Acne treatment consultation"
            },
            {
                "name": "Meera Iyer",
                "date": "2025-12-20",
                "time": "09:00",
                "duration": 60,
                "doctorName": "Dr. Sharma",
                "status": "Upcoming",
                "mode": "Offline",
                "reason": "Comprehensive heart checkup"
            },
            {
                "name": "Kabir Khan",
                "date": "2025-12-20",
                "time": "11:30",
                "duration": 30,
                "doctorName": "Dr. Singh",
                "status": "Scheduled",
                "mode": "Online",
                "reason": "Back pain consultation"
            }
        ]
        
      
        for apt in sample_appointments:
            self.create_appointment(apt)
    
    def get_all_appointments(self) -> List[Dict]:
        return self._appointments.copy()
    
    def get_appointment_by_id(self, appointment_id: int) -> Optional[Dict]:
        for apt in self._appointments:
            if apt["id"] == appointment_id:
                return apt.copy()
        return None
    
    def create_appointment(self, data: Dict) -> Dict:
        appointment = {
            "id": self._next_appointment_id,
            "name": data.get("name"),
            "date": data.get("date"),
            "time": data.get("time"),
            "duration": data.get("duration", 30),
            "doctorName": data.get("doctorName"),
            "status": data.get("status", "Scheduled"),
            "mode": data.get("mode", "Online"),
            "reason": data.get("reason", ""),
            "createdAt": datetime.now().isoformat()
        }
        self._appointments.append(appointment)
        self._next_appointment_id += 1
        return appointment.copy()
    
    def update_appointment(self, appointment_id: int, data: Dict) -> Optional[Dict]:
        for apt in self._appointments:
            if apt["id"] == appointment_id:
                for key, value in data.items():
                    if key in apt and key != "id":
                        apt[key] = value
                apt["updatedAt"] = datetime.now().isoformat()
                return apt.copy()
        return None
    
    def delete_appointment(self, appointment_id: int) -> bool:
        for i, apt in enumerate(self._appointments):
            if apt["id"] == appointment_id:
                self._appointments.pop(i)
                return True
        return False
    
    def filter_appointments(self, date: Optional[str] = None, 
                          status: Optional[str] = None,
                          doctor: Optional[str] = None) -> List[Dict]:
        filtered = self._appointments.copy()
        
        if date:
            filtered = [apt for apt in filtered if apt["date"] == date]
        
        if status:
            filtered = [apt for apt in filtered if apt["status"] == status]
        
        if doctor:
            filtered = [apt for apt in filtered if apt["doctorName"] == doctor]
        
        return filtered
    
    def get_doctors(self) -> List[Dict]:
        return self._doctors.copy()


# Global database instance (simulates PostgreSQL connection)
db = Database()
