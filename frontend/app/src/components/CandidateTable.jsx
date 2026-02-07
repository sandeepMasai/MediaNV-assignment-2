export default function CandidateTable({ data = [], remove, edit }) {
  if (!data.length) {
    return <p>No candidates found</p>;
  }

  return (
    <table border="1" cellPadding="10" width="100%">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Position</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {data.map((c) => (
          <tr key={c.id}>
            <td>{c.name || "-"}</td>
            <td>{c.email || "-"}</td>
            <td>{c.applied_position || "-"}</td>

            {/* STATUS BADGE */}
            <td>
              <span
                style={{
                  padding: "4px 8px",
                  borderRadius: 4,
                  color: "#fff",
                  background:
                    c.status === "Completed"
                      ? "green"
                      : c.status === "In Progress"
                        ? "orange"
                        : "gray",
                }}
              >
                {c.status}
              </span>
            </td>

            <td>
              <button onClick={() => edit(c)}>Edit</button>{" "}
              <button
                onClick={() => {
                  if (window.confirm("Are you sure?")) {
                    remove(c.id);
                  }
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
