import React from "react";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ActivityTimeline = ({ notes, statusHistory }) => {
  // Combine notes and status changes into one timeline
  const events = [
    ...notes.map((note) => ({
      type: "note",
      content: note.content,
      createdBy: note.created_by,
      date: note.createdAt,
    })),
    ...statusHistory.map((s) => ({
      type: "status",
      from: s.from,
      to: s.to,
      date: s.changedAt,
    })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date)); // newest first

  if (events.length === 0) {
    return (
      <p className="text-gray-400 text-sm mt-4">
        No activity yet. Add a note or update the status.
      </p>
    );
  }

  return (
    <div className="mt-4 flex flex-col gap-4">
      {events.map((event, index) => (
        <div key={index} className="flex gap-3">
          {/* Icon */}
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                event.type === "note" ? "bg-indigo-500" : "bg-green-500"
              }`}
            >
              {event.type === "note" ? "📝" : "🔄"}
            </div>
            {index !== events.length - 1 && (
              <div className="w-0.5 bg-gray-200 flex-1 mt-1" />
            )}
          </div>

          {/* Content */}
          <div className="bg-gray-50 rounded-lg p-3 flex-1 mb-2">
            {event.type === "note" ? (
              <>
                <p className="text-sm text-gray-800">{event.content}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Added by {event.createdBy} · {formatDate(event.date)}
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-800">
                  Status changed:{" "}
                  <span className="font-semibold text-red-500">
                    {event.from}
                  </span>
                  {" → "}
                  <span className="font-semibold text-green-500">
                    {event.to}
                  </span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {formatDate(event.date)}
                </p>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityTimeline;
