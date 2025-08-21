import React, { useState } from "react";
import axios from "axios";

function UserForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer"   // default value
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/users", formData);
      console.log("User created:", res.data);
      alert("User created successfully!");
      setFormData({ name: "", email: "", password: "", role: "customer" });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error creating user");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Enter name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Enter email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Enter password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
      >
        <option value="customer">Customer</option>
        <option value="artisan">Artisan</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Add User</button>
    </form>
  );
}

export default UserForm;