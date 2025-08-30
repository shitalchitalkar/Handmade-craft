import React, { useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Products() {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({ name:"", price:0, stock:1, category:"", image:"" });
  const [products, setProducts] = useState([]);

  const load = async () => {
    try { const res = await api.get("/products"); setProducts(res.data || []); } catch(e){console.error(e);}
  };
  useEffect(()=>{ load(); }, []);

  const fileToBase64 = (file) => new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result);
    reader.onerror = (err) => rej(err);
    reader.readAsDataURL(file);
  });

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const b64 = await fileToBase64(file);
    setForm({...form, image: b64});
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!user || user.role !== "artisan") { alert("Only artisans can add products"); return; }
    try {
      await api.post("/products", {...form, artisan: user._id || user.id});
      alert("Product added (pending admin approval)");
      setForm({ name:"", price:0, stock:1, category:"", image:"" });
      load();
    } catch(err){ console.error(err); alert(err.response?.data?.message || "Add failed"); }
  };

  return (
    <div className="container mt-4">
      <h3>Manage Products</h3>
      {user?.role === "artisan" && (
        <div className="card p-3 mb-3">
          <form onSubmit={submit} className="row g-2">
            <div className="col-md-4"><input className="form-control" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/></div>
            <div className="col-md-2"><input className="form-control" type="number" placeholder="Price" value={form.price} onChange={e=>setForm({...form,price:Number(e.target.value)})} required/></div>
            <div className="col-md-2"><input className="form-control" type="number" placeholder="Stock" value={form.stock} onChange={e=>setForm({...form,stock:Number(e.target.value)})} /></div>
            <div className="col-md-2"><input className="form-control" placeholder="Category name" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} /></div>
            <div className="col-md-2"><input type="file" accept="image/*" className="form-control" onChange={handleFile} /></div>
            <div className="col-12"><button className="btn btn-success">Add Product</button></div>
          </form>
        </div>
      )}

      <div className="row">
        {products.map(p=>(
          <div key={p._id} className="col-md-3 mb-3">
            <div className="card h-100">
              {p.image && <img src={p.image} className="card-img-top" style={{height:140,objectFit:'cover'}} alt={p.name} />}
              <div className="card-body">
                <h6>{p.name}</h6>
                <div className="small text-muted">Status: {p.isApproved ? "Approved":"Pending"}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}