import Info from "../../app/icons/info";
import Edit from "../../app/icons/edit";
import Delete from "../../app/icons/delete";
import Link from "next/link";
import Image from "next/image";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const TableRow = ({ product, handleDeleteClick }) => (
  <tr className="border-b">
    <td className="px-3 py-3">
      <Image
        width={60}
        height={60}
        src={`${product.imageUrl}` || "http://localhost:8080/images"}
        alt={product.name}
        priority={true}
        className=" h-auto w-auto"
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
    <td className="px-6 py-8 flex h-full space-x-2">
      <Link href={`/pages/productInfo/${product.id}`}>
        <Info />
      </Link>

      <Link href={`/pages/editProduct/${product.id}`}>
        <Edit />
      </Link>
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
