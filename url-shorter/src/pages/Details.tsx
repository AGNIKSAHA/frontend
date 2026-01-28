import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import DetailsHeader from "../Components/DetailsHeader";

import AnalyticsPie3D from "../Components/AnalyticsPie3D";
import ClicksTimeChart from "../Components/ClicksTimeChart";

import type { UrlDetails, AnalyticsResponse } from "../types/analytics";

import { api } from "../api/urls";

export default function Details() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  const [url, setUrl] = useState<UrlDetails | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const shortUrl = code ? api.redirect(code) : "";

  useEffect(() => {
    if (!code) return;

    const fetchAll = async () => {
      try {
        const [detailsRes, analyticsRes] = await Promise.all([
          fetch(api.details(code)),
          fetch(api.analytics(code)),
        ]);

        if (!detailsRes.ok) {
          throw new Error("Failed to load details");
        }

        setUrl(await detailsRes.json());

        if (analyticsRes.ok) {
          setAnalytics(await analyticsRes.json());
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [code]);

  const downloadQR = () => {
    const svg = document.getElementById("qr-code");
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    const blob = new Blob([svgStr], {
      type: "image/svg+xml;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const a = document.createElement("a");
      a.download = "qr-code.png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    };

    img.src = url;
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading details…</p>;
  }

  if (!url) {
    return <p className="text-center text-red-500">URL not found</p>;
  }

  const expired = new Date(url.expires_at) < new Date();

  const devices = analytics?.devices ?? [];
  const browsers = analytics?.browsers ?? [];
  const os = analytics?.os ?? [];
  const countries = analytics?.countries ?? [];

  return (
    <div className="max-w-6xl mx-auto bg-white rounded shadow p-6">
      <DetailsHeader />

      <div className="space-y-2">
        <p>
          <b>Original URL:</b>{" "}
          <span className="break-all">{url.original_url}</span>
        </p>

        <p>
          <b>Short URL:</b>{" "}
          <a
            href={shortUrl}
            target="_blank"
            className="text-blue-600 underline"
          >
            {shortUrl}
          </a>
        </p>

        <p>
          <b>Clicks:</b> {url.click_count}
        </p>

        <p>
          <b>Status:</b>{" "}
          <span className={expired ? "text-red-500" : "text-green-600"}>
            {expired ? "Expired" : "Active"}
          </span>
        </p>
      </div>

      <div className="mt-6 flex flex-col items-center">
        <div className="bg-white p-4 border rounded">
          <QRCode id="qr-code" value={shortUrl} size={160} />
        </div>

        <button
          onClick={downloadQR}
          className="mt-3 text-blue-600 hover:underline"
        >
          Download QR Code
        </button>
      </div>

      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {devices.length > 0 && (
            <AnalyticsPie3D
              title="Devices"
              labels={devices.map((d) => d.name)}
              values={devices.map((d) => d.value)}
            />
          )}

          {browsers.length > 0 && (
            <AnalyticsPie3D
              title="Browsers"
              labels={browsers.map((b) => b.name)}
              values={browsers.map((b) => b.value)}
            />
          )}

          {os.length > 0 && (
            <AnalyticsPie3D
              title="Operating Systems"
              labels={os.map((o) => o.name)}
              values={os.map((o) => o.value)}
            />
          )}

          {countries.length > 0 && (
            <AnalyticsPie3D
              title="Locations"
              labels={countries.map((c) => c.name)}
              values={countries.map((c) => c.value)}
            />
          )}
        </div>
      )}

      {analytics?.clicks_over_time?.length ? (
        <ClicksTimeChart data={analytics.clicks_over_time} />
      ) : null}
    </div>
  );
}
