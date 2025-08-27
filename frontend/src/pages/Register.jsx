import React, { useState } from "react";
import api from "../api/axios";  // correct import

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", // default
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);   // send correct data
      alert("Registration successful");
    } catch (err) {
      console.error("Register error:", err.response ? err.response.data : err.message);
      alert(err.response?.data?.msg || err.message || "Error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <select name="role" onChange={handleChange}>
        <option value="customer">Customer</option>
        <option value="artisan">Artisan</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;