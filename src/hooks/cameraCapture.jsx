import React, { useRef, useState } from "react";
import cameraIcon from "../assets/camera.png";
import groupIcon from "../assets/Group 40037.png";
const CameraCapture = ({ setImg }) => {
  const videoRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [showPermissionPanel, setShowPermissionPanel] = useState(false);

  const startCamera = async () => {
    try {
      setCapturing(true);

      await new Promise((resolve) => setTimeout(resolve, 100));

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      } else {
        stream.getTracks().forEach((track) => track.stop());
        setCapturing(false);
        console.error("Video element not ready");
      }
    } catch (error) {
      setCapturing(false);
      console.error("Error accessing camera:", error);
    }
  };

  const captureImage = () => {
    const canvas = document.createElement("canvas");
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64String = canvas.toDataURL("image/png");

    setImg(base64String);

    window.localStorage.setItem("camera_img", base64String);

    stopCamera();
  };

  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setCapturing(false);
  };

  const handleAccessPanel = () => {
    setShowPermissionPanel(true);
  };

  const handleAllowCamera = async () => {
    setShowPermissionPanel(false);
    await startCamera();
  };

  const handleDenyCamera = () => {
    setShowPermissionPanel(false);
  };

  const renderDiamond = () => {
    return (
      <div className="w-[8px] h-[8px] rotate-45  border-1 border border-white">

        </div>
    );
  };

  return (
    <div className="z-20 relative">
      {!capturing ? (
        <button onClick={handleAccessPanel} className="cursor-pointer">
          <img className="w-[136px] h-[136px]" src={cameraIcon} alt="camera" />
        </button>
      ) : (
        <>
          <button onClick={handleAccessPanel} className="cursor-pointer">
            <img
              className="w-[136px] h-[136px]"
              src={cameraIcon}
              alt="camera"
            />
          </button>
          <div className="fixed inset-0 w-screen h-screen bg-white">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-contain transform -scale-x-100"
            />

            <button
              onClick={captureImage}
              className="absolute top-1/2 right-[290px] transform -translate-y-1/2 px-6 py-2 flex items-center justify-center text-white rounded-lg "
            >

              <h1 className="mr-5">TAKE PICTURE</h1>
              <span className="w-[62px] h-[62px]">
                <img src={groupIcon} alt="group" />
              </span>
            </button>
            <div className="absolute flex-col bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[50px] mb-10 flex items-center justify-between">
              <p className="text-white font-thin text-xs">
                TO GET BETTER RESULTS MAKE SURE TO HAVE
              </p>
              <div className="flex gap-5">
                <span className="flex items-center gap-2" >
                  {renderDiamond()}
                <p className="text-white font-thin text-xs">
                  NEUTRAL EXPRESSION
                </p>
                </span>
              
                <span className="flex items-center gap-2">
                  {renderDiamond()}
                <p className="text-white font-thin text-xs">
                  FRONTAL POSE
                </p>
                </span>
              
                <span className="flex items-center gap-2">
                  {renderDiamond()}
                <p className="text-white font-thin text-xs">
                  ADEQUATE LIGHTING
                </p>
                </span>
              
              </div>
            </div>
          </div>
        </>
      )}

      {showPermissionPanel && (
        <div className="bg-black w-[300px] h-[130px] flex flex-col justify-between absolute top-0 left-[175px]">
          <h1 className="text-white text-sm font-thin m-3">
            ALLOW A.I. TO ACCESS YOUR CAMERA
          </h1>
          <div className=" border-t border-white w-full h-[30px] text-right">
            <button
              onClick={handleAllowCamera}
              className="text-white text-xs font-thin px-5"
            >
              ALLOW
            </button>
            <button
              onClick={handleDenyCamera}
              className="text-white text-xs font-thin px-5"
            >
              DENY
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
