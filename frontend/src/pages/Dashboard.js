import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalStock: 1200,
    borrowed: 230,
    movements: 500,
  });

  const [movements, setMovements] = useState([
    {
      id: 1,
      title: "The techies",
      borrower: "John Doe",
      borrowedOn: "2025-08-01",
      returnedOn: "2025-08-10",
      status: "Returned",
    },
    {
      id: 2,
      title: "Happy moments",
      borrower: "Jane Smith",
      borrowedOn: "2025-08-05",
      returnedOn: "-",
      status: "Borrowed",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Header */}
      <header className="bg-green-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Welcome to the Admin Dashboard</h1>
        <button className="bg-white text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100">
          Logout
        </button>
      </header>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-600">Total Stock</h2>
          <p className="text-3xl font-bold text-green-700">
            {stats.totalStock}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-600">
            Borrowed Books
          </h2>
          <p className="text-3xl font-bold text-green-700">{stats.borrowed}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-600">
            Book Movements
          </h2>
          <p className="text-3xl font-bold text-green-700">{stats.movements}</p>
        </div>
      </section>

      {/* Movement History Table */}
      <section className="p-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Book Movement History
        </h2>
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-green-100">
              <tr>
                <th className="px-6 py-3 border-b text-left text-gray-700 font-semibold">
                  Book Title
                </th>
                <th className="px-6 py-3 border-b text-left text-gray-700 font-semibold">
                  Borrower
                </th>
                <th className="px-6 py-3 border-b text-left text-gray-700 font-semibold">
                  Borrowed On
                </th>
                <th className="px-6 py-3 border-b text-left text-gray-700 font-semibold">
                  Returned On
                </th>
                <th className="px-6 py-3 border-b text-left text-gray-700 font-semibold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {movements.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 border-b">{m.title}</td>
                  <td className="px-6 py-3 border-b">{m.borrower}</td>
                  <td className="px-6 py-3 border-b">{m.borrowedOn}</td>
                  <td className="px-6 py-3 border-b">{m.returnedOn}</td>
                  <td
                    className={`px-6 py-3 border-b font-semibold ${
                      m.status === "Returned"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {m.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
