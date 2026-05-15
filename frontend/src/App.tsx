import { useEffect, useState } from "react";
import { fetchHealth } from "./api/endpoints";

function App() {
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchHealth()
      .then((data) => setStatus(data.status))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif", textAlign: "center" }}>
      <h1>Spa PRDTR</h1>
      <p>
        Backend status:{" "}
        {error ? (
          <span style={{ color: "red" }}>❌ {error}</span>
        ) : status ? (
          <span style={{ color: "green" }}>✅ {status}</span>
        ) : (
          "Loading..."
        )}
      </p>
    </main>
  );
}

export default App;
