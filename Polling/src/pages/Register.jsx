import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService.js";
import { Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser(formData);

      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-black
      relative
      overflow-hidden
      text-white
    "
    >
      <div
        className="
        absolute
        w-[500px]
        h-[500px]
        bg-pink-600/20
        rounded-full
        blur-3xl
        top-[-100px]
        left-[-100px]
      "
      />

      <div
        className="
        absolute
        w-[400px]
        h-[400px]
        bg-blue-600/20
        rounded-full
        blur-3xl
        bottom-[-100px]
        right-[-100px]
      "
      />

      <div
        className="
        relative
        z-10
        w-full
        max-w-md
        p-8
        rounded-3xl
        backdrop-blur-xl
        bg-white/5
        border
        border-white/10
        shadow-[0_0_60px_rgba(168,85,247,0.25)]
      "
      >
        <div className="text-center mb-8">
          <h1
            className="
            text-5xl
            font-black
            tracking-tight
            bg-gradient-to-r
            from-purple-400
            via-pink-400
            to-blue-400
            text-transparent
            bg-clip-text
          "
          >
            Create Account
          </h1>

          <p className="text-gray-400 mt-3">Join the future of polling.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="
            w-full
            p-4
            rounded-2xl
            bg-white/5
            border
            border-white/10
            focus:border-pink-500
            outline-none
            transition
            placeholder:text-gray-500
          "
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="
            w-full
            p-4
            rounded-2xl
            bg-white/5
            border
            border-white/10
            focus:border-blue-500
            outline-none
            transition
            placeholder:text-gray-500
          "
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="
            w-full
            p-4
            rounded-2xl
            bg-white/5
            border
            border-white/10
            focus:border-purple-500
            outline-none
            transition
            placeholder:text-gray-500
          "
          />

          <button
            type="submit"
            className="
            w-full
            p-4
            rounded-2xl
            font-bold
            bg-gradient-to-r
            from-purple-600
            via-pink-600
            to-blue-600
            hover:scale-[1.02]
            hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]
            transition-all
            duration-300
          "
          >
            Register
          </button>
          <p className="text-center text-gray-400">
            Already have an account ?
            <Link
              to="/"
              className="
              text-pink-400
              ml-2
              hover:text-blue-400
              transition
            "
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
