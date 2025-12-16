import { useEffect, useState } from "react";
import { LayoutList, Calendar } from "lucide-react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import CalendarPanel from "./components/CalendarPanel";
import AppointmentCard from "./components/AppointmentCard";
import CalendarTimelineView from "./components/CalendarTimelineView";
import AppointmentModal from "./components/AppointmentModal";
import { getAppointments, getAppointmentsByDate, createAppointment } from "./services/appointment_service";

export default function EMR_Frontend_Assignment() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  const [viewMode, setViewMode] = useState("list"); // "list" or "timeline"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllAppointments = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const allData = await getAppointments();
        setAllAppointments(allData);

        filterAppointmentsByDate(allData, selectedDate);

      } catch (err) {
        console.error("Error loading appointments:", err);
        setError("Failed to load appointments. Make sure the backend server is running.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllAppointments();
  }, []);

  useEffect(() => {
    if (allAppointments.length > 0) {
      filterAppointmentsByDate(allAppointments, selectedDate);
    }
  }, [selectedDate, allAppointments]);

  const filterAppointmentsByDate = (allData, date) => {
    const dateStr = formatDate(date);
    const filtered = allData.filter(app => app.date === dateStr);
    setAppointments(filtered);
  };

  const handleNewAppointment = async (newAppointmentData) => {
    try {
      setIsLoading(true);
      const createdAppointment = await createAppointment(newAppointmentData);
      setAllAppointments(prev => [...prev, createdAppointment]);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error creating appointment:", err);
      setError("Failed to create appointment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-8 overflow-auto">
        <Header onNewAppointment={() => setIsModalOpen(true)} />
        <StatsCards appointments={appointments} />

        <div className="grid grid-cols-3 gap-6 mt-8">
          <CalendarPanel
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            appointments={allAppointments}
          />

          <div className="col-span-2">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${viewMode === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                  }`}
              >
                <LayoutList size={16} />
                List View
              </button>
              <button
                onClick={() => setViewMode("timeline")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition ${viewMode === "timeline"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                  }`}
              >
                <Calendar size={16} />
                Timeline View
              </button>
            </div>

            {viewMode === "list" ? (
              <div className="p-6 bg-white border border-gray-200 rounded-xl">
                <h2 className="mb-5 text-lg font-semibold text-gray-900">Appointments</h2>

                {error && (
                  <div className="p-4 mb-4 border border-red-200 rounded-lg bg-red-50">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                {isLoading ? (
                  <div className="py-8 text-center">
                    <div className="inline-block w-8 h-8 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                    <p className="mt-2 text-gray-500">Loading appointments...</p>
                  </div>
                ) : appointments.length === 0 ? (
                  <p className="py-8 text-center text-gray-500">
                    No appointments for this date
                  </p>
                ) : (
                  <div>
                    {appointments.map(a => (
                      <AppointmentCard key={a.id} appointment={a} />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <CalendarTimelineView
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                appointments={appointments}
              />
            )}
          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleNewAppointment}
        selectedDate={selectedDate}
      />
    </div>
  );
}
