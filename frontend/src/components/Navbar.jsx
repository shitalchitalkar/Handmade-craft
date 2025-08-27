import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: "10px", background: "#333", color: "#fff" }}>
      <Link to="/" style={{ color: "#fff", marginRight: "10px" }}>Home</Link>
      {!user && <Link to="/login" style={{ color: "#fff", marginRight: "10px" }}>Login</Link>}
      {user && user.role === "admin" && <Link to="/admin" style={{ color: "#fff", marginRight: "10px" }}>Admin</Link>}
      {user && user.role === "customer" && <Link to="/customer" style={{ color: "#fff", marginRight: "10px" }}>Customer</Link>}
      {user && user.role === "artisan" && <Link to="/artisan" style={{ color: "#fff", marginRight: "10px" }}>Artisan</Link>}
      {user && <button onClick={logout} style={{ marginLeft: "10px" }}>Logout</button>}
    </nav>
  );
};

export default Navbar;