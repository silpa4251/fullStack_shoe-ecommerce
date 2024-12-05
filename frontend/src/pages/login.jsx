import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { TbEyeClosed } from "react-icons/tb";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/userSlice";
import axiosInstance from "../api/axiosInstance";
import endpoints from "../api/endpoints";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user, admin} = useSelector((state) => state.user);
  const [showPass, setShowPass] = useState(false);


  useEffect(() => {
    if (isAuthenticated) {
      if(admin) {
        navigate("/admin/dashboard",{replace: true});
      } else {
      navigate('/', { replace: true });
      }
    } 
  }, [isAuthenticated,admin, navigate]);
 


  const togglePass = () => {
    setShowPass(!showPass);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axiosInstance.post(endpoints.AUTH.LOGIN, values);
        if (res.status === 200) {
          toast.success("Login successful!");
          dispatch(login(res.data));
        }
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error("Invalid email or password.");
        } else {
          console.error("Unexpected error during login:", error);
          toast.error("Something went wrong, please try again.");
        }
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="p-8 bg-white shadow-lg rounded-lg max-w-sm w-full">
      <h2 className="text-2xl font-bold text-pink-dark text-center mb-5">
          Good to see you Back..!
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
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
              className="w-full p-2 bg-opacity-20 text-pink-dark bg-grey border-b-grey-dark rounded-md focus:ring-2 focus:ring-red-900 outline-none"    
            />
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-pink-light text-grey-light rounded-md font-semibold transition-colors duration-300 ease-in-out hover:bg-pink"
          >
            Login
          </button>

          <div className="text-center mt-4">
            <Link to="/register" className="text-grey-darker hover:underline">
              Don&apos;t have an account? Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
