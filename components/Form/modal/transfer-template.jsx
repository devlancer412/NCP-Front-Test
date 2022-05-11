import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

import Input from "../controls/input";
import Button from "../../button/Button";

const TransferModalContent = ({ content, handleSubmit }) => {
  const [destAddress, setDestAddress] = useState("");

  return (
    <div className="w-full h-[350px] flex flex-col justify-between text-left">
      <div className="header w-full flex flex-col">
        <h1 className="w-full text-3xl font-bold text-black">
          {content.meta.name}
        </h1>
        <span className="w-full break-words mt-3">
          {content.meta.description}
        </span>
        <span className="w-full break-words mt-3">{content.content_id}</span>
      </div>
      <div className="body w-full flex-1 flex flex-col justify-center pb-5">
        <label
          for="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Destination Address
        </label>
        <input
          type="text"
          value={destAddress}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="0x00..."
          onChange={(e) => setDestAddress(e.target.value)}
          required
        />
        <span className="w-full text-gray-400 italic">
          Transferring the distribution rights will prevent you from minting new
          copies of the content
        </span>
      </div>
      <div className="w-full flex flex-row justify-end">
        <Button
          size="base"
          icon={<FontAwesomeIcon icon={faExternalLinkAlt} />}
          text="Transfer"
          onClick={() => handleSubmit(content.content_id, destAddress)}
          className="border-0 bg-[#0d99ff] text-white py-1 w-40"
        />
      </div>
    </div>
  );
};

export default TransferModalContent;
