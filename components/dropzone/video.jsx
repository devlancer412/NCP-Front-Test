import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from "react-player";

const VideoDropZone = ({ file, fileHandle }) => {
  const [src, setSrc] = useState(file);

  useEffect(() => {
    fileHandle(src);
  }, [src]);

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];

    setSrc((window.webkitURL || window.URL).createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "video/*",
  });

  return (
    <div className="p-[2px] rounded-lg border-solid border-slate-700 border-2 group">
      <div className="w-full bg-gray-600 rounded-lg h-full">
        <div
          className="w-full h-full flex flex-col justify-center text-3xl"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {src ? (
            <ReactPlayer url={src} controls width="100%" height="100%" />
          ) : (
            <div className="flex flex-col justify-center align-middle text-center text-white h-40">
              <FontAwesomeIcon icon={faPlayCircle} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoDropZone;
