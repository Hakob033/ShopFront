import Info from "../../app/icons/info";
import Edit from "../../app/icons/edit";
import Delete from "../../app/icons/delete";
import Link from "next/link";

const TableRow = ({ product, handleDeleteClick }) => (
  <tr className="border-b">
    <td className="px-6 py-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-10 h-10 rounded-md"
      />
    </td>
    <td className="px-6 py-4 text-sm text-gray-700">{product.name}</td>
    <td className="px-6 py-4 text-sm text-gray-700">{product.sku}</td>
    <td className="px-6 py-4 text-sm text-gray-700">{product.category}</td>
    <td className="px-6 py-4 text-sm text-gray-700">${product.price}</td>
    <td className="px-6 py-4 text-sm text-center text-gray-700">
      {product.stockQuantity}
    </td>
    <td className="px-6 py-4">
      <span
        className={`px-3 py-1 text-xs text-nowrap text-center text-white rounded-full ${
          product.stockQuantity > 10
            ? "bg-green"
            : product.stockQuantity > 0
            ? "bg-orange"
            : "bg-red"
        }`}
      >
        {product.stockQuantity > 10
          ? "In Stock"
          : product.stockQuantity > 0
          ? "Low Stock"
          : "Out of Stock"}
      </span>
    </td>
    <td className="px-6 py-6 flex space-x-2">
      <Link href={`/pages/${product.id}`}>
        <Info />
      </Link>

      <Edit />
      <button
        onClick={() => handleDeleteClick(product)}
        className="text-red-500 hover:text-red-700"
      >
        <Delete />
      </button>
    </td>
  </tr>
);

export default TableRow;
