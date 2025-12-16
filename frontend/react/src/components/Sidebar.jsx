import { CalendarDays, Users, Settings, LayoutDashboard, FileText, UserCircle, Calendar } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="flex flex-col w-20 bg-white border-r border-gray-200">
      {/* Logo/Brand Area */}
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
      </div>

      {/* Navigation Icons */}
      <div className="flex flex-col items-center gap-6 py-8">
        <button className="p-3 text-gray-400 transition rounded-lg hover:bg-gray-100 hover:text-gray-700">
          <LayoutDashboard size={20} />
        </button>
        <button className="p-3 text-white transition bg-blue-600 rounded-lg">
          <Calendar size={20} />
        </button>
        <button className="p-3 text-gray-400 transition rounded-lg hover:bg-gray-100 hover:text-gray-700">
          <Users size={20} />
        </button>
        <button className="p-3 text-gray-400 transition rounded-lg hover:bg-gray-100 hover:text-gray-700">
          <FileText size={20} />
        </button>
        <button className="p-3 text-gray-400 transition rounded-lg hover:bg-gray-100 hover:text-gray-700">
          <UserCircle size={20} />
        </button>
        <button className="p-3 text-gray-400 transition rounded-lg hover:bg-gray-100 hover:text-gray-700">
          <Settings size={20} />
        </button>
      </div>
    </div>
  );
}
