import React, { useRef, useState } from "react";
import cameraIcon from "../assets/camera.png";

const CameraCapture = ({ setImg }) => {
  // Accept setImg as a prop
  const videoRef = useRef(null);
  const [capturing, setCapturing] = useState(false);

  const startCamera = async () => {
    try {
      // First set capturing to true so the video element renders
      setCapturing(true);
      
      // Wait for the next render cycle to ensure video element exists
      await new Promise(resolve => setTimeout(resolve, 100));

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      } else {
        stream.getTracks().forEach(track => track.stop());
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

    // Convert to base64 and include the data URL prefix
    const base64String = canvas.toDataURL("image/png");

    // Set the image in the parent component
    setImg(base64String); 

    window.localStorage.setItem("camera_img", base64String)

    // Stop the camera after capturing
    stopCamera();
  };

  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setCapturing(false);
  };

  return (
    <div className="z-20 relative">
      {!capturing ? (
        <button onClick={startCamera} className="cursor-pointer">
          <img className="w-[136px] h-[136px]" src={cameraIcon} alt="camera" />
        </button>
      ) : (
        <>
          <button onClick={startCamera} className="cursor-pointer">
          <img className="w-[136px] h-[136px]" src={cameraIcon} alt="camera" />
        </button>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline
            className="w-[600px] h-[600px] object-cover transform -scale-x-100"
          />
          <button 
            onClick={captureImage}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full"
          >
            Take Photo
          </button>
        </div>
        </>
        
      )}
    </div>
  );
};

export default CameraCapture;
