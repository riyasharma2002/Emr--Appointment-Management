import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-72">
      <Search
        size={16}
        className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
      />
      <input
        type="text"
        placeholder="Search patient or doctor"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-2 pr-3 text-sm border rounded-lg pl-9 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
