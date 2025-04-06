import axios from "axios";
import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router";

const Testing = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [submited, setSubmited] = useState(false);
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

    console.log("Sending test data:", testData);

    try {
      const response = await axios.post(API_URL, testData);
      setSubmited(true);

      console.log("API Response:", response.data);
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      setMessage("Error sending data. Please try again.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] max-w-[100vw] font-bold px-8 py-4 flex justify-center relative">
      <p className="absolute left-6">TO START ANALYSIS</p>
      <div className="flex items-center justify-center flex-col">
        <p className="text-[10px] text-gray-400">CLICK TO TYPE</p>
        {step === 1 && (
          <>
            <div className="relative w-full flex justify-center">
              <input
                className="text-3xl text-black font-thin placeholder-black outline-none text-center w-auto min-w-[50px] border-b-2"
                placeholder="Introduce Yourself"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {message && <p className="text-red-500 text-sm mt-2">{message}</p>}

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
            <div className="relative w-full flex justify-center">
              <input
                className="text-3xl text-black font-thin placeholder-black max-w-[245px] border-b-2 outline-none text-center"
                placeholder="Your Location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {message && <p className="text-red-500 text-sm mt-2">{message}</p>}

            {submited ? (
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
      </div>
    </div>
  );
};

export default Testing;
