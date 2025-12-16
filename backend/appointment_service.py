

from typing import List, Dict, Optional
from data_models import db


def get_appointments(date: Optional[str] = None, 
                    status: Optional[str] = None,
                    doctor: Optional[str] = None) -> List[Dict]:
    return db.filter_appointments(date=date, status=status, doctor=doctor)


def get_appointment_by_id(appointment_id: int) -> Optional[Dict]:
    return db.get_appointment_by_id(appointment_id)


def create_appointment(data: Dict) -> Dict:
    # Validate required fields
    required_fields = ["name", "date", "time", "doctorName"]
    for field in required_fields:
        if not data.get(field):
            raise ValueError(f"Missing required field: {field}")
    
    # Validate status if provided
    valid_statuses = ["Upcoming", "Scheduled", "Confirmed", "Cancelled", "Completed"]
    if "status" in data and data["status"] not in valid_statuses:
        raise ValueError(f"Invalid status. Must be one of: {', '.join(valid_statuses)}")
    
    # Validate mode if provided
    valid_modes = ["Online", "Offline"]
    if "mode" in data and data["mode"] not in valid_modes:
        raise ValueError(f"Invalid mode. Must be one of: {', '.join(valid_modes)}")
    
    return db.create_appointment(data)


def update_appointment_status(appointment_id: int, new_status: str) -> Optional[Dict]:
    valid_statuses = ["Upcoming", "Scheduled", "Confirmed", "Cancelled", "Completed"]
    if new_status not in valid_statuses:
        raise ValueError(f"Invalid status. Must be one of: {', '.join(valid_statuses)}")
    
    return db.update_appointment(appointment_id, {"status": new_status})


def update_appointment(appointment_id: int, data: Dict) -> Optional[Dict]:
    return db.update_appointment(appointment_id, data)


def delete_appointment(appointment_id: int) -> bool:
    return db.delete_appointment(appointment_id)


def get_appointment_stats() -> Dict:
    all_appointments = db.get_all_appointments()
    
    stats = {
        "total": len(all_appointments),
        "upcoming": len([a for a in all_appointments if a["status"] == "Upcoming"]),
        "scheduled": len([a for a in all_appointments if a["status"] == "Scheduled"]),
        "confirmed": len([a for a in all_appointments if a["status"] == "Confirmed"]),
        "cancelled": len([a for a in all_appointments if a["status"] == "Cancelled"]),
        "completed": len([a for a in all_appointments if a["status"] == "Completed"]),
    }
    
    return stats


def get_doctors() -> List[Dict]:
    return db.get_doctors()
