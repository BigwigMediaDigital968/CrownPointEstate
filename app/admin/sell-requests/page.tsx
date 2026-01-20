"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Eye, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface SellRequest {
  _id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  expectedPrice: number;
  areaSqft: number;
  createdAt: string;
}

export default function SellRequests() {
  const router = useRouter();
  const [sellRequests, setSellRequests] = useState<SellRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<SellRequest | null>(
    null
  );

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  /* ================= FETCH DATA ================= */
  async function fetchSellRequests() {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/sellproperty/all`
      );
      setSellRequests(res.data);
    } catch (error) {
      console.error("Failed to fetch sell requests", error);
    }
  }

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    const loggedIn = localStorage.getItem("isAdmin");
    if (loggedIn !== "true") {
      router.push("/login");
      return;
    }
    // This effect is responsible for initial data sync with the server.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSellRequests();
  }, [router]);

  /* ================= DELETE ================= */
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE}/sellproperty/${id}`
      );
      setSellRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  /* ================= VIEW ================= */
  const openViewModal = (req: SellRequest) => {
    setSelectedRequest(req);
    setIsViewModalOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Sell Enquiries</h1>

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Location</th>
              <th className="p-3">Expected Price</th>
              <th className="p-3">Area (Sqft)</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {sellRequests.length > 0 ? (
              sellRequests.map((req) => (
                <tr key={req._id} className="border-t">
                  <td className="p-3 text-center">{req.name}</td>
                  <td className="p-3 text-center">{req.phone}</td>
                  <td className="p-3 text-center">{req.location}</td>
                  <td className="p-3 text-center">
                    ₹{req.expectedPrice.toLocaleString("en-IN")}
                  </td>
                  <td className="p-3 text-center">{req.areaSqft}</td>
                  <td className="p-3 flex justify-center gap-3">
                    <button
                      onClick={() => openViewModal(req)}
                      className="p-2 bg-blue-600 rounded-lg text-white"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="p-2 bg-red-600 rounded-lg text-white"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-4 text-gray-500">
                  No sell enquiries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= VIEW MODAL ================= */}
      {isViewModalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 md:w-1/2 rounded-lg p-6 relative">
            <button
              onClick={() => setIsViewModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600"
            >
              <X />
            </button>

            <h2 className="text-xl font-semibold mb-4">Seller Details</h2>

            <div className="space-y-2 text-gray-800">
              <p>
                <strong>Name:</strong> {selectedRequest.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedRequest.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedRequest.phone}
              </p>
              <p>
                <strong>Location:</strong> {selectedRequest.location}
              </p>
              <p>
                <strong>Expected Price:</strong> ₹
                {selectedRequest.expectedPrice.toLocaleString("en-IN")}
              </p>
              <p>
                <strong>Area:</strong> {selectedRequest.areaSqft} sqft
              </p>
              <p>
                <strong>Submitted On:</strong>{" "}
                {new Date(selectedRequest.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
