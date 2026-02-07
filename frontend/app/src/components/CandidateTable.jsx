export default function CandidateTable({ data, remove, edit }) {
  return (
    <table border="1" cellPadding="10">
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
            <td>{c.name}</td>
            <td>{c.email}</td>
            <td>{c.applied_position}</td>
            <td>{c.status}</td>

            <td>
              <button onClick={() => edit(c)}>Edit</button>

              <button onClick={() => remove(c.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
