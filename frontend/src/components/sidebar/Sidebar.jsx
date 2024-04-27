import SearchInput from "./Searchinput.jsx";
import Conversations from "./Conversations.jsx";
import LogoutButton from "./LogoutButton.jsx";
import { useAuthContext } from "../../context/AuthContext.jsx";
const Sidebar = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <span
        className=" font-bold text-lg mb-3 ml-3 "
        style={{ fontFamily: "Exo, sans-serif" }}
      >
        Welcome {authUser.fullname} !
      </span>
      <SearchInput />
      {/* <div className="divider px-3"></div> */}
      <Conversations />
      <LogoutButton />
    </div>
  );
};
export default Sidebar;
