import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function CalendarPanel({ selectedDate, onDateSelect, appointments = [] }) {
  const [currentMonth, setCurrentMonth] = useState(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
  );

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  const changeMonth = (offset) => {
    const newMonth = new Date(year, month + offset, 1);
    setCurrentMonth(newMonth);
  };

  // Function to check if a date has appointments
  const hasAppointments = (date) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    return appointments.some(app => app.date === dateStr);
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-semibold text-gray-900">
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <div className="flex gap-1">
          <button
            onClick={() => changeMonth(-1)}
            className="p-1.5 text-gray-600 transition rounded-lg hover:bg-gray-100"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => changeMonth(1)}
            className="p-1.5 text-gray-600 transition rounded-lg hover:bg-gray-100"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-3 text-xs font-semibold text-gray-500">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
          <div key={d} className="text-center">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array(startDay).fill(null).map((_, i) => (
          <div key={i} />
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => {
          const date = new Date(year, month, i + 1);
          const isSelected =
            date.toDateString() === selectedDate.toDateString();
          const hasAppt = hasAppointments(date);

          return (
            <button
              key={i}
              onClick={() => onDateSelect(date)}
              className={`relative h-9 text-sm font-medium rounded-lg transition ${isSelected
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              {i + 1}
              {/* Appointment Indicator */}
              {hasAppt && !isSelected && (
                <span className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              )}
              {hasAppt && isSelected && (
                <span className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full opacity-75"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
