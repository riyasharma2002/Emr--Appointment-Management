export default function FilterDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 text-sm bg-white border rounded-lg"
    >
      <option value="">All Status</option>
      <option value="Confirmed">Confirmed</option>
      <option value="Upcoming">Upcoming</option>
      <option value="Scheduled">Scheduled</option>
      <option value="Past">Past</option>
    </select>
  );
}
