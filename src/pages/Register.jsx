import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!email.includes("@")) {
      setNotification({ message: "Invalid email address.", type: "error" });
      return false;
    }
    if (username.length < 3) {
      setNotification({
        message: "Username must be at least 3 characters.",
        type: "error",
      });
      return false;
    }
    if (password.length < 6) {
      setNotification({
        message: "Password must be at least 6 characters.",
        type: "error",
      });
      return false;
    }
    return true;
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        { email, username, password }
      );

      setNotification({ message: response.data.message, type: "success" });

      // Redirect to login page on success
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error(error);
      setNotification({ message: "Error registering user.", type: "error" });
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://cdn-icons-png.flaticon.com/128/1721/1721527.png"
          alt="Recipe Book"
        />
        <h2 className="mt-10 text-center text-2xl font-bold text-gray-900">
          Register to "santhru Recipe Note"
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              required
              className="mt-2 block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Username
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              required
              className="mt-2 block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              required
              className="mt-2 block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600"
          >
            Register
          </button>
        </form>

        {notification.message && (
          <div
            className={`mt-4 text-center px-4 py-1 rounded ${
              notification.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {notification.message}
          </div>
        )}

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a user?{" "}
          <Link
            to="/login"
            className="font-semibold text-green-600 hover:text-green-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
