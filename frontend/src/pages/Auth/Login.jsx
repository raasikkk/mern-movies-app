import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../redux/api/users";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("User successfully signed in.");
    } catch (err) {
      console.log(err); // Debugging the error
      const errorMessage =
        err?.data?.message || err?.error || "An unknown error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <div
      className="pt-36 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/auth-bg.png')" }}
    >
      <div className="container mx-auto h-screen bg-cover bg-center bg-no-repeat">
        <div className="flex flex-col max-w-[600px]">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-100px", once: true }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 25,
            }}
            className="text-3xl font-medium"
          >
            SIGN IN
          </motion.h1>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-100px", once: true }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 25,
            }}
            onSubmit={submitHandler}
            className="px-2 sm:px-0"
          >
            {/* Email */}
            <div className="mt-10">
              <label
                htmlFor="email"
                className="block text-xl uppercase text-white"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="border rounded-lg w-full mt-2"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* Password */}
            <div className="mt-5">
              <label
                htmlFor="password"
                className="block text-xl uppercase text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="border rounded-lg w-full mt-2"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button disabled={isLoading} type="submit" className="auth-btn">
              {isLoading ? "Signing In" : "Sign In"}
            </button>

            {isLoading && <Loader />}
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-100px", once: true }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 25,
            }}
            className="mt-5"
          >
            <p>
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-red-600 hover:underline"
              >
                Register
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
