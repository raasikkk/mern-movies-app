import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useProfileMutation } from "../../redux/api/users";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div
      className="pt-32 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/hero-bg.png')" }}
    >
      <div className="container mx-auto h-screen">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-medium">Update Profile</h1>

          <form onSubmit={submitHandler} className="w-full lg:w-1/2">
            {/* Name */}
            <div className="mt-10">
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

            <div className="flex justify-between">
              <button type="submit" className="auth-btn">
                Update
              </button>

              {loadingUpdateProfile && <Loader />}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
