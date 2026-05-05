import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLeads } from "../api/api";
import { useAuth } from "../context/AuthContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await getLeads();
        setLeads(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  // Stats
  const totalLeads = leads.length;
  const wonLeads = leads.filter((l) => l.status === "Won").length;
  const staleLeads = leads.filter((l) => l.isStale).length;
  const totalRevenue = leads
    .filter((l) => l.status === "Won")
    .reduce((sum, l) => sum + (l.deal_value || 0), 0);

  // Chart data — leads by status
  const statuses = [
    "New",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Won",
    "Lost",
  ];
  const chartData = statuses.map((status) => ({
    status,
    count: leads.filter((l) => l.status === status).length,
  }));

  // Stale leads list
  const staleLeadsList = leads.filter((l) => l.isStale);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome back, {user?.email}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-500">Total Leads</p>
            <p className="text-3xl font-bold text-indigo-600">{totalLeads}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-500">Won Deals</p>
            <p className="text-3xl font-bold text-green-600">{wonLeads}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-3xl font-bold text-blue-600">
              ${totalRevenue.toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-500">Stale Leads</p>
            <p className="text-3xl font-bold text-red-500">{staleLeads}</p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Leads by Status
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stale Leads */}
        {staleLeadsList.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              ⚠️ Stale Leads (No activity in 7+ days)
            </h2>
            <div className="flex flex-col gap-3">
              {staleLeadsList.map((lead) => (
                <div
                  key={lead._id}
                  onClick={() => navigate(`/leads/${lead._id}`)}
                  className="flex items-center justify-between p-3 bg-red-50 border border-red-100 rounded-lg cursor-pointer hover:bg-red-100 transition"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{lead.name}</p>
                    <p className="text-sm text-gray-500">{lead.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-red-500">
                      {lead.status}
                    </p>
                    <p className="text-sm text-gray-500">
                      ${lead.deal_value?.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
