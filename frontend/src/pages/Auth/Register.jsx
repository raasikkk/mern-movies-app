import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useRegisterMutation } from "../../redux/api/users";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

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

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered.");
      } catch (err) {
        console.log(err); // Debugging the error
        const errorMessage =
          err?.data?.message || err?.error || "An unknown error occurred";
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div
      className="pt-36 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/auth-bg.png')" }}
    >
      <div className="container mx-auto h-screen">
        <div className="flex flex-col max-w-[600px]">
          <h1 className="text-3xl font-medium">REGISTER</h1>

          <form onSubmit={submitHandler} className="px-2 sm:px-0">
            {/* Name */}
            <div className="mt-8">
              <label
                htmlFor="name"
                className="block text-xl uppercase text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="border rounded-lg w-full mt-2"
                placeholder="Enter Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {/* Email */}
            <div className="mt-5">
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
            {/* Confirm Password */}
            <div className="mt-5">
              <label
                htmlFor="comfirmPassword"
                className="block text-xl uppercase text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="comfirmPassword"
                className="border rounded-lg w-full mt-2"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button disabled={isLoading} type="submit" className="auth-btn">
              {isLoading ? "Registering" : "Register"}
            </button>

            {isLoading && <Loader />}
          </form>

          <div className="mt-5">
            <p>
              Already have an account?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-red-600 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
