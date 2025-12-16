export default function AppointmentSkeleton() {
  return (
    <div className="p-4 bg-white shadow-sm rounded-xl animate-pulse">
      <div className="w-40 h-4 mb-2 bg-gray-200 rounded" />
      <div className="w-32 h-3 mb-2 bg-gray-200 rounded" />
      <div className="w-24 h-3 bg-gray-200 rounded" />
    </div>
  );
}
