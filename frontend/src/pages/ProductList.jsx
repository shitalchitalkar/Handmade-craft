import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function ProductList() {
  const { id } = useParams(); // category name or undefined
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/products");
        let data = res.data || [];
        if (id) data = data.filter(p => p.category && (p.category.name === id || p.category._id === id));
        setProducts(data);
      } catch (err) { console.error(err); }
    };
    load();
  }, [id]);

  return (
    <div className="container mt-4">
      <h3>{id ? `Products — ${id}` : "All Products"}</h3>
      <div className="row">
        {products.map(p => (
          <div key={p._id} className="col-md-3 mb-3">
            <div className="card h-100 shadow-sm">
              {p.image && <img src={p.image} alt={p.name} className="card-img-top" style={{height:160,objectFit:'cover'}} />}
              <div className="card-body d-flex flex-column">
                <h6>{p.name}</h6>
                <p className="text-muted mb-2">₹{p.price}</p>
                <div className="mt-auto">
                  <button className="btn btn-sm btn-outline-primary" onClick={()=>{
                    // add to localStorage cart
                    const raw = localStorage.getItem("hc_cart");
                    const cart = raw ? JSON.parse(raw) : [];
                    cart.push({...p, qty:1});
                    localStorage.setItem("hc_cart", JSON.stringify(cart));
                    alert("Added to cart");
                  }}>Add to cart</button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {products.length === 0 && <div className="p-4 text-muted">No products found</div>}
      </div>
    </div>
  );
}