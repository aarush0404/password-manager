import React, { useState } from "react";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "/dashboard";
      } else {
        alert(data.message);
      }

    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-100 to-gray-200">

      <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-80">

        {/* Project Name */}
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-1">
          🔐 Pass Saver
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Secure your passwords in one place
        </p>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-6 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition"
        >
          Login
        </button>

      </div>
    </div>
  );
};

export default Login;