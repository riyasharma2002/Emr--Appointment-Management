export default function DayTimeline({ appointments }) {
  return (
    <div className="p-6 bg-white border rounded-2xl">
      <h3 className="mb-4 font-semibold">Day Schedule</h3>

      {appointments.map((a) => (
        <div
          key={a.id}
          className="p-3 mb-3 border-l-4 border-blue-600 rounded bg-blue-50"
        >
          <div className="font-medium">{a.time}</div>
          <div className="text-sm">{a.name}</div>
          <div className="text-xs text-gray-500">{a.reason}</div>
        </div>
      ))}
    </div>
  );
}
