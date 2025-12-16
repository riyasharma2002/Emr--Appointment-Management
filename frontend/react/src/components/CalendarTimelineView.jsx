import { ChevronLeft, ChevronRight } from "lucide-react";
import TimelineAppointmentBar from "./TimelineAppointmentBar";

export default function CalendarTimelineView({ selectedDate, onDateChange, appointments }) {
    const timeSlots = [
        "08:00", "09:00", "10:00", "11:00", "12:00",
        "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
    ];

    const formatTime = (hour) => {
        const h = parseInt(hour.split(":")[0]);
        const period = h >= 12 ? "PM" : "AM";
        const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h;
        return `${displayHour}:00 ${period}`;
    };

    const changeDate = (offset) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + offset);
        onDateChange(newDate);
    };

    const formatDate = (date) => {
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        });
    };

    return (
        <div className="p-6 bg-white border border-gray-200 rounded-xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">Calendar</h2>
                    <p className="text-sm text-gray-500">{formatDate(selectedDate)}</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => changeDate(-1)}
                        className="p-2 text-gray-600 transition border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={() => {
                            onDateChange(new Date());
                        }}
                        className="px-4 py-2 text-sm font-medium text-gray-700 transition border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                        Today
                    </button>
                    <button
                        onClick={() => changeDate(1)}
                        className="p-2 text-gray-600 transition border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            {/* Timeline Grid */}
            <div className="relative">
                {/* Time labels and grid lines */}
                <div className="relative">
                    {timeSlots.map((slot, index) => (
                        <div key={slot} className="flex" style={{ height: "80px" }}>
                            {/* Time label */}
                            <div className="w-20 pr-4 text-sm font-medium text-gray-500">
                                {formatTime(slot)}
                            </div>

                            {/* Grid line and appointment area */}
                            <div className="relative flex-1 border-t border-gray-200">
                                {/* This is where appointments will be positioned */}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Appointments overlay */}
                <div className="absolute top-0 left-20 right-0" style={{ height: `${timeSlots.length * 80}px` }}>
                    <div className="relative h-full">
                        {appointments.map((appointment) => (
                            <TimelineAppointmentBar key={appointment.id} appointment={appointment} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Empty state */}
            {appointments.length === 0 && (
                <div className="py-12 text-center text-gray-400">
                    No appointments scheduled for this day
                </div>
            )}
        </div>
    );
}
