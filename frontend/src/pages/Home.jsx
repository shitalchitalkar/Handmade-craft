import React from "react";
import { useAuth } from "../context/AuthContext";
import img1 from "../assets/img1.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import "./Home.css";
import { Link } from "react-router-dom";
//import img6 from "../assets/img6.jpg";

// Sample images - replace with your own if you have
const sampleImages = [img1, img3, img4,];

const Home = () => {
  
  const { user } = useAuth();

  return (
   
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <div className="hero-section">

      {/* ---------------- Welcome Section ---------------- */}
      <section style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.5rem", color: "#333" }}>
          Welcome to HandmadeCraft
        </h1>

        {/* Show logged-in user info */}
        {!user && (
          <div style={{marginTop: "20px"}}>
            <Link to="/login" style={{marginRight:"15px"}}>Login</Link>

            <Link to="/register">register</Link>
          </div>
          

         
        )}

        {/* Short introduction */}
        <p style={{ fontSize: "1.1rem", color: "#666", maxWidth: "600px", margin: "10px auto" }}>
          Explore beautiful handicrafts created by talented artisans. Discover unique handmade products that tell a story of tradition and creativity.
        </p>
      </section>

      {/* ---------------- Gallery Section ---------------- */}
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px"
        }}
      >
        {/* Loop over sampleImages array to show each image */}
        {sampleImages.map((img, index) => (
          <div
            key={index}
            style={{
              width: "250px",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              textAlign: "center"
            }}
          >
            {/* Image */}
            <img
              src={img}
              alt={`Handcraft ${index + 1}`} // <- fixed template literal
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />

            {/* Image caption */}
            <div style={{ padding: "10px", background: "#f8f8f8" }}>
              <h3 style={{ fontSize: "1.1rem", color: "#333" }}>
                Handcraft {index + 1}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#666" }}>
                Unique handmade product with love and care.
              </p>
            </div>
          </div>
        ))}
      </section>
      </div>
    </div>
  );
};

export default Home;