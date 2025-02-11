import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlaneDeparture } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios"; // Import axios

export default function Login() {
  const [username, setUsername] = useState(""); // Updated from email to username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigation

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      // Replace fetch with axios
      const response = await axios.post("http://localhost:5000/api/users/login", {
        username, // Send username and password in the request
        password,
      });

      // Assuming the API response structure is { message, ... }
      if (response.status !== 200) {
        throw new Error(response.data.message || "Login failed");
      }

      alert("Login Success");
      console.log("Login successful:", response.data);
      navigate("/admin/success"); // Redirect after success
    } catch (err) {
      setError(err.response?.data?.message || err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-2xl shadow-xl w-96">
        <div className="flex flex-col items-center">
          <FaPlaneDeparture className="text-4xl text-blue-500 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Flight Details Login</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <input
            type="text" // Changed to text for username
            placeholder="Username"
            className="mb-3 p-2 w-full border rounded-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Corrected to setUsername
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-4 p-2 w-full border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
