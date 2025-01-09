// components/StatusFilter.tsx
const StatusFilter = () => {
  return (
    <select className="block px-4 py-2 text-sm text-gray-700 bg-white border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500">
      <option>Status</option>
      <option>In Stock</option>
      <option>Low Stock</option>
      <option>Out of Stock</option>
    </select>
  );
};

export default StatusFilter;
