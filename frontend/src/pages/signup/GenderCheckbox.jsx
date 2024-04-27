// const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
//   return (
//     <div className="flex">
//       <div className="form-control">
//         <label
//           className={`label gap-2 cursor-pointer ${
//             selectedGender === "male" ? "selected" : ""
//           } `}
//         >
//           <span className="label-text">Male</span>
//           <input
//             type="checkbox"
//             className="checkbox border-slate-900"
//             checked={selectedGender === "male"}
//             onChange={() => onCheckboxChange("male")}
//           />
//         </label>
//       </div>
//       <div className="form-control">
//         <label
//           className={`label gap-2 cursor-pointer  ${
//             selectedGender === "female" ? "selected" : ""
//           }`}
//         >
//           <span className="label-text">Female</span>
//           <input
//             type="checkbox"
//             className="checkbox border-slate-900"
//             checked={selectedGender === "female"}
//             onChange={() => onCheckboxChange("female")}
//           />
//         </label>
//       </div>
//     </div>
//   );
// };
// export default GenderCheckbox;

// STARTER CODE FOR THIS FILE
// Define the GenderCheckbox component as a functional component
const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  return (
    // Container for the gender checkboxes, displayed in a row
    <div className="flex">
      {/* Male checkbox */}
      <div className="form-control">
        {/* Label and checkbox for Male option */}
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "male" ? "selected" : ""
          }`}
        >
          <span className="label-text">Male</span>
          {/* Input checkbox for Male */}
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            // Check if Male is selected
            checked={selectedGender === "male"}
            // Call onCheckboxChange function with "male" argument on change
            onChange={() => onCheckboxChange("male")}
          />
        </label>
      </div>

      {/* Female checkbox */}
      <div className="form-control">
        {/* Label and checkbox for Female option */}
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "female" ? "selected" : ""
          }`}
        >
          <span className="label-text">Female</span>

          <input
            type="checkbox"
            className="checkbox border-slate-900"
            // Check if Female is selected
            checked={selectedGender === "female"}
            // Call onCheckboxChange function with "female" argument on change
            onChange={() => onCheckboxChange("female")}
          />
        </label>
      </div>
    </div>
  );
};

// Export the GenderCheckbox component
export default GenderCheckbox;
