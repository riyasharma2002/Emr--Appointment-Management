import { Plus, Download } from "lucide-react";

export default function Header({ onNewAppointment }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {/* LEFT */}
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Appointment Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Schedule and manage patient appointments
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* Export */}
          <button
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 transition bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Download size={16} />
            Export
          </button>

          {/* Primary CTA */}
          <button
            onClick={onNewAppointment}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white transition bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700"
          >
            <Plus size={16} />
            New Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
