// Purpose: show protected data only after the user has a valid JWT.

import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function Dashboard({ token, onLogout }) {
  const [protectedMessage, setProtectedMessage] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProtectedData() {
      try {
        const response = await fetch(`${API_URL}/api/protected`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Could not load protected data.");
        }

        setProtectedMessage(data.message);
        setTimestamp(data.timestamp);
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadProtectedData();
  }, [token]);

  return (
    <div className="dashboard-panel">
      <h2>Dashboard</h2>

      {isLoading && <p className="muted-text">Loading protected data...</p>}
      {error && <p className="error-message">{error}</p>}

      {protectedMessage && (
        <div className="protected-box">
          <p>{protectedMessage}</p>
          <span>Timestamp: {timestamp}</span>
        </div>
      )}

      <button className="secondary-button" type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;

