import { X } from "lucide-react";
import { useState } from "react";

export default function AppointmentModal({ isOpen, onClose, onSubmit, selectedDate }) {
    const [formData, setFormData] = useState({
        name: "",
        doctorName: "",
        time: "09:00",
        duration: 30,
        mode: "Offline",
        status: "Upcoming",
        reason: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "duration" ? parseInt(value) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Format date as YYYY-MM-DD
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
        const day = String(selectedDate.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;

        const newAppointment = {
            id: Date.now(), // Simple ID generation
            ...formData,
            date: formattedDate
        };

        onSubmit(newAppointment);

        // Reset form
        setFormData({
            name: "",
            doctorName: "",
            time: "09:00",
            duration: 30,
            mode: "Offline",
            status: "Upcoming",
            reason: ""
        });

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-2xl p-6 bg-white rounded-xl shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">New Appointment</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 transition rounded-lg hover:bg-gray-100 hover:text-gray-600"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Patient Name */}
                        <div className="col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Patient Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter patient name"
                            />
                        </div>

                        {/* Doctor Name */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Doctor Name *
                            </label>
                            <input
                                type="text"
                                name="doctorName"
                                value={formData.doctorName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Dr. Smith"
                            />
                        </div>

                        {/* Time */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Time *
                            </label>
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Duration */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Duration (minutes) *
                            </label>
                            <select
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value={15}>15 minutes</option>
                                <option value={30}>30 minutes</option>
                                <option value={45}>45 minutes</option>
                                <option value={60}>1 hour</option>
                                <option value={90}>1.5 hours</option>
                                <option value={120}>2 hours</option>
                            </select>
                        </div>

                        {/* Mode */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Mode *
                            </label>
                            <select
                                name="mode"
                                value={formData.mode}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="Offline">In-Person</option>
                                <option value="Online">Online/Telemedicine</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Status *
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="Upcoming">Upcoming</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Scheduled">Scheduled</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>

                        {/* Reason */}
                        <div className="col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Reason for Visit *
                            </label>
                            <textarea
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                required
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Brief description of the visit reason"
                            />
                        </div>
                    </div>

                    {/* Date Info */}
                    <div className="p-3 mt-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                            <span className="font-medium">Appointment Date:</span>{" "}
                            {selectedDate.toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            })}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 transition bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                            Create Appointment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
