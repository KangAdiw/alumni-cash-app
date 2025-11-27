import React from "react";
import Card from "../ui/Card"; // Kita pakai Card yang baru dibuat

const StatCard = ({ title, value, icon: Icon, color = "blue", trend }) => {
  // Mapping warna background icon
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <Card className="p-6 transition-transform hover:-translate-y-1 duration-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-2 text-gray-900">{value}</h3>

          {/* Menampilkan Trend (opsional) */}
          {trend && <p className={`text-sm mt-1 ${trend.includes("+") ? "text-green-600" : "text-red-600"}`}>{trend}</p>}
        </div>

        {/* Icon di pojok kanan */}
        <div className={`p-3 rounded-lg ${colorClasses[color] || colorClasses.blue}`}>
          <Icon size={24} />
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
