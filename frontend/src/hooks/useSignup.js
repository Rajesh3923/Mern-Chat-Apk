import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({
    fullname,
    username,
    password,
    confirmpassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullname,
      username,
      password,
      confirmpassword,
      gender,
    });
    if (!success) return;
    setLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          username,
          password,
          confirmpassword,
          gender,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Account created successfully
        toast.success("Account Created Successfully");
      } else {
        // Handle other response statuses if needed
        toast.error(data.message || "Failed to create account");
      }
      // when the user is  already signed in ,we've to redirect to home page and when loggged
      // previously ,it has to show the home page ,instead of the login page or sign up page
      // this can be done by uasing the LOCAL STORAGE & AUTHCONTEXT HOOK,WHEN user gets logged ,it is stored in the
      // local storage and when the user is logged out ,it is removed from the local storage,so we need to check
      // if the user is logged in or not by checking the local storage and if the user is logged in ,we need to redirect
      // to the home page instead of login page or sign up page
      // this can be done by Creating the Authcontext.jsx file
      //as we imported the "authcontext.js",we can set the local storage with the signup'ed user data which we get from the
      // backend,,,below is the implementation
      localStorage.setItem("chat-user", JSON.stringify(data)); //we're storing the user in the local storage
      setAuthUser(data); //we're setting the user in the authcontext
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};
export default useSignup;

function handleInputErrors({
  fullname,
  username,
  password,
  confirmpassword,
  gender,
}) {
  if (!fullname || !username || !password || !confirmpassword || !gender) {
    toast.error("All fields are required");
    return false;
  }
  if (password !== confirmpassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }
  return true;
}
