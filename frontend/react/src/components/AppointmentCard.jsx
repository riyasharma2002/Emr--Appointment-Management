import { User, Clock, MapPin } from "lucide-react";

export default function AppointmentCard({ appointment }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-50 text-green-700 border-green-200";
      case "Upcoming":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="flex items-start gap-4 p-5 mb-3 transition border border-gray-200 rounded-xl hover:shadow-md hover:border-gray-300">

      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
        <User size={20} className="text-blue-600" />
      </div>


      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900">{appointment.name}</h3>
            <p className="mt-1 text-sm text-gray-600">{appointment.doctorName}</p>
          </div>
          <span className={`px-3 py-1 text-xs font-medium border rounded-full ${getStatusColor(appointment.status)}`}>
            {appointment.status}
          </span>
        </div>

        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <Clock size={14} />
            <span>{appointment.time}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={14} />
            <span>{appointment.mode}</span>
          </div>
        </div>

        <p className="mt-2 text-sm text-gray-600">
          <span className="font-medium">Reason:</span> {appointment.reason}
        </p>
      </div>
    </div>
  );
}
