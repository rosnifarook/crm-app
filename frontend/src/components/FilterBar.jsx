import React from "react";

const FilterBar = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFilters({
      status: "",
      source: "",
      salesperson: "",
      search: "",
      sort: "",
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-wrap gap-3 items-end">
      {/* Search */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-600">Search</label>
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Name, company, email..."
          className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48"
        />
      </div>

      {/* Status */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-600">Status</label>
        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Proposal Sent">Proposal Sent</option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
        </select>
      </div>

      {/* Source */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-600">Source</label>
        <select
          name="source"
          value={filters.source}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Sources</option>
          <option value="Website">Website</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Referral">Referral</option>
          <option value="Cold Email">Cold Email</option>
          <option value="Event">Event</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Sort */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-600">Sort By</label>
        <select
          name="sort"
          value={filters.sort}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="deal_high">Deal Value (High)</option>
          <option value="deal_low">Deal Value (Low)</option>
        </select>
      </div>

      {/* Reset */}
      <button
        onClick={handleReset}
        className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold px-4 py-1.5 rounded transition"
      >
        Reset
      </button>
    </div>
  );
};

export default FilterBar;
