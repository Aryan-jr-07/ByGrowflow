// app/admin/inquiries/page.tsx
"use client";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import { InquiryTable } from "@/components/admin/InquiryTable";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
  status: string;
  createdAt: string;
}

function SkeletonRow() {
  return (
    <tr className="border-b border-border">
      {[...Array(6)].map((_, i) => (
        <td key={i} className="px-4 py-4">
          <div className="h-4 bg-[#1F1F1F] rounded animate-pulse" style={{ width: `${60 + i * 10}%` }} />
        </td>
      ))}
    </tr>
  );
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = useCallback(async () => {
    try {
      const res = await fetch("/api/inquiries");
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setInquiries(data);
    } catch {
      toast.error("Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchInquiries(); }, [fetchInquiries]);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error();
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
      );
      toast.success("Status updated", { style: { background: "#151515", color: "#F2F2F2", border: "1px solid #1F1F1F", borderRadius: "12px" } });
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-black text-2xl text-primary">Inquiries</h1>
        <p className="font-body text-secondary text-sm mt-1">
          {loading ? "Loading..." : `${inquiries.length} total inquiries`}
        </p>
      </div>

      {loading ? (
        <div className="bg-surface border border-border rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["Name", "Email", "Budget", "Date", "Status", ""].map((h) => (
                  <th key={h} className="px-4 py-3.5 text-left font-body font-medium text-secondary text-xs uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(6)].map((_, i) => <SkeletonRow key={i} />)}
            </tbody>
          </table>
        </div>
      ) : (
        <InquiryTable inquiries={inquiries} onStatusChange={handleStatusChange} />
      )}
    </div>
  );
}
