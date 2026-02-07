import { useState } from "react";
import { createCandidate } from "../api/candidateApi";

export default function CandidateForm({ refresh }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    skills: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async () => {
    //  validation
    if (!form.name || !form.age || !form.email) {
      alert("Name, Age, and Email are required");
      return;
    }

    await createCandidate({
      ...form,
      age: Number(form.age),
    });

    setForm({ name: "", age: "", email: "", skills: "" });
    refresh();
  };

  return (
    <div>
      <input
        name="name"
        value={form.name}
        placeholder="Name"
        onChange={handleChange}
      />

      <input
        name="age"
        value={form.age}
        placeholder="Age"
        type="number"
        onChange={handleChange}
      />

      <input
        name="email"
        value={form.email}
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        name="skills"
        value={form.skills}
        placeholder="Skills"
        onChange={handleChange}
      />

      <button onClick={submit}>Add Candidate</button>
    </div>
  );
}
