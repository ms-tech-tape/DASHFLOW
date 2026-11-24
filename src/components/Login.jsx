import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Frontend demo login only
    onLogin();
  }

  return (
    <div className="login-page">
      <div className="login-container">

        <div className="login-brand">
          <div className="login-logo">D</div>
          <h1>DashFlow</h1>
        </div>

        <div className="login-heading">
          <h2>Welcome back!</h2>
          <p>Sign in to continue to your dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">

          <div className="login-field">
            <label htmlFor="login-email">Email address</label>

            <input
              id="login-email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login-field">
            <label htmlFor="login-password">Password</label>

            <div className="password-wrapper">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="login-options">
            <label className="remember-label">
              <input type="checkbox" />
              Remember me
            </label>

            <button
              type="button"
              className="forgot-password"
              onClick={() =>
                alert("Password reset will be available with backend authentication.")
              }
            >
              Forgot password?
            </button>
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-submit">
            Sign In
          </button>

        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{" "}
            <span>Contact your administrator</span>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;