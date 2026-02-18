import { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import toast from "react-hot-toast";

function Auth() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (uid) navigate("/dashboard");

    // Initialize App Check (Captcha) - Note: Replace with actual reCAPTCHA site key
    try {
      initializeAppCheck(auth.app, {
        provider: new ReCaptchaV3Provider("YOUR_RECAPTCHA_SITE_KEY"),
        isTokenAutoRefreshEnabled: true,
      });
    } catch (error) {
      console.warn("App Check initialization failed:", error);
    }
  }, [navigate]);

  const validate = () => {
    if (!email.trim() || !password.trim()) return "All fields are required";
    if (!/\S+@\S+\.\S+/.test(email))
      return "Please enter a valid email address";
    if (password.length < 6)
      return "Password must be at least 6 characters long";
    return null;
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );

        if (!userCredential.user.emailVerified) {
          setError(
            "Please verify your email before logging in. Check your inbox for the verification link.",
          );
          setLoading(false);
          return;
        }

        localStorage.setItem("uid", userCredential.user.uid);
        window.dispatchEvent(new Event("authChange"));
        toast.success("Login successful");

        setTimeout(() => navigate("/dashboard"), 3000);
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );

        await sendEmailVerification(userCredential.user);
        navigate("/verify");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      switch (error.code) {
        case "auth/user-not-found":
          setError("No account found with this email address.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password. Please try again.");
          break;
        case "auth/email-already-in-use":
          setError("An account with this email already exists.");
          break;
        case "auth/weak-password":
          setError("Password is too weak. Please choose a stronger password.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address format.");
          break;
        case "auth/too-many-requests":
          setError("Too many failed attempts. Please try again later.");
          break;
        default:
          setError("Authentication failed. Please try again.");
      }
      toast.error(error.message || "Authentication failed. Please try again.");
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      localStorage.setItem("uid", result.user.uid);
      window.dispatchEvent(new Event("authChange"));

      toast.success("Login successful");

      setTimeout(() => navigate("/dashboard"), 3000);
    } catch (error) {
      console.error("Google sign-in error:", error);

      let message = "Google sign-in failed. Please try again.";

      switch (error.code) {
        case "auth/popup-closed-by-user":
          message = "Sign-in was cancelled.";
          break;
        case "auth/popup-blocked":
          message = "Popup was blocked. Allow popups and try again.";
          break;
        case "auth/account-exists-with-different-credential":
          message = "Account exists with different sign-in method.";
          break;
      }

      setError(message);
      toast.error(message);
    }

    setLoading(false);
  };

  const handleFacebookLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);

      localStorage.setItem("uid", result.user.uid);
      window.dispatchEvent(new Event("authChange"));

      toast.success("Login successful");

      setTimeout(() => navigate("/dashboard"), 3000);
    } catch (error) {
      console.error("Facebook sign-in error:", error);
      switch (error.code) {
        case "auth/popup-closed-by-user":
          setError("Sign-in was cancelled.");
          break;
        case "auth/popup-blocked":
          setError(
            "Popup was blocked by browser. Please allow popups and try again.",
          );
          break;
        case "auth/account-exists-with-different-credential":
          setError(
            "An account already exists with the same email address but different sign-in credentials.",
          );
          break;
        default:
          setError("Facebook sign-in failed. Please try again.");
      }
      toast.error(message);
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h3 className="auth-title">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h3>

        <form onSubmit={handleEmailAuth}>
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-lock"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button className="btn btn-primary w-100 mb-3" disabled={loading}>
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Processing...
              </>
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="or-divider">
          <span>OR</span>
        </div>

        <button
          className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 py-2 fw-semibold mb-3"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <i className="bi bi-google"></i>
          Continue with Google
        </button>

        <button
          className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2 py-2 fw-semibold"
          onClick={handleFacebookLogin}
          disabled={loading}
        >
          <i className="bi bi-facebook"></i>
          Continue with Facebook
        </button>

        <button
          className="btn btn-link w-100 mt-3"
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
            setEmail("");
            setPassword("");
          }}
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Sign In"}
        </button>

        {error && (
          <div className="alert alert-danger mt-3">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default Auth;
