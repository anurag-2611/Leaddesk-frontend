import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import StatusBadge from "../components/StatusBadge";
import MetricsCard from "../components/MetricsCard";

const STATUS_OPTIONS = ["New", "Contacted", "Closed"];

export default function AdminDashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { admin, logout } = useAuth();
  const { register, watch } = useForm({
    defaultValues: {
      search: "",
      statusFilter: "All",
    },
  });
  const search = watch("search");
  const statusFilter = watch("statusFilter");

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    setLoading(true);
    try {
      const res = await api.get("/leads");
      setLeads(res.data.leads);
    } catch (err) {
      setError("Could not load leads. Please refresh.");
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id, newStatus) {
    // Optimistically update the UI, then confirm with the server
    const prevLeads = leads;
    setLeads((prev) =>
      prev.map((l) => (l._id === id ? { ...l, status: newStatus } : l)),
    );
    try {
      await api.patch(`/leads/${id}/status`, { status: newStatus });
    } catch (err) {
      setLeads(prevLeads); // roll back on failure
      setError("Failed to update status. Please try again.");
    }
  }

  const metrics = useMemo(() => {
    return {
      total: leads.length,
      new: leads.filter((l) => l.status === "New").length,
      closed: leads.filter((l) => l.status === "Closed").length,
    };
  }, [leads]);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const lowerSearch = search.toLowerCase();
      const matchesSearch =
        lead.name.toLowerCase().includes(lowerSearch) ||
        lead.email.toLowerCase().includes(lowerSearch);
      const matchesStatus =
        statusFilter === "All" || lead.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [leads, search, statusFilter]);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              LeadDesk Admin
            </h1>
            {admin?.email && (
              <p className="text-sm text-slate-500 mt-0.5">{admin.email}</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchLeads}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Refresh
            </button>
            <button
              onClick={logout}
              className="rounded-lg bg-slate-900 text-white text-sm px-3 py-2 hover:bg-slate-800"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <MetricsCard label="Total Leads" value={metrics.total} />
              <MetricsCard
                label="New Leads"
                value={metrics.new}
                accent="text-blue-600"
              />
              <MetricsCard
                label="Closed Leads"
                value={metrics.closed}
                accent="text-emerald-600"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="grid gap-3 md:grid-cols-[1.8fr_1fr]">
              <input
                type="text"
                placeholder="Search by name or email..."
                {...register("search")}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              />
              <select
                {...register("statusFilter")}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              >
                <option value="All">All statuses</option>
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {loading ? (
          <p className="text-slate-500">Loading leads...</p>
        ) : filteredLeads.length === 0 ? (
          <p className="text-slate-500">No leads match your search.</p>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block bg-white rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
                  <tr>
                    <th className="text-left px-6 py-3">Name</th>
                    <th className="text-left px-6 py-3">Email</th>
                    <th className="text-left px-6 py-3">Budget</th>
                    <th className="text-left px-6 py-3">Date</th>
                    <th className="text-left px-6 py-3">Status</th>
                    <th className="text-left px-6 py-3">Update</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead._id}
                      className="border-t border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {lead.name}
                      </td>
                      <td className="px-6 py-4 text-slate-600">{lead.email}</td>
                      <td className="px-6 py-4 text-slate-600">
                        {lead.budgetRange}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={lead.status} />
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            handleStatusChange(lead._id, e.target.value)
                          }
                          className="rounded-2xl border border-slate-200 px-3 py-2 text-sm bg-slate-50 focus:outline-none"
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile card list */}
            <div className="md:hidden space-y-3">
              {filteredLeads.map((lead) => (
                <div
                  key={lead._id}
                  className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {lead.name}
                      </p>
                      <p className="text-sm text-slate-500">{lead.email}</p>
                    </div>
                    <StatusBadge status={lead.status} />
                  </div>
                  <p className="text-sm text-slate-600 mb-1">
                    Budget: {lead.budgetRange}
                  </p>
                  <p className="text-sm text-slate-600 mb-3">
                    Received: {new Date(lead.createdAt).toLocaleDateString()}
                  </p>
                  <select
                    value={lead.status}
                    onChange={(e) =>
                      handleStatusChange(lead._id, e.target.value)
                    }
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm bg-slate-50 focus:outline-none"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
