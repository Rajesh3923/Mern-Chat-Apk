import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="mt-auto">
      {!loading ? (
        <BiLogOut
          className="w-6 h-6 text-white cursor-pointer"
          onClick={logout}
        />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
      <span
        className="text-white text-sm font-semibold cursor-pointer"
        onClick={logout}
      >
        Logout
      </span> 
    </div>
  );
};
export default LogoutButton;
