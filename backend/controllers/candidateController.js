import pool from "../config/db.js";

/* ===================== GET ALL ===================== */
export const getAllCandidates = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM candidates ORDER BY id DESC",
    );
    res.json(rows);
  } catch (err) {
    console.error("GET ALL ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/* ===================== GET BY ID ===================== */
export const getCandidateById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: "Invalid ID" });

    const { rows } = await pool.query("SELECT * FROM candidates WHERE id=$1", [
      id,
    ]);

    if (!rows.length)
      return res.status(404).json({ message: "Candidate not found" });

    res.json(rows[0]);
  } catch (err) {
    console.error("GET BY ID ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/* ===================== CREATE ===================== */
export const createCandidate = async (req, res) => {
  try {
    const {
      name,
      age,
      email,
      phone,
      skills,
      experience,
      applied_position,
      status,
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and Email are required",
      });
    }

    const { rows } = await pool.query(
      `INSERT INTO candidates
      (name, age, email, phone, skills, experience, applied_position, status)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *`,
      [
        name,
        age || null,
        email,
        phone || null,
        skills || null,
        experience || null,
        applied_position || null,
        status || "pending",
      ],
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

/* ===================== UPDATE ===================== */
export const updateCandidate = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: "Invalid ID" });

    const allowedFields = [
      "name",
      "age",
      "email",
      "phone",
      "skills",
      "experience",
      "applied_position",
      "status",
    ];

    const fields = Object.keys(req.body).filter((f) =>
      allowedFields.includes(f),
    );

    if (!fields.length) {
      return res.status(400).json({
        message: "No valid fields provided to update",
      });
    }

    const values = fields.map((f) => req.body[f]);

    const query = `
      UPDATE candidates SET
      ${fields.map((f, i) => `${f}=$${i + 1}`).join(", ")},
      updated_at = CURRENT_TIMESTAMP
      WHERE id=$${fields.length + 1}
      RETURNING *
    `;

    const { rows } = await pool.query(query, [...values, id]);

    if (!rows.length)
      return res.status(404).json({ message: "Candidate not found" });

    res.json(rows[0]);
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

/* ===================== DELETE ===================== */
export const deleteCandidate = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: "Invalid ID" });

    const { rows } = await pool.query(
      "DELETE FROM candidates WHERE id=$1 RETURNING *",
      [id],
    );

    if (!rows.length)
      return res.status(404).json({ message: "Candidate not found" });

    res.json({
      message: "Candidate deleted successfully",
      deleted: rows[0],
    });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
