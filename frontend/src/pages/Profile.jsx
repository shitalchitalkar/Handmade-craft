import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(()=> {
    const load = async () => {
      if (!user) return;
      try {
        if (user.role === "customer") {
          const res = await api.get("/orders/customer");
          setOrders(res.data);
        } else if (user.role === "artisan") {
          const res = await api.get("/orders/artisan");
          setOrders(res.data);
        } else if (user.role === "admin") {
          const res = await api.get("/orders/admin");
          setOrders(res.data);
        }
      } catch(e){ console.error(e); }
    };
    load();
  }, [user]);

  if (!user) return <div className="container mt-4">Please login</div>;

  return (
    <div className="container mt-4">
      <h3>{user.name}</h3>
      <p className="text-muted">Role: {user.role}</p>
      <p className="text-muted">Email: {user.email}</p>

      {user.role === 'artisan' && <Link className="btn btn-warning me-2" to="/myproducts">Add Products</Link>}
      {user.role === 'customer' && <Link className="btn btn-primary" to="/cart">My Cart</Link>}

      <hr />
      <h5>Your Orders</h5>
      {orders.length === 0 ? <p className="text-muted">No orders</p> : (
        <ul className="list-group">
          {orders.map(o => (
            <li key={o._id} className="list-group-item">
              <strong>{o.product?.name}</strong> • Qty: {o.quantity} • ₹{o.totalPrice} • Status: {o.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}