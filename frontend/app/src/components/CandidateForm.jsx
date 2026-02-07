import React, { useEffect, useState } from "react";
import { createCandidate, updateCandidate } from "../api/candidateApi";

const INITIAL_STATE = {
  name: "",
  age: "",
  email: "",
  phone: "",
  skills: "",
  experience: "",
  applied_position: "",
  status: "Pending",
};

export default function CandidateForm({ editData, onSuccess }) {
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  /* ================= Autofill on Edit ================= */
  useEffect(() => {
    if (editData) {
      setForm({
        name: editData.name ?? "",
        age: editData.age ?? "",
        email: editData.email ?? "",
        phone: editData.phone ?? "",
        skills: editData.skills ?? "",
        experience: editData.experience ?? "",
        applied_position: editData.applied_position ?? "",
        status: editData.status ?? "Pending",
      });
    } else {
      setForm(INITIAL_STATE);
    }
  }, [editData]);

  /* ================= Handle Change ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= Submit ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email) {
      alert("Name and Email are required");
      return;
    }

    try {
      setLoading(true);

      if (editData) {
        await updateCandidate(editData.id, form);
        alert("Updated Successfully");
      } else {
        await createCandidate(form);
        alert("Created Successfully");
      }

      setForm(INITIAL_STATE);
      onSuccess?.();
    } catch (err) {
      console.error("FORM ERROR:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <form onSubmit={handleSubmit}>
      <h2>{editData ? "Edit Candidate" : "Add Candidate"}</h2>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="age"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        disabled={!!editData} // 🔒 email should not change
      />

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
      />

      <input
        name="skills"
        placeholder="Skills"
        value={form.skills}
        onChange={handleChange}
      />

      <input
        name="experience"
        placeholder="Experience"
        value={form.experience}
        onChange={handleChange}
      />

      <input
        name="applied_position"
        placeholder="Position"
        value={form.applied_position}
        onChange={handleChange}
      />

      {/* STATUS */}
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <br />
      <br />

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : editData ? "Update" : "Create"}
      </button>
    </form>
  );
}
