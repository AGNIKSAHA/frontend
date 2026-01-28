import { useState } from "react";
import QRCode from "react-qr-code";
import { api } from "../api/urls";
import type { ShortenResponse } from "../types/url";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [data, setData] = useState<ShortenResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const convert = async () => {
    if (!url) return;

    setLoading(true);
    try {
      const res = await fetch(api.shorten, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ original_url: url }),
      });

      if (!res.ok) {
        throw new Error("Failed to shorten URL");
      }

      const json: ShortenResponse = await res.json();
      setData(json);
    } finally {
      setLoading(false);
    }
  };

  const shortUrl = data ? api.redirect(data.short_code) : "";

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <input
        className="w-full border p-2 mb-4"
        placeholder="Enter long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        onClick={convert}
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 rounded disabled:opacity-60"
      >
        {loading ? "Converting..." : "Convert"}
      </button>

      {data && (
        <div className="mt-6 flex flex-col items-center">
          <p className="mb-2 text-sm text-gray-600 break-all">
            {shortUrl}
          </p>
          <QRCode value={shortUrl} size={140} />
        </div>
      )}
    </div>
  );
}
