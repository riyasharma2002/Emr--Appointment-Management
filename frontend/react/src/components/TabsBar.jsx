export default function TabsBar({ activeTab, onChange }) {
  return (
    <div className="flex gap-4 pb-2 border-b">
      {["Today", "Past", "All"].map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`text-sm ${
            activeTab === t
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
