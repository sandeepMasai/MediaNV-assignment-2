import React, { useEffect, useState } from "react";
import { getCandidates, deleteCandidate } from "./api/candidateApi";

import CandidateForm from "./components/CandidateForm";
import CandidateTable from "./components/CandidateTable";

export default function App() {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ALL ================= */
  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const candidates = await getCandidates(); // ✅ already data
      setData(candidates);
    } catch (err) {
      console.error("FETCH ERROR:", err);
      alert("Failed to fetch candidates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      await deleteCandidate(id);
      fetchCandidates();
    } catch (err) {
      console.error("DELETE ERROR:", err);
      alert("Delete failed");
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (candidate) => {
    setEditData(candidate);
  };

  /* ================= AFTER CREATE / UPDATE ================= */
  const handleSuccess = () => {
    fetchCandidates();
    setEditData(null);
  };

  /* ================= UI ================= */
  return (
    <div style={{ padding: 20 }}>
      <h1>Candidate Management</h1>

      <CandidateForm editData={editData} onSuccess={handleSuccess} />

      {loading ? (
        <p>Loading candidates...</p>
      ) : (
        <CandidateTable data={data} remove={handleDelete} edit={handleEdit} />
      )}
    </div>
  );
}
