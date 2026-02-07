import pool from "../config/db.js";

export const getAllCandidates = async (req, res) => {
  const result = await pool.query("SELECT * FROM candidates ORDER BY id DESC");
  res.json(result.rows);
};

export const getCandidateById = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM candidates WHERE id=$1", [id]);
  res.json(result.rows[0]);
};

export const createCandidate = async (req, res) => {
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

  const result = await pool.query(
    `INSERT INTO candidates 
     (name, age, email, phone, skills, experience, applied_position, status)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [name, age, email, phone, skills, experience, applied_position, status],
  );

  res.status(201).json(result.rows[0]);
};

export const updateCandidate = async (req, res) => {
  const { id } = req.params;
  const fields = Object.keys(req.body);
  const values = Object.values(req.body);

  const query = `
    UPDATE candidates SET
    ${fields.map((f, i) => `${f}=$${i + 1}`).join(", ")},
    updated_at=CURRENT_TIMESTAMP
    WHERE id=$${fields.length + 1}
    RETURNING *
  `;

  const result = await pool.query(query, [...values, id]);
  res.json(result.rows[0]);
};

export const deleteCandidate = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM candidates WHERE id=$1", [id]);
  res.json({ message: "Candidate deleted" });
};
