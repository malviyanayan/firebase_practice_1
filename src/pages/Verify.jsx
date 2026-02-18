import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Verify() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Checking verification...");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const checkVerification = async () => {
      try {
        await auth.currentUser?.reload();

        if (auth.currentUser?.emailVerified) {
          setIsVerified(true);
          setMessage("Email verified successfully! Redirecting to dashboard...");
          localStorage.setItem("uid", auth.currentUser.uid);
          window.dispatchEvent(new Event('authChange'));
          setTimeout(() => navigate("/dashboard"), 3000);
        } else {
          setMessage("Please check your email and click the verification link. You may need to check your spam folder.");
        }
      } catch (error) {
        console.error("Verification check failed:", error);
        setMessage("Failed to check verification status. Please try logging in again.");
      }
    };

    checkVerification();

    // Check periodically
    const interval = setInterval(checkVerification, 5000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="auth-container">
      <div className="auth-card text-center">
        <h3 className="auth-title">Email Verification</h3>
        <div className={`alert ${isVerified ? 'alert-success' : 'alert-info'} mt-4`}>
          <i className={`bi ${isVerified ? 'bi-check-circle-fill' : 'bi-envelope'} me-2`}></i>
          {message}
        </div>
        {!isVerified && (
          <div className="mt-4">
            <p className="text-muted">Didn't receive the email? Check your spam folder or try registering again.</p>
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/auth")}
            >
              Back to Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Verify;
