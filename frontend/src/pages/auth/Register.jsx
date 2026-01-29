import { useState } from "react";
import image from "../../assets/image1.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/auth/authSlice";
import { Navigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobileno: "",
  });

  const { name, email, password, mobileno } = formData;

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  // 🔐 Already logged in → home
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const dispatch = useDispatch();

  // 🔁 Generic input handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      registerUser({
        name,
        email,
        password,
        mobileno,
      }),
    );
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-[#f6efe4] p-6">
      {/* CARD */}
      <div className="bg-white rounded-[40px] shadow-lg w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* LEFT - FORM */}
        <div className="p-12 flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-3">
            Create account 🚀
          </h2>
          <p className="text-gray-600 mb-8 max-w-lg">
            Join the community to explore bhajans, leelas and more.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              autoComplete="name"
              value={name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-full bg-white
              focus:outline-none focus:ring-2 focus:ring-amber-300"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              value={email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-full bg-white
              focus:outline-none focus:ring-2 focus:ring-amber-300"
            />

            <input
              type="tel"
              name="mobileno"
              placeholder="Phone Number"
              autoComplete="tel"
              value={mobileno}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-full
              focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="new-password"
              value={password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-full
              focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-700
                text-black py-3 rounded-full font-semibold transition-shadow shadow-sm"
            >
              {loading ? "Creating account..." : "Register"}
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
              alt="Register Illustration"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
