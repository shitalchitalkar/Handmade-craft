import React, { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Cart(){
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  useEffect(()=> {
    const raw = localStorage.getItem("hc_cart");
    if (raw) setItems(JSON.parse(raw));
  },[]);

  useEffect(()=> localStorage.setItem("hc_cart", JSON.stringify(items)), [items]);

  const remove = (i)=> setItems(items.filter((_,idx)=>idx!==i));

  const placeOrders = async () => {
    if (!user || user.role !== "customer"){ alert("Login as customer"); return; }
    try {
      for (const it of items) {
        await api.post("/orders", { product: it._id, artisan: it.artisan?._id || it.artisan, quantity: it.qty || 1 });
      }
      alert("Orders placed");
      setItems([]);
      localStorage.removeItem("hc_cart");
    } catch (e) { console.error(e); alert("Order failed"); }
  };

  return (
    <div className="container mt-4">
      <h3>Your Cart</h3>
      {items.length===0 ? <p>No items</p> : (
        <>
          <ul className="list-group mb-3">
            {items.map((it,idx)=>(
              <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{it.name}</strong>
                  <div className="small">₹{it.price}</div>
                </div>
                <div>
                  <button className="btn btn-sm btn-danger" onClick={()=>remove(idx)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <button className="btn btn-primary" onClick={placeOrders}>Place Order</button>
        </>
      )}
    </div>
  );
}