import { useState } from "react";
import image from "../../assets/image1.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-green-900">
      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* LEFT - FORM */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">Welcome back 👋</h2>
          <p className="text-gray-500 mb-6">Please enter your details</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              className="w-full px-4 py-3 border rounded-full 
              focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              className="w-full px-4 py-3 border rounded-full 
              focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 
              text-white py-3 rounded-full font-semibold transition"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          {error && (
            <p className="text-red-500 text-sm mt-4 text-center">
              {error.message || error}
            </p>
          )}
        </div>

        {/* RIGHT - IMAGE */}
        <div className="bg-amber-100 relative">
          <img
            src={image}
            alt="Login Illustration"
            className="absolute w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
