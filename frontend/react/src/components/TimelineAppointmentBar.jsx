export default function TimelineAppointmentBar({ appointment }) {
    const getStatusColor = (status) => {
        switch (status) {
            case "Confirmed":
                return "bg-green-500";
            case "Upcoming":
                return "bg-blue-500";
            case "Cancelled":
                return "bg-red-500";
            case "Scheduled":
                return "bg-indigo-500";
            default:
                return "bg-gray-500";
        }
    };

    const getModeColor = (mode) => {
        if (mode === "Online") return "bg-purple-500";
        return "bg-blue-500";
    };

    // Parse time from 24-hour format (e.g., "09:00") and duration in minutes
    const parseTimeFromData = () => {
        const timeStr = appointment.time; // e.g., "09:00"
        const duration = appointment.duration || 30; // default 30 minutes

        // Parse start time
        const [hours, minutes] = timeStr.split(":").map(Number);
        const startMinutes = hours * 60 + minutes;

        // Calculate end time
        const endMinutes = startMinutes + duration;

        return { startMinutes, endMinutes, duration };
    };

    // Convert minutes to 12-hour format string
    const minutesToTimeString = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const period = hours >= 12 ? "PM" : "AM";
        const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
        return `${displayHour}:${String(minutes).padStart(2, "0")} ${period}`;
    };

    const { startMinutes, endMinutes, duration } = parseTimeFromData();

    const startTimeStr = minutesToTimeString(startMinutes);
    const endTimeStr = minutesToTimeString(endMinutes);

    // Calculate position (starting from 8:00 AM = 480 minutes)
    const dayStartMinutes = 8 * 60; // 8:00 AM
    const topPosition = ((startMinutes - dayStartMinutes) / 60) * 80; // 80px per hour
    const height = (duration / 60) * 80; // 80px per hour

    const colorClass = appointment.mode === "Online" ? getModeColor(appointment.mode) : getStatusColor(appointment.status);

    return (
        <div
            className={`absolute left-0 right-0 mx-2 px-4 py-2 rounded-lg text-white text-sm ${colorClass} shadow-md hover:shadow-lg transition cursor-pointer`}
            style={{
                top: `${topPosition}px`,
                height: `${Math.max(height, 60)}px`,
                minHeight: "60px"
            }}
        >
            <div className="font-semibold">{appointment.name}</div>
            <div className="text-xs opacity-90 mt-1">{startTimeStr} - {endTimeStr}</div>
            {duration >= 60 && (
                <div className="text-xs opacity-80 mt-1">{appointment.doctorName}</div>
            )}
        </div>
    );
}
