export default function DummyChart({ title }) {
    return (
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-sm text-gray-500 mb-2">{title}</h3>
        <div className="h-40 bg-gray-100 flex items-center justify-center text-gray-400">
          Grafik Dummy
        </div>
      </div>
    );
  }
  