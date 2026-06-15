// components/admin/InquiryTable.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, ChevronRight } from "lucide-react";
import { StatusBadge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

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

interface InquiryTableProps {
  inquiries: Inquiry[];
  onStatusChange: (id: string, status: string) => void;
}

const STATUSES = ["All", "New", "In Progress", "Closed"];

export function InquiryTable({ inquiries, onStatusChange }: InquiryTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = inquiries.filter((inq) => {
    const matchesStatus = statusFilter === "All" || inq.status === statusFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      inq.name.toLowerCase().includes(q) ||
      inq.email.toLowerCase().includes(q) ||
      inq.company.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const selected = inquiries.find((i) => i.id === selectedId);

  return (
    <div className="flex gap-6 h-full">
      {/* Table */}
      <div className="flex-1 min-w-0">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary" />
            <input
              id="inquiry-search"
              type="text"
              placeholder="Search by name, email, or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface border border-border rounded-xl pl-9 pr-4 py-2.5 font-body text-primary text-sm placeholder:text-secondary focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>
          <div className="flex gap-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                id={`filter-${s.replace(" ", "-").toLowerCase()}`}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 rounded-xl font-body text-xs font-medium transition-all ${
                  statusFilter === s
                    ? "bg-accent/10 text-accent border border-accent/30"
                    : "bg-surface text-secondary border border-border hover:text-primary"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-surface border border-border rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["Name", "Email", "Budget", "Date", "Status", ""].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3.5 text-left font-body font-medium text-secondary text-xs uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-secondary font-body text-sm">
                    No inquiries match your filters.
                  </td>
                </tr>
              )}
              {filtered.map((inq) => (
                <motion.tr
                  key={inq.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setSelectedId(selectedId === inq.id ? null : inq.id)}
                  className={`border-b border-border last:border-0 cursor-pointer transition-colors ${
                    selectedId === inq.id ? "bg-accent/5" : "hover:bg-white/[0.02]"
                  }`}
                >
                  <td className="px-4 py-3.5">
                    <p className="font-body font-semibold text-primary text-sm">{inq.name}</p>
                    <p className="font-body text-secondary text-xs">{inq.company}</p>
                  </td>
                  <td className="px-4 py-3.5 font-body text-secondary text-sm">{inq.email}</td>
                  <td className="px-4 py-3.5 font-body text-secondary text-sm">{inq.budget}</td>
                  <td className="px-4 py-3.5 font-body text-secondary text-xs">{formatDate(inq.createdAt)}</td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={inq.status} />
                  </td>
                  <td className="px-4 py-3.5">
                    <ChevronRight size={14} className={`text-secondary transition-transform ${selectedId === inq.id ? "rotate-90" : ""}`} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Panel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
            className="w-80 flex-shrink-0 bg-surface border border-border rounded-2xl p-6 h-fit sticky top-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display font-bold text-primary text-base">Inquiry Details</h3>
              <button
                onClick={() => setSelectedId(null)}
                className="p-1.5 rounded-lg text-secondary hover:text-primary hover:bg-white/5 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {[
                { label: "Name", value: selected.name },
                { label: "Email", value: selected.email },
                { label: "Company", value: selected.company },
                { label: "Budget", value: selected.budget },
                { label: "Received", value: formatDate(selected.createdAt) },
              ].map((field) => (
                <div key={field.label}>
                  <p className="font-body text-secondary text-xs uppercase tracking-wider mb-1">{field.label}</p>
                  <p className="font-body text-primary text-sm">{field.value}</p>
                </div>
              ))}

              <div>
                <p className="font-body text-secondary text-xs uppercase tracking-wider mb-1">Brief</p>
                <p className="font-body text-secondary text-sm leading-relaxed">{selected.message}</p>
              </div>
            </div>

            {/* Status dropdown */}
            <div>
              <p className="font-body text-secondary text-xs uppercase tracking-wider mb-2">Status</p>
              <select
                id="inquiry-status-select"
                value={selected.status}
                onChange={(e) => onStatusChange(selected.id, e.target.value)}
                className="w-full bg-bg border border-border rounded-xl px-3 py-2.5 font-body text-primary text-sm focus:outline-none focus:border-accent/50 transition-colors cursor-pointer"
              >
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
