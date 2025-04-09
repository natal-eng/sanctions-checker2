import { useState } from "react";

export default function Home() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch(`/api/check?address=${address}`);
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, direction: "rtl", fontFamily: "sans-serif" }}>
      <h1>🔍 בדיקת כתובת קריפטו מול רשימות סנקציות</h1>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="הדבק כאן כתובת קריפטו"
        style={{ width: "100%", padding: 10, fontSize: 16 }}
      />
      <br /><br />
      <button onClick={handleCheck} disabled={loading || !address} style={{ padding: 10, fontSize: 16 }}>
        {loading ? "בודק..." : "בדוק כתובת"}
      </button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <p>📬 כתובת: {result.address}</p>
          <p>🚨 האם מסומנת כסנקציונית? <strong>{result.isSanctioned ? "כן! ⚠️" : "לא ✅"}</strong></p>
          {result.sanctions?.length > 0 && <p>📋 רשימות: {result.sanctions.join(", ")}</p>}
        </div>
      )}

      {error && (
        <div style={{ marginTop: 20, color: "red" }}>שגיאה: {error}</div>
      )}
    </div>
  );
}
