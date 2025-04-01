import React, { useEffect, useState } from "react";
import galleryIcon from "../assets/gallery.png";
import CameraCapture from "../hooks/cameraCapture";
import { FaPlay } from "react-icons/fa";
import { Link, UNSAFE_FetchersContext } from "react-router";

const API_URL =
  "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo";

const Results = () => {
  const [img, setImg] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [finalisedData, setFinalisedData] = useState({});

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result;
      setImg(base64Image);

      // 1. Save the image to local storage
      window.localStorage.setItem("gallery_img", base64Image);

      // 2. Upload the image to your API
      uploadImageToAPI(base64Image);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // const uploadedImage = window.localStorage.getItem("uploadedImage_skintric")

  // console.log(uploadedImage)

  const uploadImageToAPI = async (base64Image) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Image }), // Adjust according to your API's request format
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      console.log("Image uploaded successfully:", data);
      setFinalisedData(data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    if (img) {
      // Save to localStorage
      window.localStorage.setItem("uploadedImage_skintric", img);
      // Upload to API
      uploadImageToAPI(img);
      setShowBanner(true);
    }

    setTimeout(() => {
      setShowBanner(false);
    }, 6000);
  }, [img]);

  useEffect(() => {
    if (Object.keys(finalisedData).length > 0) {
      console.log(finalisedData);
    }
  }, [finalisedData]);

  return (
    <div className="min-h-[calc(100vh-64px)] h-[calc(100vh-64px)] font-bold max-w-[100vw] px-8 py-4 relative">
      <div
        className={`absolute top-0 left-1/2 rounded-lg -translate-x-1/2 w-[300px] h-[100px] bg-white 
          shadow-[0_0_25px_rgba(0,0,0,0.3)] transform transition-transform duration-300 
          ease-in-out z-50 p-4 text-center ${
            showBanner ? "translate-y-0" : "-translate-y-[500px]"
          }`}
      >
        Thank you for submitting, press process to continue.
      </div>

      <p className="absolute left-6">TO START ANALYSIS</p>
      <div className="flex justify-around items-center h-full">
        <div className="flex items-center justify-center relative">
          <span className="border border-dotted border-[#A0A4AB] w-[250px] rotate-45 h-[250px] absolute "></span>
          <span className="border border-dotted border-[#A0A4AB] w-[300px] rotate-45 h-[300px] absolute opacity-60"></span>
          <span className="border border-dotted border-[#A0A4AB] w-[350px] rotate-45 h-[350px] absolute opacity-30"></span>
          <span className="h-[67px] w-[2px] bg-black absolute left-[140px] bottom-[90px] rotate-45"></span>
          <p className="absolute text-sm top-[-50px] font-thin right-[-140px] w-[136px]">
            ALLOW A.I. TO SCAN YOUR FACE
          </p>
          <CameraCapture setImg={setImg} />
        </div>
        <div className="flex items-center justify-center relative">
          <span className="border border-dotted border-[#A0A4AB] w-[250px] rotate-45 h-[250px] absolute "></span>
          <span className="border border-dotted border-[#A0A4AB] w-[300px] rotate-45 h-[300px] absolute opacity-60"></span>
          <span className="border border-dotted border-[#A0A4AB] w-[350px] rotate-45 h-[350px] absolute opacity-30"></span>
          <span className="h-[67px] w-[2px] bg-black absolute right-[140px] top-[90px] rotate-45"></span>
          <p className="absolute text-sm bottom-[-55px] left-[-125px] font-thin w-[200px]">
            ALLOW A.I. TO ACCESS YOUR GALLERY
          </p>

          <input
            className="absolute h-full w-full left-4 opacity-0 cursor-pointer"
            onChange={handleUpload}
            type="file"
          />
          <img className="w-[136px] h-[136px]" src={galleryIcon} alt="" />
        </div>
      </div>
      {Object.keys(finalisedData).length > 0 && (
        <Link
          to="/options"
          state={{ finalisedData }}
          className="flex items-center gap-6 absolute bottom-12 right-8"
          aria-label="Submit"
        >
          <span className="text-gray-600">Process</span>
          <div className="w-[44px] h-[44px] border border-black rotate-45 flex items-center justify-center">
            <FaPlay className="-rotate-45" />
          </div>
        </Link>
      )}
    </div>
  );
};

export default Results;
