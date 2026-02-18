import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const uid = localStorage.getItem("uid");
      setIsLoggedIn(!!uid);
    };

    checkAuth();

    window.addEventListener('authChange', checkAuth);

    return () => {
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("uid");
      setIsLoggedIn(false);
      window.dispatchEvent(new Event('authChange'));
      navigate("/");
    } catch (error) {
      console.log("Logout failed");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-bold fs-4" to="/" style={{ color: '#fff' }}>
          <i className="bi bi-fire me-2"></i>FirebaseApp
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ color: '#fff', transition: 'color 0.3s' }}>
                <i className="bi bi-house me-1"></i>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/todos" style={{ color: '#fff', transition: 'color 0.3s' }}>
                <i className="bi bi-list-check me-1"></i>Todos
              </Link>
            </li>

            {!isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/auth" style={{ color: '#fff', transition: 'color 0.3s' }}>
                  <i className="bi bi-box-arrow-in-right me-1"></i>Login / Register
                </Link>
              </li>
            )}

            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard" style={{ color: '#fff', transition: 'color 0.3s' }}>
                    <i className="bi bi-speedometer2 me-1"></i>Dashboard
                  </Link>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-outline-light btn-sm ms-2 logout-btn"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-1"></i>Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
