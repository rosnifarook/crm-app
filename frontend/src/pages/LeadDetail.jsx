import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getLead,
  updateLead,
  deleteLead,
  getNotes,
  createNote,
} from "../api/api";
import StatusBadge from "../components/StatusBadge";
import LeadForm from "../components/LeadForm";
import ActivityTimeline from "../components/ActivityTimeline";

const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [addingNote, setAddingNote] = useState(false);

  const fetchLead = async () => {
    try {
      const [leadRes, notesRes] = await Promise.all([
        getLead(id),
        getNotes(id),
      ]);
      setLead(leadRes.data);
      setNotes(notesRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLead();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      await updateLead(id, formData);
      setEditing(false);
      fetchLead();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      await deleteLead(id);
      navigate("/leads");
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteContent.trim()) return;
    try {
      setAddingNote(true);
      await createNote(id, { content: noteContent });
      setNoteContent("");
      fetchLead();
    } catch (err) {
      console.error(err);
    } finally {
      setAddingNote(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading lead...</p>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Lead not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/leads")}
          className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold mb-4 flex items-center gap-1"
        >
          ← Back to Leads
        </button>

        {/* Lead Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{lead.name}</h1>
              <p className="text-gray-500 text-sm">{lead.company}</p>
              <div className="mt-2">
                <StatusBadge status={lead.status} />
                {lead.isStale && (
                  <span className="ml-2 text-xs text-red-500 font-semibold">
                    ⚠️ Stale Lead
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditing(!editing)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded transition"
              >
                {editing ? "Cancel" : "Edit"}
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded transition"
              >
                Delete
              </button>
            </div>
          </div>

          {/* Lead Info */}
          {!editing ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase">
                  Email
                </p>
                <p className="text-sm text-gray-700">{lead.email || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase">
                  Phone
                </p>
                <p className="text-sm text-gray-700">{lead.phone || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase">
                  Source
                </p>
                <p className="text-sm text-gray-700">{lead.source || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase">
                  Salesperson
                </p>
                <p className="text-sm text-gray-700">
                  {lead.salesperson || "—"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase">
                  Deal Value
                </p>
                <p className="text-sm text-gray-700 font-semibold">
                  ${lead.deal_value?.toLocaleString() || "0"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase">
                  Created
                </p>
                <p className="text-sm text-gray-700">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-6">
              <LeadForm
                initial={lead}
                onSubmit={handleUpdate}
                onCancel={() => setEditing(false)}
              />
            </div>
          )}
        </div>

        {/* Add Note */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Add a Note
          </h2>
          <form onSubmit={handleAddNote} className="flex gap-3">
            <input
              type="text"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Write a note about this lead..."
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={addingNote}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded transition disabled:opacity-50"
            >
              {addingNote ? "Adding..." : "Add Note"}
            </button>
          </form>
        </div>

        {/* Activity Timeline */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Activity Timeline
          </h2>
          <ActivityTimeline
            notes={notes}
            statusHistory={lead.statusHistory || []}
          />
        </div>
      </div>
    </div>
  );
};

export default LeadDetail;
