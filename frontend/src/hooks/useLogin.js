// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useAuthContext } from "../context/AuthContext";

// const useLogin = () => {
//   const [loading, setLoading] = useState(false);
//   const { setAuthUser } = useAuthContext();

//   const login = async (username, password) => {
//     const success = handleInputErrors(username, password);
//     if (!success) return;
//     setLoading(true);
//     try {
//       const res = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await res.json();
//       console.log(data);
//       if (data.error) {
//         throw new Error(data.error);
//       }

//       localStorage.setItem("chat-user", JSON.stringify(data));
//       setAuthUser(data);
//     //   toast.success("Logged in successfully!");
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { loading, login };
// };
// export default useLogin;

// function handleInputErrors(username, password) {
//   if (!username || !password) {
//     toast.error("Please fill in all fields");
//     return false;
//   }

//   return true;
// }


import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate(); // React Router's navigate function

  const login = async (username, password) => {
    const success = handleInputErrors(username, password);
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        // Successful login
        localStorage.setItem("chat-user", JSON.stringify(data));
        setAuthUser(data);
        toast.success("Logged in successfully!");
        navigate("/"); // Redirect to the home page
      } else {
        // Unsuccessful login
        throw new Error(data.message); // Throw error message received from the server
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

function handleInputErrors(username, password) {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }
  return true;
}
