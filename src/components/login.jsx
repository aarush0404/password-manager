import React, { useState } from "react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password || (!isLogin && !form.username)) {
      alert("Fill all fields");
      return;
    }

    const url = isLogin
      ? "http://localhost:5000/login"
      : "http://localhost:5000/register";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        if (isLogin) {
          localStorage.setItem("token", data.token);
          window.location.href = "/dashboard";
        } else {
          alert("Registered successfully! Now login.");
          setIsLogin(true);
        }
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

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-1">
          🔐 Pass Saver
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          {isLogin ? "Login to your account" : "Create a new account"}
        </p>

        {/* Username (only for register) */}
        {!isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded-lg"
          />
        )}

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded-lg"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-5 p-2 border rounded-lg"
        />

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        {/* Toggle */}
        <p className="text-center mt-4 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-600 cursor-pointer ml-1 font-medium"
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>

      </div>
    </div>
  );
};

export default Auth;