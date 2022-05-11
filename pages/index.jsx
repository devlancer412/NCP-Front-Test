import Link from "next/link";

import Button from "../components/button/Button";

export default function Home() {
  return (
    <main className="flex flex-col w-full flex-1 px-5">
      <div className="main flex flex-col justify-center items-center w-full p-5 border-y-2 border-[#e6e6e6] h-full flex-1">
        <h1 className="font-bold w-fit text-[60px] text-white text-center border-b-solid border-b-8 border-b-blue-300 bg-black bg-opacity-20 px-5 rounded-t-[50px]">
          <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-50 text-transparent">
            WELCOME TO LOREM
          </span>
        </h1>
        <Link href="/content/">
          <Button
            text="GET STARTED"
            className="mt-[50px] !text-[36px] mb-[100px] border-none rounded-full bg-gradient-to-r from-[#ffffff66] to-[#00000088] hover:bg-opacity-60 text-white hover:from-[#00000088] hover:to-[#ffffff66] px-10 py-6 transition-all duration-300"
          />
        </Link>
      </div>
    </main>
  );
}
