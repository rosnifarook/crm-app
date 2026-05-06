import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLeads, createLead, deleteLead } from "../api/api";
import FilterBar from "../components/FilterBar";
import StatusBadge from "../components/StatusBadge";
import LeadForm from "../components/LeadForm";

const Leads = () => {
  const [salespersons, setSalespersons] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    source: "",
    salesperson: "",
    search: "",
    sort: "",
  });
  const navigate = useNavigate();

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.source) params.source = filters.source;
      if (filters.salesperson) params.salesperson = filters.salesperson;
      if (filters.search) params.search = filters.search;
      if (filters.sort) params.sort = filters.sort;
      const res = await getLeads(params);
      setLeads(res.data);

      // Extract unique salespersons from ALL leads
      const allRes = await getLeads({});
      const unique = [
        ...new Set(allRes.data.map((lead) => lead.salesperson).filter(Boolean)),
      ];
      setSalespersons(unique);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleCreate = async (formData) => {
    try {
      await createLead(formData);
      setShowForm(false);
      fetchLeads();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      await deleteLead(id);
      fetchLeads();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Leads</h1>
            <p className="text-gray-500 text-sm">{leads.length} leads found</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded transition"
          >
            {showForm ? "Cancel" : "+ Add Lead"}
          </button>
        </div>

        {/* Add Lead Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              New Lead
            </h2>
            <LeadForm
              onSubmit={handleCreate}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        {/* Filter Bar */}
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          salespersons={salespersons}
        />

        {/* Leads Table */}
        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Loading leads...
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            No leads found. Add your first lead!
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-600 font-semibold">
                    Name
                  </th>
                  <th className="text-left px-4 py-3 text-gray-600 font-semibold">
                    Company
                  </th>
                  <th className="text-left px-4 py-3 text-gray-600 font-semibold">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 text-gray-600 font-semibold">
                    Source
                  </th>
                  <th className="text-left px-4 py-3 text-gray-600 font-semibold">
                    Salesperson
                  </th>
                  <th className="text-left px-4 py-3 text-gray-600 font-semibold">
                    Deal Value
                  </th>
                  <th className="text-left px-4 py-3 text-gray-600 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, index) => (
                  <tr
                    key={lead._id}
                    onClick={() => navigate(`/leads/${lead._id}`)}
                    className={`cursor-pointer hover:bg-indigo-50 transition border-b border-gray-100
                      ${lead.isStale ? "bg-red-50" : index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    `}
                  >
                    <td className="px-4 py-3 font-semibold text-gray-800">
                      {lead.name}
                      {lead.isStale && (
                        <span className="ml-2 text-xs text-red-500">
                          ⚠️ Stale
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {lead.company || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {lead.source || "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {lead.salesperson || "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      ${lead.deal_value?.toLocaleString() || "0"}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={(e) => handleDelete(e, lead._id)}
                        className="text-red-500 hover:text-red-700 font-semibold text-xs transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leads;
