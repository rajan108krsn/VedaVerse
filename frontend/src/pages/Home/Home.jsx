import { useSelector } from "react-redux";

export default function Home() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Home</h1>

      <p><strong>Welcome:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Role:</strong> {user?.role}</p>

      <hr />

      <p>✅ Login working</p>
      <p>✅ Auth state accessible</p>
    </div>
  );
}
