import React, { useState } from "react";

const LeadForm = ({ initial = {}, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    name: initial.name || "",
    company: initial.company || "",
    email: initial.email || "",
    phone: initial.phone || "",
    source: initial.source || "",
    salesperson: initial.salesperson || "",
    status: initial.status || "New",
    deal_value: initial.deal_value || 0,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="John Doe"
          required
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Company */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Company
        </label>
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Acme Corp"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="john@acme.com"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Phone
        </label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+1 234 567 8900"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Source */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Source
        </label>
        <select
          name="source"
          value={form.source}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Source</option>
          <option value="Website">Website</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Referral">Referral</option>
          <option value="Cold Email">Cold Email</option>
          <option value="Event">Event</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Salesperson */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Salesperson
        </label>
        <input
          type="text"
          name="salesperson"
          value={form.salesperson}
          onChange={handleChange}
          placeholder="Jane Smith"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Status
        </label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Proposal Sent">Proposal Sent</option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
        </select>
      </div>

      {/* Deal Value */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Deal Value ($)
        </label>
        <input
          type="number"
          name="deal_value"
          value={form.deal_value}
          onChange={handleChange}
          placeholder="0"
          min="0"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex gap-3 mt-2">
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded transition"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-2 rounded transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default LeadForm;
