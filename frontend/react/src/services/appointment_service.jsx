/**
 * Appointment API Service
 * Connects React frontend to Python backend API
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

/**
 * Get appointments with optional filtering
 * @param {string} date - Filter by date (YYYY-MM-DD)
 * @param {string} status - Filter by status
 * @param {string} doctor - Filter by doctor name
 * @returns {Promise<Array>} Array of appointments
 */
export async function getAppointments(date = null, status = null, doctor = null) {
  try {

    const params = new URLSearchParams();
    if (date) params.append('date', date);
    if (status) params.append('status', status);
    if (doctor) params.append('doctor', doctor);

    const url = `${API_BASE_URL}/appointments${params.toString() ? '?' + params.toString() : ''}`;

    console.log(' Fetching appointments from:', url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(' Received appointments:', data);

    return data.appointments || [];
  } catch (error) {
    console.error(' Error fetching appointments:', error);
    throw error;
  }
}

/**
 * Get appointments by date (convenience function)
 * @param {Date} dateObj - JavaScript Date object
 * @returns {Promise<Array>} Array of appointments for that date
 */
export async function getAppointmentsByDate(dateObj) {
  if (!(dateObj instanceof Date)) {
    console.error('Invalid date object provided');
    return [];
  }

  // Format date as YYYY-MM-DD (local time, no timezone shift)
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  console.log("🔎 Filtering for date:", formattedDate);

  return getAppointments(formattedDate);
}

/**
 * Create a new appointment
 * @param {Object} appointmentData - Appointment details
 * @returns {Promise<Object>} Created appointment
 */
export async function createAppointment(appointmentData) {
  try {
    console.log('🔄 Creating appointment:', appointmentData);

    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Appointment created:', data);

    return data.appointment;
  } catch (error) {
    console.error(' Error creating appointment:', error);
    throw error;
  }
}

/**
 * Update appointment status
 * @param {number} appointmentId - ID of appointment to update
 * @param {string} newStatus - New status value
 * @returns {Promise<Object>} Updated appointment
 */
export async function updateAppointmentStatus(appointmentId, newStatus) {
  try {
    console.log(`🔄 Updating appointment ${appointmentId} status to:`, newStatus);

    const response = await fetch(`${API_BASE_URL}/appointments/${appointmentId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(' Status updated:', data);

    return data.appointment;
  } catch (error) {
    console.error(' Error updating status:', error);
    throw error;
  }
}

/**
 * Get appointment statistics
 * @returns {Promise<Object>} Statistics object
 */
export async function getAppointmentStats() {
  try {
    const response = await fetch(`${API_BASE_URL}/appointments/stats`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const stats = await response.json();
    return stats;
  } catch (error) {
    console.error(' Error fetching stats:', error);
    throw error;
  }
}

/**
 * Get list of doctors
 * @returns {Promise<Array>} Array of doctors
 */
export async function getDoctors() {
  try {
    const response = await fetch(`${API_BASE_URL}/doctors`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.doctors || [];
  } catch (error) {
    console.error(' Error fetching doctors:', error);
    throw error;
  }
}

