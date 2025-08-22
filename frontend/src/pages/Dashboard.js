import { useState } from "react";
import { FaBook, FaUsers, FaExchangeAlt } from "react-icons/fa";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalStock: 1200,
    borrowed: 230,
    movements: 500,
  });

  const [movements, setMovements] = useState([
    {
      id: 1,
      title: "The Techies",
      borrower: "John Doe",
      borrowedOn: "2025-08-01",
      returnedOn: "2025-08-10",
      status: "Returned",
    },
    {
      id: 2,
      title: "Happy Moments",
      borrower: "Jane Smith",
      borrowedOn: "2025-08-05",
      returnedOn: "-",
      status: "Borrowed",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-5 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
          Logout
        </button>
      </header>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center space-x-4 hover:shadow-2xl transition">
          <FaBook className="text-green-600 text-4xl" />
          <div>
            <h2 className="text-gray-500 font-semibold">Total Stock</h2>
            <p className="text-3xl font-bold text-green-700">
              {stats.totalStock}
            </p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center space-x-4 hover:shadow-2xl transition">
          <FaUsers className="text-blue-600 text-4xl" />
          <div>
            <h2 className="text-gray-500 font-semibold">Borrowed Books</h2>
            <p className="text-3xl font-bold text-blue-600">{stats.borrowed}</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center space-x-4 hover:shadow-2xl transition">
          <FaExchangeAlt className="text-purple-600 text-4xl" />
          <div>
            <h2 className="text-gray-500 font-semibold">Book Movements</h2>
            <p className="text-3xl font-bold text-purple-600">
              {stats.movements}
            </p>
          </div>
        </div>
      </section>

      {/* Movement History Table */}
      <section className="p-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Book Movement History
        </h2>
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
          <table className="min-w-full border-collapse">
            <thead className="bg-green-100">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Book Title
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Borrower
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Borrowed On
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Returned On
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {movements.map((m, idx) => (
                <tr
                  key={m.id}
                  className={`hover:bg-gray-50 transition ${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-6 py-3">{m.title}</td>
                  <td className="px-6 py-3">{m.borrower}</td>
                  <td className="px-6 py-3">{m.borrowedOn}</td>
                  <td className="px-6 py-3">{m.returnedOn}</td>
                  <td
                    className={`px-6 py-3 font-semibold ${
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
