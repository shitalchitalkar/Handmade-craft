import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import UserForm from "./components/UserForm";

function App() {}
  const [products, setProducts] = useState([]);  //  setProducts defined

  useEffect(() => {
    //  api calling
    axios.get("http://localhost:5000/api/products")//backend route path
      .then((res) => {
        setProducts(res.data);   //  setProducts use
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  function App() {
  const [users, setUsers] = useState([]);  //  setProducts defined

  useEffect(() => {
    //  api calling
    axios.get("http://localhost:5000/api/products")//backend route path
      .then((res) => {
        setUsers(res.data);   //  setProducts use
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);


  return (
    <div>
      <Navbar/>
      <UserForm/>
      <h1>Products List</h1>
      <ul>
        {products.map((p) => (
          <li key={p._id}>{p.name} - {p.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;