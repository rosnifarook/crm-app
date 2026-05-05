import React from "react";

const statusStyles = {
  New: "bg-blue-100 text-blue-700",
  Contacted: "bg-yellow-100 text-yellow-700",
  Qualified: "bg-purple-100 text-purple-700",
  "Proposal Sent": "bg-orange-100 text-orange-700",
  Won: "bg-green-100 text-green-700",
  Lost: "bg-red-100 text-red-700",
};

const StatusBadge = ({ status }) => {
  const style = statusStyles[status] || "bg-gray-100 text-gray-700";

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${style}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
