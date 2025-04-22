const dummyData = [
    { id: 1, nama: "Paracetamol", kategori: "Obat", tanggal: "2025-04-10" },
    { id: 2, nama: "Vitamin C", kategori: "Suplemen", tanggal: "2025-04-09" },
    { id: 3, nama: "Hand Sanitizer", kategori: "Alat", tanggal: "2025-04-08" },
  ];
  
  export default function BarangBaruTable() {
    return (
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-sm text-gray-500 mb-2">Barang Terbaru</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="text-green-500">Nama</th>
              <th>Kategori</th>
              <th>Tanggal Masuk</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td>{item.nama}</td>
                <td>{item.kategori}</td>
                <td>{item.tanggal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  