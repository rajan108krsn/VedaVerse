import { useState } from "react";
import image from "../../assets/image1.jpeg";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";
import {useSelector} from 'react-redux';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {loading,error,isAuthenticated}=useSelector((state)=>state.auth);
  const navigate = useNavigate();

  useEffect(() => {
  if (isAuthenticated) {
    navigate("/");
  }
  }, [isAuthenticated, navigate]);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log({ email, password });
      dispatch(loginUser({email,password}));
      
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-green-900">
      
      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT - FORM */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back 👋
          </h2>
          <p className="text-gray-500 mb-6">
            Please enter your details
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-full 
              focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-full 
              focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between text-sm text-gray-500">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember for 30 days
              </label>
              <span className="cursor-pointer hover:text-orange-500">
                Forgot password?
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 
              text-white py-3 rounded-full font-semibold transition"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <span className="text-orange-500 cursor-pointer font-semibold">
              Sign up
            </span>
          </p>
        </div>

        {/* RIGHT - IMAGE */}
        <div className="bg-amber-100 relative">
          <img
            src={image}
            alt="Login Illustration"
            className="absolute w-full h-full object-cover"
          />
        </div>
        {/* //object-cover makes sure the image covers the entire div without distortion */}
        {error && (
  <p className="text-red-500 text-sm mt-2 text-center">
    {error.message || error}
  </p>
)}


      </div>
    </div>
  );
}
