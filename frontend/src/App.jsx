// Purpose: keep the login token in React state and choose which screen to show.

import { useState } from "react";
import AuthForms from "./components/AuthForms.jsx";
import Dashboard from "./components/Dashboard.jsx";

function App() {
  // Reading localStorage once keeps the user logged in after a page refresh.
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  function handleLogin(newToken) {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <main className="app-shell">
      <section className="auth-card" aria-label="JWT authentication demo">
        <div className="app-header">
          <h1>JWT Authentication System</h1>
          <p>Register, log in, and access a protected route with a JSON Web Token.</p>
        </div>

        {token ? (
          <Dashboard token={token} onLogout={handleLogout} />
        ) : (
          <AuthForms onLogin={handleLogin} />
        )}
      </section>
    </main>
  );
}

export default App;

