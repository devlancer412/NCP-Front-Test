import Router, { useRouter } from "next/router";
import Link from "next/link";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPointLeft,
  faImage,
  faPlayCircle,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

import { setError, setLoading } from "../../../store/actions/state";
import { getContentData } from "../../../services/content-api";
import Button from "../../../components/button/Button";
import { unLockPrivate } from "../../../store/actions/web3-api";

const defaultImage = (
  <div className="p-[2px] rounded-lg border-solid border-slate-700 border-2 group relative">
    <div className="flex flex-col justify-center align-middle text-center text-white h-40 text-3xl rounded-lg bg-slate-700">
      <FontAwesomeIcon icon={faImage} />
    </div>
    <span className="text-md absolute top-2 right-3 text-white">
      <FontAwesomeIcon icon={faLock} />
    </span>
  </div>
);

const defaultVideo = (
  <div className="p-[2px] rounded-lg border-solid border-slate-700 border-2 group relative">
    <div className="flex flex-col justify-center align-middle text-center text-white h-40 text-3xl rounded-lg bg-slate-700">
      <FontAwesomeIcon icon={faPlayCircle} />
    </div>
    <span className="text-md absolute top-2 right-3 text-white">
      <FontAwesomeIcon icon={faLock} />
    </span>
  </div>
);

const ContentViewer = (props) => {
  const router = useRouter();
  const { contentId } = router.query;
  const address = useSelector((store) => store.state.address);

  const [ownerMode, setOwnerMode] = useState(false);
  const [content, setContent] = useState({
    content_id: "",
    meta: {
      name: "",
      description: "",
    },
    content: [],
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (!address) {
      dispatch(setError("Please connect wallet"));
      Router.push("/");
    }
  });

  console.log(content);

  useEffect(async () => {
    dispatch(setLoading(true));
    const unLockResult = await unLockPrivate(address, contentId);
    dispatch(setLoading(false));

    console.log(unLockResult);
    if (unLockResult.success) {
      setOwnerMode(true);
      setContent(unLockResult.data);
      return;
    }

    dispatch(setError(unLockResult.data));
    dispatch(setLoading(true));
    const result = await getContentData(contentId);
    dispatch(setLoading(false));
    if (!result.success) {
      dispatch(setError(result.data));
      return;
    }

    setContent(result.data);
  }, [contentId]);

  return (
    <main className="flex flex-col w-full flex-1">
      <div className="header top-0 backdrop-blur-sm bg-opacity-30 bg-indigo-300 w-full z-10 flex items-center pl-5">
        <span className="flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
        <h1 className="text-3xl font-bold leading-loose px-5">
          Content Detail
        </h1>
      </div>
      <div className="flex flex-col justify-center items-start flex-1 container m-auto border-2 rounded-md border-slate-800 p-5 my-5">
        <img
          src={
            content.content.filter((ele) => ele.name == "banner-image")[0]?.url
          }
          className="w-full p-1 "
        />
        <div className="Title p-5">
          <div className="w-full">Title : {content.meta.name}</div>
          <div className="w-full">ContentId : {contentId}</div>
          <div className="w-full">Description : {content.meta.description}</div>
        </div>
        <div className="main flex flex-col w-full p-5 border-y-2 border-gray-700 h-full flex-1">
          {content.content
            .filter((ele) => ele.name != "banner-image")
            .map((element, index) => {
              return (
                <div
                  className="content-view flex flex-row-reverse w-full mb-10 justify-between"
                  key={index}
                >
                  <div className="content-detail w-96 flex flex-col justify-between pr-5">
                    <div className="content-header flex flex-col w-full">
                      <div className="content-name w-full text-xl">
                        <div className="w-full">Name: {element.name}</div>
                        <div className="w-full">
                          Type: {element.content_type}
                        </div>
                      </div>
                    </div>
                    <div className="content-edit flex flex-row justify-between font-semibold">
                      <div className="content-ct flex flex-row justify-start">
                        {element.private ? "Protected" : "Public"}
                      </div>
                      <div className="content-ct flex flex-row justify-end"></div>
                    </div>
                  </div>
                  <div className="content-preview w-1/3">
                    {element.content_type.substr(0, 5) === "image" ? (
                      ownerMode && !element.private ? (
                        <img src={element.url} />
                      ) : (
                        defaultImage
                      )
                    ) : null}
                    {element.content_type.substr(0, 5) === "video" ? (
                      ownerMode || !element.private ? (
                        <ReactPlayer src={element.url} />
                      ) : (
                        defaultVideo
                      )
                    ) : null}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="footer p-5 w-full bg-indigo-300 bg-opacity-60 backdrop-blur-sm">
        <Link href="/content/">
          <div className="float-left w-full sm:w-auto">
            <Button
              size="base"
              icon={<FontAwesomeIcon icon={faHandPointLeft} />}
              text="Ge Back"
              className="border-0 bg-[#3E5E93] text-white py-1 w-full sm:w-48"
            />
          </div>
        </Link>
        {/* <div className="float-left">
          <Button
            size="base"
            icon={<FontAwesomeIcon icon={faPlus} />}
            text="Add Blob"
            onClick={addBlobHandle}
            className="border border-2 border-indigo-200 text-indigo-600 py-1 w-52"
          />
        </div>
        <div className="float-right">
          <Button
            size="base"
            icon={<FontAwesomeIcon icon={faUpload} />}
            text="Upload Content"
            onClick={uploadContentBlobHandle}
            className="border border-2 border-green-200 text-green-600 py-1 w-52"
          />
        </div> */}
      </div>
    </main>
  );
};

export default ContentViewer;
