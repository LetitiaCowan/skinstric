import axios from "axios";
import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const Testing = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [submited, setSubmited] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const API_URL =
    "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne";

  const handleNextStep = () => {
    if (!name.trim()) {
      setMessage("Please enter your name.");
      return;
    }
    setMessage("");
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!location.trim()) {
      setMessage("Please enter your location.");
      return;
    }

    const testData = { name, location };
    setProcessed(true);

    console.log("Sending test data:", testData);

    try {
      const response = await axios.post(API_URL, testData);
      setSubmited(true);
      
      setTimeout(() => {
        setProcessed(false);
        setTimeout(() => {
          setShowBanner(true);
          
          setTimeout(() => {
            setShowBanner(false);
          }, 3000);
        }, 100);
      }, 2000);

      console.log("API Response:", response.data);
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      setMessage("Error sending data. Please try again.");
    }
  };


  
  const diamond = () => {
    return (
      <div className="z-[-100]">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 rotate-45  w-[250px] sm:w-[300px] h-[250px] sm:h-[300px] dotted-diamond"></span>
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 rotate-45  w-[300px] sm:w-[350px] h-[300px] sm:h-[350px] dotted-diamond"></span>
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 rotate-45  w-[350px] sm:w-[400px] h-[350px] sm:h-[400px] dotted-diamond"></span>
      </div>
    );
  };


  return (
    <div className="min-h-[calc(100vh-64px)] max-w-[100vw] font-bold px-8 py-4 flex justify-center relative">
      <p className="absolute left-6">TO START ANALYSIS</p>
      <div className="flex items-center justify-center flex-col">
        {processed ? (
          <Loading/>
        ) : (
          <>
            {step === 1 && (
              <>
                <p className="text-[10px] text-gray-400">CLICK TO TYPE</p>

                <div className="relative w-full flex justify-center max-w-[245px] border-b-2">
                  {diamond()}
                  <input
                    className="text-3xl text-black font-thin placeholder-black outline-none text-center w-auto "
                    placeholder="Introduce Yourself"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {message && (
                  <p className="text-red-500 text-sm mt-2">{message}</p>
                )}

                <button
                  onClick={handleNextStep}
                  className="flex items-center gap-6 absolute bottom-12 right-8"
                  aria-label="Next"
                >
                  <span className="text-gray-600">Next</span>
                  <div className="w-[44px] h-[44px] border border-black rotate-45 flex items-center justify-center">
                    <FaPlay className="-rotate-45" />
                  </div>
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <p className="text-[10px] text-gray-400">CLICK TO TYPE</p>

                <div className="relative w-full flex justify-center">
                {diamond()}

                  <input
                    className="text-3xl text-black font-thin placeholder-black max-w-[245px] border-b-2 outline-none text-center"
                    placeholder="Your Location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                {message && (
                  <p className="text-red-500 text-sm mt-2">{message}</p>
                )}

                {submited ? (
                  <> 
                    {submited && !processed && (
                      <div className={`fixed top-0 left-1/2 rounded-lg -translate-x-1/2 w-[300px] h-[100px] bg-white 
                        shadow-[0_0_25px_rgba(0,0,0,0.3)] transform transition-transform duration-500 
                        ease-in-out z-50 p-4 text-center ${
                          showBanner ? "translate-y-4" : "-translate-y-[500px]"
                        }`}>
                        <p>
                          Added {name} from {location}. Press Proceed to continue.
                        </p>
                      </div>
                    )}
                    <Link to="/results">
                      <button
                        onClick={handleSubmit}
                        className="flex items-center gap-6 absolute bottom-12 right-8"
                        aria-label="Submit"
                      >
                        <span className="text-gray-600">Proceed</span>
                        <div className="w-[44px] h-[44px] border border-black rotate-45 flex items-center justify-center">
                          <FaPlay className="-rotate-45" />
                        </div>
                      </button>
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="flex items-center gap-6 absolute bottom-12 right-8"
                    aria-label="Submit"
                  >
                    <span className="text-gray-600">Submit</span>
                    <div className="w-[44px] h-[44px] border border-black rotate-45 flex items-center justify-center">
                      <FaPlay className="-rotate-45" />
                    </div>
                  </button>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Testing;
