import React, { useEffect, useState } from "react";
import { createCandidate, updateCandidate } from "../api/candidateApi";

export default function CandidateForm({ editData, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    skills: "",
    experience: "",
    applied_position: "",
    status: "Pending",
  });

  // Autofill edit data safely
  useEffect(() => {
    if (editData) {
      setForm({
        name: editData.name || "",
        age: editData.age || "",
        email: editData.email || "",
        phone: editData.phone || "",
        skills: editData.skills || "",
        experience: editData.experience || "",
        applied_position: editData.applied_position || "",
        status: editData.status || "Pending",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editData) {
      await updateCandidate(editData.id, form);
      alert("Updated Successfully");
    } else {
      await createCandidate(form);
      alert("Created Successfully");
    }

    // Reset form
    setForm({
      name: "",
      age: "",
      email: "",
      phone: "",
      skills: "",
      experience: "",
      applied_position: "",
      status: "Pending",
    });

    onSuccess();
  };

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
        name="age"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
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

      {/* STATUS DROPDOWN  */}
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <br />
      <br />

      <button type="submit">{editData ? "Update" : "Create"}</button>
      <br />
      <br />
    </form>
  );
}
