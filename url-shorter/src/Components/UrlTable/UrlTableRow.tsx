import { Link } from "react-router-dom";
import type { ShortUrl } from "../../context/AppContext";

interface Props {
  url: ShortUrl;
  onDelete: (id: string) => void;
}

export default function UrlTableRow({ url, onDelete }: Props) {
  const expired =
    new Date(url.expires_at) < new Date();

  return (
    <tr className="border-t hover:bg-gray-50">
      
      <td className="w-[45%] px-4 py-3 truncate">
        {url.original_url}
      </td>

     
      <td className="w-[15%] px-4 py-3 text-center text-blue-600">
        {url.short_code}
      </td>

      
      <td className="w-[10%] px-4 py-3 text-center">
        {url.click_count}
      </td>

      
      <td
        className={`w-[10%] px-4 py-3 text-center font-medium ${
          expired
            ? "text-red-500"
            : "text-green-600"
        }`}
      >
        {expired ? "Expired" : "Active"}
      </td>

      
      <td className="w-[20%] px-4 py-3 text-center space-x-4">
        <Link
          to={`/details/${url.short_code}`}
          className="text-blue-600 hover:underline"
        >
          Details
        </Link>

        <button
          onClick={() => onDelete(url.id)}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
