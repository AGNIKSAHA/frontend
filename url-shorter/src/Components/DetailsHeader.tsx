
import {useNavigate } from "react-router-dom";

export default function DetailsHeader() {
    const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">URL Details</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-purple-600 hover:underline"
        >
          ← Back to Dashboard
        </button>
      </div>
  )
}
