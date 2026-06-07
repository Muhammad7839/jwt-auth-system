// Purpose: provide register and login forms that call the backend API.

import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function AuthForms({ onLogin }) {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function resetFeedback() {
    setMessage("");
    setError("");
  }

  function switchTab(tabName) {
    setActiveTab(tabName);
    setEmail("");
    setPassword("");
    resetFeedback();
  }

  async function submitForm(event) {
    event.preventDefault();
    resetFeedback();
    setIsSubmitting(true);

    const endpoint = activeTab === "register" ? "/api/auth/register" : "/api/auth/login";

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication request failed.");
      }

      if (activeTab === "register") {
        setMessage("Registration successful. You can now log in.");
        setActiveTab("login");
        setPassword("");
        return;
      }

      onLogin(data.token);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="form-panel">
      <div className="tab-row" role="tablist" aria-label="Authentication options">
        <button
          className={activeTab === "login" ? "tab-button active" : "tab-button"}
          type="button"
          role="tab"
          aria-selected={activeTab === "login"}
          onClick={() => switchTab("login")}
        >
          Login
        </button>
        <button
          className={activeTab === "register" ? "tab-button active" : "tab-button"}
          type="button"
          role="tab"
          aria-selected={activeTab === "register"}
          onClick={() => switchTab("register")}
        >
          Register
        </button>
      </div>

      <form className="auth-form" onSubmit={submitForm}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          required
        />

        <button className="primary-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Please wait..." : activeTab === "register" ? "Create Account" : "Login"}
        </button>
      </form>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default AuthForms;

