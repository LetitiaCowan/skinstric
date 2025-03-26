import React, { useEffect, useState } from "react";
import galleryIcon from "../assets/gallery.png";
import CameraCapture from "../hooks/cameraCapture";

const API_URL =
  "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo";

const Results = () => {
  const [img, setImg] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result;
      setImg(base64Image);

      // 1. Save the image to local storage
      window.localStorage.setItem("galler_img", base64Image);

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
    }
  }, [img]);

  return (
    <div className="min-h-[calc(100vh-64px)] h-[calc(100vh-64px)] font-bold max-w-[100vw] px-8 py-4 relative">
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
          <CameraCapture setImg={setImg} setShowCamera={setShowCamera} />
          {console.log(showCamera)}
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
    </div>
  );
};

export default Results;
