import { useForm } from "react-hook-form";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { createContact } from "../utils/api";

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await createContact(data);
      toast.success("Message sent successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to send message.");
      console.error("Error:", error);
    }
  };

  return (
    <section className="py-16 bg-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold text-pink-400 text-center mb-12"
        >
          Contact Me
        </motion.h2>
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto space-y-6"
        >
          <div>
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
              className="w-full p-3 bg-gray-800 border border-purple-400 rounded text-white"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email",
                },
              })}
              className="w-full p-3 bg-gray-800 border border-purple-400 rounded text-white"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <textarea
              placeholder="Message"
              {...register("message", { required: "Message is required" })}
              className="w-full p-3 bg-gray-800 border border-purple-400 rounded text-white h-32"
            ></textarea>
            {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-pink-400 text-gray-900 p-3 rounded hover:bg-pink-500"
          >
            Send
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;