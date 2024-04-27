// import Sidebar from "../../components/sidebar/Sidebar";
// import MessageContainer from "../../components/messages/MessageContainer";
// import { BsJustify } from "react-icons/bs";

// const Home = () => {
//   const containerStyle = {
//     display: "flex",
//     height: "450px",
//     maxHeight: "650px",
//     borderRadius: "10px",};

//   const sidebarStyle = {
//     flex: "none",
//     width: "25%",
//   };

//   const messageContainerStyle = {
//     flex: "1",
//   };

//   return (
//     <div
//       className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter bg-opacity-0"
//       style={containerStyle}
//     >
//       <Sidebar style={sidebarStyle} /> {/* Set sidebar to 25% width */}
//       <MessageContainer style={messageContainerStyle} />{" "}
//       {/* Set message container to take remaining width */}
//     </div>
//   );
// };

// export default Home;

import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[609px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter bg-opacity-0 py-0">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};
export default Home;

// //2.27
