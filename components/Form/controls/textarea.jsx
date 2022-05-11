import React from "react";

const TextArea = ({ name, value, handleChange, placeholder, className }) => {
  const classStr = `flex-1 appearance-none w-full py-2 px-4 placeholder-slate-500 bg-white bg-opacity-40 backdrop-blur-sm shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-slate-800 ${className}`;
  return (
    <label className="block mb-4">
      <span className="font-semibold text-slate-100">{name}</span>
      <div className=" relative ">
        <textarea
          type="text"
          className={classStr}
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value)}
        >
          {value}
        </textarea>
      </div>
    </label>
  );
};

export default TextArea;
