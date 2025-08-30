import { Link } from "react-router-dom";
import hand5 from "../assets/hand5.jpeg";
import hand2 from "../assets/hand2.jpeg";
import hand3 from "../assets/hand3.jpg";

export default function Home() {
  return (
    <div>
      <div className="container mt-4">
        <div className="row g-3">
          <div className="col-md-4">
            <div className="card shadow-sm">
              <img src={hand5} className="card-img-top header-hero" alt="Hand1" />
              <div className="card-body"><h5>Handmade Jewelry</h5></div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm">
              <img src={hand2} className="card-img-top header-hero" alt="Hand2" />
              <div className="card-body"><h5>Wooden Decor</h5></div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm">
              <img src={hand3} className="card-img-top header-hero" alt="Hand3" />
              <div className="card-body"><h5>Textile Art</h5></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-4 text-center">
        <input className="form-control w-50 mx-auto" placeholder="Search handmade products..." />
      </div>

      <div className="container my-5 text-center">
        <h3>About HandmadeCraft</h3>
        <p className="text-muted">HandmadeCraft connects artisans and customers. Discover unique items and support local creators.</p>
      </div>
    </div>
  );
}