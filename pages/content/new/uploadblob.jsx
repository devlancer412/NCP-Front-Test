import Router from "next/router";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUpload, faTrash } from "@fortawesome/free-solid-svg-icons";

import Button from "../../../components/button/Button";
import Input from "../../../components/Form/controls/input";
import Select from "../../../components/Form/controls/select";

import { setError } from "../../../store/actions/state";

import {
  addBlob,
  clearContent,
  removeBlob,
  setContentName,
  setContentDescription,
  updateBlob,
  updateBlobLink,
} from "../../../store/actions/content";

import ImageDropZone from "../../../components/dropzone/image";
import VideoDropZone from "../../../components/dropzone/video";
import {
  getNewContentId,
  uploadContentBlobs,
} from "../../../store/actions/content";

const BlobTypes = ["Video", "Image"];

const BlobUploadManager = () => {
  const name = useSelector((store) => store.content.name);
  const description = useSelector((store) => store.content.description);
  const contentId = useSelector((store) => store.content.contentId);
  const address = useSelector((store) => store.state.address);
  const blobs = useSelector((store) => store.content.blobs);
  const finished = useSelector((store) => store.content.finished);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!address) {
      dispatch(setError("Please connect wallet"));
      Router.push("/");
    }
  });

  useEffect(() => {
    if (address) {
      dispatch(getNewContentId());
    }
  }, [address]);

  useEffect(() => {
    if (finished) {
      dispatch(clearContent());
    }
  }, [finished]);

  const addBlobHandle = () => {
    if (blobs.filter((item) => item.name === "").length) {
      return dispatch(setError("There is an item is empty"));
    }

    dispatch(
      addBlob({
        name: "",
        link: "",
        type: "Video",
        protected: false,
        editable: true,
      })
    );
  };

  const updateBlobHandle = (index, item) => {
    if (
      blobs.filter((ele, eleIndex) => {
        return ele.name === item.name && eleIndex != index;
      }).length
    ) {
      return dispatch(setError("There is an item has same name"));
    }

    dispatch(updateBlob(index, item));
  };

  const updateProtectedHandle = (index, flag) => {
    updateBlobHandle(index, { ...blobs[index], protected: flag });
  };

  const updateBlobType = (index, value) => {
    dispatch(updateBlob(index, { ...blobs[index], type: value }));
  };

  const uploadContentBlobHandle = async () => {
    if (!address) {
      return dispatch(
        setError("You can't upload. Please connect to your wallet.")
      );
    }

    dispatch(uploadContentBlobs(name, address, contentId, description, blobs));
  };

  return (
    <main className="flex flex-col w-full flex-1">
      <div className="header top-0 backdrop-blur-sm bg-opacity-30 bg-indigo-300 w-full z-10 flex items-center pl-5">
        <span className="flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
        <h1 className="text-3xl font-bold leading-loose px-5">Upload Blob</h1>
      </div>
      <div className="Title p-5">
        <Input
          name="Title"
          value={name}
          handleChange={(value) => dispatch(setContentName(value))}
          placeholder="Rick and Morty Season 1"
          className="w-full md:w-1/2"
        />
        <Input
          name="Description"
          value={description}
          handleChange={(description) =>
            dispatch(setContentDescription(description))
          }
          placeholder="...."
          className="w-full md:w-2/3"
        />
      </div>
      <div className="main flex flex-col w-full border-y-2 border-[#e6e6e6] h-full flex-1">
        {blobs.map((element, index) => {
          return (
            <div
              className="border-b-[2px] border-b-[#ffffff55] last:border-none px-5 py-8 content-view flex flex-col md:flex-row w-full justify-between"
              key={`${contentId}-${index}`}
            >
              <div className="content-detail w-full md:w-96 flex flex-col justify-between pr-5">
                <div className="content-header flex flex-col w-full">
                  <div className="content-name w-full">
                    <Input
                      name="Name"
                      value={element.name}
                      handleChange={(nname) =>
                        updateBlobHandle(index, {
                          ...element,
                          name: nname,
                        })
                      }
                      placeholder="poster-image"
                      className="w-full"
                      disabled={!element.editable}
                    />
                    <Select
                      name="Type"
                      value={BlobTypes.indexOf(element.type)}
                      items={BlobTypes}
                      handleChange={(value) =>
                        updateBlobType(index, BlobTypes[value])
                      }
                      disabled={!element.editable}
                    />
                  </div>
                </div>
                <div className="content-edit flex flex-row justify-between font-semibold">
                  <div className="content-ct flex flex-row justify-start">
                    <label className="inline-flex justify-between items-center">
                      {element.editable ? (
                        <>
                          <input
                            type="checkbox"
                            name="type"
                            value={element.protected}
                            onChange={() =>
                              updateProtectedHandle(index, !element.protected)
                            }
                          />
                          <span className="ml-2">Protected</span>
                        </>
                      ) : (
                        <div>{element.protected ? "Protected" : "Public"}</div>
                      )}
                    </label>
                  </div>
                  <div className="content-ct flex flex-row justify-end">
                    {element.editable ? (
                      <Button
                        size="base"
                        icon={<FontAwesomeIcon icon={faTrash} />}
                        text=""
                        onClick={() => dispatch(removeBlob(index))}
                        className="bg-transparent text-rose-800 border-red-300 py-1 px-2 pl-4"
                      />
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="content-preview w-full mt-2 md:mt-0 md:w-1/3">
                {element.type === "Image" ? (
                  <ImageDropZone
                    file={element.link}
                    fileHandle={(link) => dispatch(updateBlobLink(index, link))}
                  />
                ) : null}
                {element.type === "Video" ? (
                  <VideoDropZone
                    file={element.link}
                    fileHandle={(link) => dispatch(updateBlobLink(index, link))}
                  />
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
      <div className="footer p-5 w-full bg-indigo-300 bg-opacity-60 backdrop-blur-sm">
        <div className="float-left w-full sm:w-auto">
          <Button
            size="base"
            icon={<FontAwesomeIcon icon={faPlus} />}
            text="Add Blob"
            onClick={addBlobHandle}
            className="border-0 bg-[#3E5E93] text-white py-1 w-full sm:w-48"
          />
        </div>
        <div className="float-right w-full sm:w-auto">
          <Button
            size="base"
            icon={<FontAwesomeIcon icon={faUpload} />}
            text="Upload Content"
            onClick={uploadContentBlobHandle}
            className="border-0 bg-[#3E5E93] text-white text-opacity-70 py-1 w-full sm:w-48"
          />
        </div>
      </div>
    </main>
  );
};

export default BlobUploadManager;
