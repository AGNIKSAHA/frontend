export default function UrlTableHeader() {
  return (
    <thead className="bg-blue-50">
      <tr>
        <th className="w-[45%] px-4 py-3 text-left">
          Original URL
        </th>
        <th className="w-[15%] px-4 py-3 text-center">
          Short URL
        </th>
        <th className="w-[10%] px-4 py-3 text-center">
          Clicks
        </th>
        <th className="w-[10%] px-4 py-3 text-center">
          Status
        </th>
        <th className="w-[20%] px-4 py-3 text-center">
          Actions
        </th>
      </tr>
    </thead>
  );
}
