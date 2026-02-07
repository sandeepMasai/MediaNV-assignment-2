import { useEffect, useState } from "react";
import { getCandidates, deleteCandidate } from "../api/candidateApi";
import CandidateForm from "../components/CandidateForm";
import CandidateTable from "../components/CandidateTable";

export default function Dashboard() {
  const [data, setData] = useState([]);

  const load = async () => {
    const res = await getCandidates();
    setData(res.data);
  };

  const remove = async (id) => {
    await deleteCandidate(id);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <CandidateForm refresh={load} />
      <CandidateTable data={data} remove={remove} />
    </>
  );
}
