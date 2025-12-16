import { CalendarCheck, CheckCircle, Clock, Video } from "lucide-react";

export default function StatsCards({ appointments }) {
  const todayCount = appointments.length;

  const confirmed = appointments.filter(
    (a) => a.status === "Confirmed"
  ).length;

  const upcoming = appointments.filter(
    (a) => a.status === "Upcoming"
  ).length;

  const telemedicine = appointments.filter(
    (a) => a.mode === "Online"
  ).length;

  const stats = [
    {
      label: "Today's Appointments",
      value: todayCount,
      icon: CalendarCheck,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Confirmed Appointments",
      value: confirmed,
      icon: CheckCircle,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Upcoming Appointments",
      value: upcoming,
      icon: Clock,
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      label: "Telemedicine Sessions",
      value: telemedicine,
      icon: Video,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-5">
      {stats.map((s) => (
        <div
          key={s.label}
          className="p-6 transition bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-gray-300"
        >
          <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center mb-4`}>
            <s.icon size={22} />
          </div>

          <div>
            <p className="text-3xl font-bold text-gray-900">{s.value}</p>
            <p className="mt-1 text-sm font-medium text-gray-500">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
