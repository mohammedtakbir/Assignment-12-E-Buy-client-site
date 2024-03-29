import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { useTitle } from "../Hooks/useTitle";
import { useToken } from "../Hooks/useToken";

const Login = () => {
  useTitle('Log In');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const { register, handleSubmit, formState: { errors }, getValues, } = useForm();
  const { userLogin, googleAuthentication, resetPassword } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [token] = useToken(loginUserEmail);
  const [viewPassword, setViewPassword] = useState(false);

  if (token) {
    navigate(from, { replace: true });
  }

  const handleLogin = (data) => {
    setLoading(true);
    userLogin(data.email, data.password)
      .then((res) => {
        setLoading(false);
        setLoginUserEmail(data.email);
        setLoginError("");
        toast.success("Log In Successfully!");
      })
      .catch((err) => {
        setLoading(false);
        setLoginError(err.message);
        console.error(err);
      });
  };

  const handleGoogleLogIn = () => {
    setGoogleLoading(true);
    googleAuthentication()
      .then((res) => {
        setLoginUserEmail(res.user.email);
        saveBuyerInfo(res.user.displayName, res.user.email, "buyer");
      })
      .catch((err) => {
        console.error(err);
        setGoogleLoading(false);
      });
  };

  //* store buyer info
  const saveBuyerInfo = (name, email, accountType) => {
    const user = { email, name, role: accountType };
    fetch("https://e-buy-phi.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setGoogleLoading(false);
        toast.success("Log In Successfully!");
      })
      .catch((err) => {
        setGoogleLoading(false);
      });
  };

  const handleForgotPassword = () => {
    const getEmail = getValues();
    if (getEmail.email === "") {
      toast.error("You've to insert Email First.");
      return;
    }
    resetPassword(getEmail.email)
      .then(() => {
        toast.success("Please check your email to reset your password.");
      })
      .catch((err) => console.error(err));
  };

  return (
    <section className="lg:py-[100px] md:py-[70px] py-[50px] flex justify-center">
      <div className="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-7 sm:mx-0 mx-3">
        <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
          <h5 className="text-xl font-medium text-gray-900 text-center">
            Hello
          </h5>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              placeholder="Insert Your Email"
              {...register("email", { required: "Email Address is required" })}
              type="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
            {errors.email && (
              <p role="alert" className="text-red-500 text-sm">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="relative">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              placeholder="Insert Your Password"
              {...register("password", { required: "Password is required" })}
              type={viewPassword ? 'text' : 'password'}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>

          <div className="flex justify-between items-start !mt-1">
            <div>
              <div className="flex items-center mt-1">
                <input
                  onClick={() => setViewPassword(!viewPassword)}
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  id='show_password'
                />
                <label htmlFor="show_password" className="ml-2 text-sm font-medium text-gray-900">Show Password</label>
              </div>
              {errors.password && (
                <p role="alert" className="text-red-500 text-sm">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <button
              onClick={handleForgotPassword}
              type="button"
              className="text-blue-500 text-sm hover:underline !mt-0"
            >
              Forgot Password
            </button>
          </div>


          {loginError && (
            <p className="text-red-500 !mt-0 text-sm">{loginError}</p>
          )}
          <button
            type="submit"
            className="w-full text-white bg-gray-700 hover:bg-gray-800 focus:ring-2 
            focus:outline-none focus:ring-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {loading ? "Loading..." : "Login"}
          </button>
          <div className="text-sm text-gray-500 !mt-3 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Create new account
            </Link>
          </div>
        </form>
        <div>
          <p className="text-center my-3 font-semibold text-sm">OR</p>
        </div>
        <div className="text-center">
          <button
            onClick={handleGoogleLogIn}
            type="button"
            className="border border-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex 
            items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2 hover:bg-gray-700 hover:text-white"
          >
            <svg
              className="mr-2 -ml-1 w-4 h-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 
                64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 
                156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            {googleLoading ? "LOADING..." : "LOGIN IN WITH GOOGLE"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
