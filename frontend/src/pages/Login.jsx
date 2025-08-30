import React, { useContext, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const { setUser, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form,setForm] = useState({ email:'', password:'' });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", form);
      const { token, role, user } = res.data;
      login(token, user || { role });
      if (user) setUser(user);
      // If backend didn't return full user, call /me
      if (!user) {
        const me = await api.get("/me");
        setUser(me.data.user || me.data);
      }
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || err.response?.data?.message  || "Login failed");
    }
  };

  return (
    <div className="form-card">
      <div className="card p-4">
        <h4 className="mb-3 text-center">Login</h4>
        <form onSubmit={submit}>
          <input className="form-control mb-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
          <input type="password" className="form-control mb-3" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
          <button className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}