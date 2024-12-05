import axiosInstance from "../api/axiosInstance";
import endpoints from "../api/endpoints";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { TbEyeClosed } from "react-icons/tb";
import { toast } from "react-toastify";


const Register = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  const togglePass = () => {
    setShowPass(!showPass);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(4, "Password must be at least 4 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
        // eslint-disable-next-line no-unused-vars
        const {confirmPassword, ...dataToSend} = values;
      try {
        const res = await axiosInstance.post(endpoints.AUTH.REGISTER,dataToSend);
        if (res.status === 201) {
          toast.success("Registration successful!");
          localStorage.setItem("token", res.data.token);
          navigate("/login");
        }
      } catch (error) {
        if (error.response?.status === 400) {
          toast.error(error.response.data.message || "User already exists.");
        } else {
          console.error("Unexpected error during registration:", error);
          toast.error("Something went wrong, please try again.");
        }
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
       <div className="p-8 bg-white shadow-lg rounded-lg max-w-sm w-full">
          <h2 className="text-2xl font-bold text-pink-dark text-center mb-6">
            Happy to see you..!
          </h2>
          <p className="font-bold text-pink-dark text-center mb-6">Let your feet do the talking</p>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block font-bold text-pink-dark text-sm mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              placeholder="Enter your Username"
              className="w-full p-2 bg-opacity-20 text-pink-dark bg-grey border-b-grey-dark rounded-md focus:ring-2 focus:ring-red-900 outline-none"            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-error text-sm">{formik.errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-bold text-pink-dark text-sm mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Enter your Email"
              className="w-full p-2 bg-opacity-20 text-pink-dark bg-grey border-b-grey-dark rounded-md focus:ring-2 focus:ring-red-900 outline-none"            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-error text-sm">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block font-bold text-pink-dark text-sm mb-1">
              Password
            </label>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Enter your Password"
              className="w-full p-2 bg-opacity-20 text-pink-dark bg-grey border-b-grey-dark rounded-md focus:ring-2 focus:ring-red-900 outline-none"
            />
            <span
              onClick={togglePass}
              className="absolute right-3 top-9 cursor-pointer"
            >
              {showPass ? <FaEye /> : <TbEyeClosed />}
            </span>
            {formik.touched.password && formik.errors.password && (
              <p className="text-error text-sm">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block font-bold text-pink-dark text-sm mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              placeholder="Confirm your Password"
              className="w-full p-2 bg-opacity-20 text-pink-dark bg-grey border-b-grey-dark rounded-md focus:ring-2 focus:ring-red-900 outline-none"
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-error text-sm">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-pink-light text-grey-light rounded-md font-semibold transition-colors duration-300 ease-in-out hover:bg-pink"
          >
            Register
          </button>

          <div className="text-center mt-4">
            <Link to="/login"  className="text-grey-darker hover:underline">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
