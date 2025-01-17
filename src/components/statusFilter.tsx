import React from "react";

interface StatusFilterProps {
  onChange: (status: string) => void;
}

const StatusFilter: React.FC<StatusFilterProps> = ({ onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <select
      onChange={handleChange}
      className="block px-4 py-2 text-sm text-gray-700 outline-none bg-white border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
    >
      <option value="">All</option>
      <option value="In Stock">In Stock</option>
      <option value="Low Stock">Low Stock</option>
      <option value="Out of Stock">Out of Stock</option>
    </select>
  );
};

export default StatusFilter;
