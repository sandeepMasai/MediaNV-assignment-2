import React, { useEffect, useState } from "react";
import { getCandidates, deleteCandidate } from "./api//candidateApi";

import CandidateForm from "./components/CandidateForm";
import CandidateTable from "./components/CandidateTable";

export default function App() {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);

  // FETCH ALL
  const fetchCandidates = async () => {
    const res = await getCandidates();
    setData(res.data);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  // DELETE
  const handleDelete = async (id) => {
    await deleteCandidate(id);
    fetchCandidates();
  };

  // EDIT
  const handleEdit = (candidate) => {
    setEditData(candidate);
  };

  // AFTER CREATE / UPDATE
  const handleSuccess = () => {
    fetchCandidates();
    setEditData(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Candidate Management</h1>

      <CandidateForm editData={editData} onSuccess={handleSuccess} />

      <CandidateTable data={data} remove={handleDelete} edit={handleEdit} />
    </div>
  );
}
