import { useState, useEffect } from "react";
import image from "../../assets/image1.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth,
  );
  console.log("Login render", isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault(); //form submit par page reload ko rokna

    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-[#f6efe4] p-6">
      {/* CARD */}
      <div className="bg-white rounded-[40px] shadow-lg w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* LEFT - FORM */}
        <div className="p-12 flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-3">
            Welcome back 👋
          </h2>
          <p className="text-gray-600 mb-8 max-w-lg">
            Sign in to access bhajans, leelas and your personalised content.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              className="w-full px-4 py-3 border border-gray-200 rounded-full bg-white
                focus:outline-none focus:ring-2 focus:ring-amber-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              className="w-full px-4 py-3 border border-gray-200 rounded-full bg-white
                focus:outline-none focus:ring-2 focus:ring-amber-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-700 
                text-black py-3 rounded-full font-semibold transition-shadow shadow-sm"
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
        <div className="bg-transparent flex items-center justify-center p-8">
          <div className="w-full h-90 md:max-h-96 md:rounded-l-[40px] rounded-lg overflow-hidden shadow-inner">
            <img
              src={image}
              alt="Login Illustration"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
