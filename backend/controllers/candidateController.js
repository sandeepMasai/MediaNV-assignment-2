import pool from "../config/db.js";

// 📥 GET ALL
export const getAllCandidates = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM candidates ORDER BY id DESC",
    );
    res.json(result.rows);
  } catch (err) {
    console.error("GET ALL ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// 📥 GET BY ID
export const getCandidateById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query("SELECT * FROM candidates WHERE id=$1", [
      id,
    ]);

    if (!result.rows.length) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("GET BY ID ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ➕ CREATE
export const createCandidate = async (req, res) => {
  try {
    const {
      name = "",
      age = 0,
      email = "",
      phone = "",
      skills = "",
      experience = "",
      applied_position = "",
      status = "",
    } = req.body;

    const result = await pool.query(
      `INSERT INTO candidates
       (name, age, email, phone, skills, experience, applied_position, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING *`,
      [name, age, email, phone, skills, experience, applied_position, status],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("CREATE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✏️ UPDATE
export const updateCandidate = async (req, res) => {
  try {
    const { id } = req.params;

    const fields = Object.keys(req.body);
    const values = Object.values(req.body);

    if (!fields.length) {
      return res.status(400).json({
        message: "No fields provided to update",
      });
    }

    const query = `
      UPDATE candidates SET
      ${fields.map((f, i) => `${f}=$${i + 1}`).join(", ")},
      updated_at = CURRENT_TIMESTAMP
      WHERE id=$${fields.length + 1}
      RETURNING *
    `;

    const result = await pool.query(query, [...values, id]);

    if (!result.rows.length) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("UPDATE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ❌ DELETE
export const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM candidates WHERE id=$1 RETURNING *",
      [id],
    );

    if (!result.rows.length) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.json({
      message: "Candidate deleted successfully",
    });
  } catch (err) {
    console.error("DELETE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};
