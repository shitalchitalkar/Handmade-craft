import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register(){
  const [form,setForm] = useState({ name:'', email:'', password:'', role:'customer' });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/register", form);
      alert("Registered. Please login.");
      nav("/login");
    } catch (err) { alert(err.response?.data?.msg || err.response?.data?.message || "Register failed"); }
  };

  return (
    <div className="form-card">
      <div className="card p-4">
        <h4 className="mb-3 text-center">Register</h4>
        <form onSubmit={submit}>
          <input className="form-control mb-2" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
          <input className="form-control mb-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
          <input type="password" className="form-control mb-2" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
          <select className="form-select mb-3" value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
            <option value="customer">Customer</option>
            <option value="artisan">Artisan</option>
            <option value="admin">Admin</option>
          </select>
          <button className="btn btn-success w-100">Register</button>
        </form>
      </div>
    </div>
  );
}