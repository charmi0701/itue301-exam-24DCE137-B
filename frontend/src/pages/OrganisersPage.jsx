import { useEffect, useState } from "react";

const URL = "https://jsonplaceholder.typicode.com/users?_limit=10";

export default function OrganisersPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrganisers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const organisers = await response.json();
      setData(organisers.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" })));
    } catch {
      setError("Could not load organisers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrganisers();
  }, []);

  if (loading) return <p>Loading organisers...</p>;
  if (error) {
    return (
      <main>
        <h2>Organisers</h2>
        <p role="alert">{error}</p>
        <button type="button" onClick={loadOrganisers}>Retry</button>
      </main>
    );
  }

  return (
    <main>
      <h2>Organisers</h2>
      <p>{data.length} organisers</p>
      <ul>
        {data.map((organiser) => (
          <li key={organiser.id}>
            <strong>{organiser.name}</strong> — {organiser.company.name} ({organiser.email})
          </li>
        ))}
      </ul>
    </main>
  );
}
