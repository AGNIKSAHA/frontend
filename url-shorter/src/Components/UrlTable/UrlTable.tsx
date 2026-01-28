import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useApp } from "../../context/AppContext";

import UrlTableHeader from "./UrlTableHeader";
import UrlTableRow from "./UrlTableRow";

export default function UrlTable() {
  const {
    urls,
    loading,
    hasMore,
    fetchUrls,
    initFetch,
    resetUrls,
    deleteUrl,
  } = useApp();

  const observerRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

//   REFRESH ON DASHBOARD ENTRY
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      resetUrls();
      initFetch();
    }
  }, [location.pathname]);

  

//   INFINITE SCROLL 
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading) {
          fetchUrls();
        }
      },
      { threshold: 1 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="w-full table-fixed">
        <UrlTableHeader />

        <tbody>
          {urls.map((url) => (
            <UrlTableRow
              key={url.id}
              url={url}
              onDelete={deleteUrl}
            />
          ))}
        </tbody>
      </table>


      <div ref={observerRef} className="h-10" />

      {loading && (
        <p className="text-center py-4 text-gray-500">
          Loading...
        </p>
      )}

      {!hasMore && (
        <p className="text-center py-4 text-gray-400">
          No more records
        </p>
      )}
    </div>
  );
}
