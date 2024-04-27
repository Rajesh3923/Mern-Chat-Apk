
// STARTER CODE SNIPPET
import { useState } from "react";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

import { IoSearchSharp } from "react-icons/io5";

const SearchInput = () => {
  	const [search, setSearch] = useState("");
    const { setSelectedConversation } = useConversation();
    const { conversations } = useGetConversations();
    const handleSubmit=(e)=>{
      e.preventDefault();
      if(!search) return;
      if (search.length < 3) {
        return toast.error("Search term must be at least 3 characters long");
      }
      const conversation = conversations.find((c) =>c.fullname.toLowerCase().includes(search.toLowerCase()));//its not camel case
      if (!conversation) {
        return toast.error("No user found with that name");
      }
      if (conversation) {
        setSelectedConversation(conversation);
        setSearch("");
      }

		

    };


	return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-neutral text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};
export default SearchInput;
