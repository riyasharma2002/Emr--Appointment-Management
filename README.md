# EMR Appointment App

This is my full-stack EMR assignment. It helps doctors manage appointments and patient queues.

**Features:**
*   Schedule appointments
*   Calendar view with blue dots for busy days
*   Timeline view for the day's schedule
*   Update status (Confirmed, Cancelled, etc.)

**Tech Stack:**
*   Frontend: React + Tailwind CSS
*   Backend: Python (Flask) simulating AWS Lambda

---

### Steps to Setup (on your laptop)

1.  **Download Code**: Download the zip file and extract it.
2.  **Open Terminal**: Open your terminal (Mac) or Request (Windows).
3.  **Check Python**: Type `python3 --version` to make sure you have it.
4.  **Check Node**: Type `node -v` to check for Node.js.

### How to Run It

**1. Start the Backend (API)**
Go to the backend folder and run the server:
```bash
cd backend
pip install -r requirements.txt
python3 server.py
```
It runs on port 5001.

**2. Start the Frontend (React)**
Open a new terminal window, go to the frontend folder:
```bash
cd frontend/react
npm install
npm run dev
```
It runs on port 3000.

---

### Common Issues?
*   **Backend won't start?** Make sure port **5001** is free (AirPlay often uses port 5000, so we used 5001).
*   **"Module not found"?** Make sure you ran `pip install -r requirements.txt` inside the backend folder.
---

### 5. Technical Explanation

**A. API Query Structure (getAppointments)**
We designed the `getAppointments` API to be flexible, similar to a GraphQL query. instead of multiple endpoints, we use a single smart endpoint that accepts filters:
*   **Query**: `GET /api/appointments?date=2025-12-16&status=Confirmed`
*   **Logic**: The backend checks for these optional parameters. If provided, it filters the dataset; if not, it returns everything. This mimics a GraphQL resolver that handles arguments to shape the response.

**B. Data Consistency**
To ensure data remains consistent during updates (like changing an appointment status):
1.  **Single Source of Truth**: We use a singleton `Database` class (`data_models.py`). All data lives in one protected list (`self._appointments`).
2.  **Atomic Updates**: When you update an appointment, the `update_appointment` function locks onto the specific ID, finds the record, modifies only the requested fields, and immediately saves it back. This prevents partial updates or "ghost" data.
3.  **Validation**: Before any update, the service layer (`appointment_service.py`) validates the input (e.g., ensuring "status" is a valid string like "Confirmed") before it ever touches the database.

