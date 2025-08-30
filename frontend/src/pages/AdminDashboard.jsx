import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminDashboard(){
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(()=>{
    api.get("/users").then(r=>setUsers(r.data)).catch(()=>{});
    api.get("/products").then(r=>setProducts(r.data)).catch(()=>{});
    api.get("/orders/admin").then(r=>setOrders(r.data)).catch(()=>{});
  },[]);

  const approveArtisan = async (id) => {
    try { await api.put(`/admin/approve/artisan/${id}`); alert("Approved"); } catch(e){ alert("Fail"); }
  };
  const approveProduct = async (id) => {
    try { await api.put(`/admin/approve/product/${id}`); setProducts(p => p.map(x => x._id===id?{...x,isApproved:true}:x)); } catch(e){ alert("Fail"); }
  };

  return (
    <div className="container mt-4">
      <h3>Admin Dashboard</h3>

      <h5 className="mt-3">Users</h5>
      <div className="row">
        {users.map(u => (
          <div key={u._id} className="col-md-3 mb-2">
            <div className="card p-2">
              <strong>{u.name}</strong>
              <div className="small text-muted">{u.role}</div>
              {u.role === 'artisan' && !u.isApproved && <button className="btn btn-sm btn-success mt-2" onClick={()=>approveArtisan(u._id)}>Approve</button>}
            </div>
          </div>
        ))}
      </div>

      <h5 className="mt-3">Products</h5>
      <div className="row">
        {products.map(p => (
          <div key={p._id} className="col-md-3 mb-2">
            <div className="card p-2">
              <strong>{p.name}</strong>
              <div className="small text-muted">By: {p.artisan?.name || '—'}</div>
              <div className="small">Status: {p.isApproved ? "Approved":"Pending"}</div>
              {!p.isApproved && <button className="btn btn-sm btn-primary mt-2" onClick={()=>approveProduct(p._id)}>Approve Product</button>}
            </div>
          </div>
        ))}
      </div>

      <h5 className="mt-3">Orders</h5>
      <div className="list-group">
        {orders.map(o => (
          <div key={o._id} className="list-group-item">
            <strong>{o.product?.name}</strong> • Customer: {o.customer?.name} • Status: {o.status}
          </div>
        ))}
      </div>
    </div>
  );
}