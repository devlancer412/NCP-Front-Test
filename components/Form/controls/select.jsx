import React, { useState } from "react";

const Select = ({ name, value, items, handleChange, disabled = false }) => {
  const selected = value ? value : 0;
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    if (disabled) {
      return;
    }
    setExpanded(!expanded);
  };

  return (
    <label className="block">
      <span className="font-semibold text-slate-100">{name}</span>
      <div className=" relative ">
        <div className="w-64">
          <div className="mt-1 relative">
            <button
              type="button"
              onClick={toggleExpand}
              className="relative flex-1 bg-white bg-opacity-30 backdrop-blur-sm appearance-none w-full py-2 px-0 placeholder-gray-400 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              disabled={disabled}
            >
              <span className="flex items-center">
                <span className="ml-3 block truncate">{items[selected]}</span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </button>
            {expanded ? (
              <div className="absolute mt-1 w-full z-10 rounded-md shadow-lg">
                <ul
                  tabIndex="-1"
                  role="listbox"
                  aria-labelledby="listbox-label"
                  aria-activedescendant="listbox-item-3"
                  className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 bg-white overflow-auto focus:outline-none sm:text-sm bg-opacity-60 backdrop-blur-sm"
                >
                  {items.map((item, index) => {
                    return (
                      <li
                        id="listbox-item-1"
                        role="option"
                        key={index}
                        onClick={() => handleChange(index)}
                        className="text-gray-900 cursor-default select-none hover:bg-indigo-500 hover:text-white relative py-2 pl-3 pr-9"
                      >
                        <div className="flex items-center">
                          <span className="ml-3 block font-normal truncate">
                            {item}
                          </span>
                        </div>
                        {index === selected ? (
                          <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                            <svg
                              className="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </span>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </label>
  );
};

export default Select;
