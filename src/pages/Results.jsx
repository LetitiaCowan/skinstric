import React, { useEffect, useState } from "react";
import galleryIcon from "../assets/gallery.png";
import CameraCapture from "../hooks/cameraCapture";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom"; // ✅ Corrected import
import Loading from "../components/Loading";

const API_URL =
  "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo";

const Results = () => {
  const [img, setImg] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [finalisedData, setFinalisedData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result;
      setImg(base64Image);

      // Save image to localStorage
      window.localStorage.setItem("gallery_img", base64Image);

      // Upload to API
      uploadImageToAPI(base64Image);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToAPI = async (base64Image) => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Image }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
  
      const data = await response.json();
      console.log("Image uploaded successfully:", data);
      setFinalisedData(data);
  
      // ✅ Delay the loading state off by 3 seconds
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (img) {
      window.localStorage.setItem("uploadedImage_skintric", img);
      // Removed: uploadImageToAPI(img); ✅ Avoid double call
    }
  }, [img]);

  useEffect(() => {
    if (Object.keys(finalisedData).length > 0) {
      setTimeout(() => {
        setShowBanner(true);
      }, 3000);

      setTimeout(() => {
        setShowBanner(false);
      }, 9000);
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
        Thank you for submitting, press Process to continue.
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loading />
        </div>
      ) : (
        <>
          <p className="absolute left-6">TO START ANALYSIS</p>
          <div className="flex justify-around items-center sm:flex-row flex-col h-full">
            {/* Camera Upload */}
            <div className="flex items-center justify-center relative">
              <span className="border border-dotted border-[#A0A4AB]  sm:w-[250px] w-[200px] rotate-45 sm:h-[250px] h-[200px] absolute "></span>
              <span className="border border-dotted border-[#A0A4AB]  sm:w-[300px] w-[250px] rotate-45 sm:h-[300px] h-[250px] absolute opacity-60"></span>
              <span className="border border-dotted border-[#A0A4AB]  sm:w-[350px] w-[300px] rotate-45 sm:h-[350px] h-[300px] absolute opacity-30"></span>
              <span className="h-[67px] w-[2px] bg-black absolute left-[140px] bottom-[90px] rotate-45"></span>
              <p className="absolute text-sm top-[-50px] font-thin right-[-140px] w-[136px]">
                ALLOW A.I. TO SCAN YOUR FACE
              </p>
              <CameraCapture setImg={setImg} />
            </div>

            {/* Gallery Upload */}
            <div className="flex items-center justify-center relative">
              <span className="border border-dotted border-[#A0A4AB] sm:w-[250px] w-[200px] rotate-45 sm:h-[250px] h-[200px] absolute "></span>
              <span className="border border-dotted border-[#A0A4AB] sm:w-[300px] w-[250px] rotate-45 sm:h-[300px] h-[250px] absolute opacity-60"></span>
              <span className="border border-dotted border-[#A0A4AB] sm:w-[350px] w-[300px] rotate-45 sm:h-[350px] h-[300px] absolute opacity-30"></span>
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

          {/* Process Button */}
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
        </>
      )}
    </div>
  );
};

export default Results;
