"use client";
import React, { useState } from "react";
import Webcam from "react-webcam";

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

export default function WebcamCapture() {
  const webcamRef: any = React.useRef(null);
  const [image, setImage] = useState("");

  const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  let videoConstraints: MediaTrackConstraints = {
    facingMode: facingMode,
    width: 270,
    height: 480,
  };

  const handleClick = React.useCallback(() => {
    setFacingMode((prevState) =>
      prevState === FACING_MODE_USER
        ? FACING_MODE_ENVIRONMENT
        : FACING_MODE_USER
    );
  }, []);

  console.log(facingMode + videoConstraints);

  return (
    <>
      <div className="webcam-container">
        <div className="webcam-img">
          {image === "" ? (
            <Webcam
              className="webcam"
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              screenshotQuality={1}
            />
          ) : (
            <img
              src={image}
              alt="Scan"
              style={{ width: "500px", height: "auto" }}
            />
          )}
        </div>
        <button onClick={handleClick}>Switch camera</button>
      </div>
    </>
  );
}
