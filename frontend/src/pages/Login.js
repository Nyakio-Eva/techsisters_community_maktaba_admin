import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Just a placeholder for design for demo purposes only
    alert(`Username: ${username}\nPassword: ${password}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-200">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-96">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-green-700">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition"
              required
            />
          </div>

          <p className="text-xs text-red-500 text-center">
            Only admins can access
          </p>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold text-lg hover:bg-green-600 shadow-lg transition transform hover:scale-105"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          &copy; 2025 Admin dashboard. All rights reserved.
        </p>
      </div>
    </div>
  );
}
