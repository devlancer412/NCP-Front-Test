import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectWallet } from "../../store/actions/web3-api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogleWallet } from "@fortawesome/free-brands-svg-icons";

const WalletConnectBtn = () => {
  const address = useSelector((store) => store.state.address);
  const dispatch = useDispatch();

  const connectHandle = () => {
    dispatch(connectWallet());
  };

  const str = address
    ? address.substr(0, 5) + "..." + address.substr(address.length - 5, 5)
    : "Connect";

  const smallStr = address ? (
    <FontAwesomeIcon className="text-blue" icon={faGoogleWallet} />
  ) : (
    <FontAwesomeIcon className="text-red" icon={faGoogleWallet} />
  );

  return (
    <>
      <div
        className="leading-loose rounded-lg bg-red-400 hover:bg-red-500 bg-opacity-80 text-white cursor-pointer w-32 text-center absolute top-[15px] right-5 hidden sm:block md:w-44 z-20"
        onClick={connectHandle}
      >
        {str}
      </div>
      <div
        className="leading-loose rounded-lg bg-[#FF24BD] bg-opacity-80 text-white cursor-pointer text-center absolute top-5 right-5 hover:animate-bounce block sm:hidden px-2 z-20"
        onClick={connectHandle}
      >
        {smallStr}
      </div>
    </>
  );
};

export default WalletConnectBtn;
