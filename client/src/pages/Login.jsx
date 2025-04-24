import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { login } from "../utils/api";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      localStorage.setItem("token", response.data.token);
      toast.success("Logged in successfully!");
      navigate("/admin");
    } catch (error) {
      toast.error("Invalid credentials.");
      console.error("Error:", error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-gray-800 p-8 rounded-lg"
      >
        <h2 className="text-3xl font-bold text-pink-400 text-center mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Username"
              {...register("username", { required: "Username is required" })}
              className="w-full p-3 bg-gray-700 border border-purple-400 rounded text-white"
            />
            {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-3 bg-gray-700 border border-purple-400 rounded text-white"
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-pink-400 text-gray-900 p-3 rounded hover:bg-pink-500"
          >
            Login
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Login;