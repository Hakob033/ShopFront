import { Poppins } from "next/font/google";

const font = Poppins({
  weight: ["600"],
  subsets: ["latin"],
});

const TableHeader = () => (
  <thead>
    <tr className="border-b bg-gray-100">
      <th className={`px-6 py-3 text-sm text-left ${font.className} text-dark`}>
        Image
      </th>
      <th className={`px-6 py-3 text-sm text-left ${font.className} text-dark`}>
        Product Name
      </th>
      <th className={`px-6 py-3 text-sm text-left ${font.className} text-dark`}>
        SKU
      </th>
      <th className={`px-6 py-3 text-sm text-left ${font.className} text-dark`}>
        Category
      </th>
      <th className={`px-6 py-3 text-sm text-left ${font.className} text-dark`}>
        Price
      </th>
      <th className={`px-6 py-3 text-sm text-left ${font.className} text-dark`}>
        Stock Quantity
      </th>
      <th className={`px-6 py-3 text-sm text-left ${font.className} text-dark`}>
        Status
      </th>
      <th className="px-6 py-3 text-left">
        <button className="px-6 py-2 text-white bg-medium rounded-xl">
          CSV
        </button>
      </th>
    </tr>
  </thead>
);

export default TableHeader;
