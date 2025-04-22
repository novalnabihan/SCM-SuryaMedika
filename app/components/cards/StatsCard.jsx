export default function StatsCard({ title, value }) {
    return (
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className="text-2xl font-semibold text-blue-600">{value}</p>
      </div>
    );
  }
  