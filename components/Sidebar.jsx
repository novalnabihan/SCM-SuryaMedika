const Sidebar = () => {
    return (
      <aside className="w-64 bg-cyan-950 shadow-md p-4 h-screen">
        <h2 className="text-xl font-bold mb-4">Menu</h2>
        <ul className="space-y-2">
          <li>
            <a href="#" className="block p-2 rounded hover:bg-gray-200">Dashboard</a>
          </li>
          <li>
            <a href="#" className="block p-2 rounded hover:bg-gray-200">Transaksi</a>
          </li>
          <li>
            <a href="#" className="block p-2 rounded hover:bg-gray-200">Gudang</a>
          </li>
        </ul>
      </aside>
    );
  };
  
  export default Sidebar;
  