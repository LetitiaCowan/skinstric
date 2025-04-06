import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Demographics from "../components/Demographics";

const Final = () => {
  const location = useLocation();
  const data = location.state?.data;

  const [selectedCategory, setSelectedCategory] = useState("race");
  const [percentage, setPercentage] = useState(0);
  const [topRace, setTopRace] = useState('');
  const [topAge, setTopAge] = useState('');
  const [topGender, setTopGender] = useState('');

  const race = data?.race;
  const gender = data?.gender;
  const age = data?.age;

  useEffect(() => {
    setPercentage(60);
  }, []);

  const getSelectedData = () => {
    switch (selectedCategory) {
      case "race":
        return { race };
      case "age":
        return { age };
      case "gender":
        return { gender };
      default:
        return { race };
    }
  };

  // SVG circle properties
  const radius = 180; 
  const strokeWidth = 4; 
  const circumference = 2 * Math.PI * radius; 
  const progress = (percentage / 100) * circumference; 

  const renderTopResult = () => {
    if (selectedCategory === 'race') {
      return topRace;
    } else if (selectedCategory === 'age') {
      return topAge;
    } else if (selectedCategory === 'gender') {
      return topGender;
    }
  }

  return (
    <div className="font-thin min-h-[calc(100vh-64px)] h-[calc(100vh-64px)] max-w-[100vw] px-8 py-4 relative flex justify-center items-center flex-col">
      <div className="flex flex-col items-start justify-center w-full">
        <p className="text-sm">A.I. ANALYSIS</p>
        <h1 className="text-6xl font-normal">DEMOGRAPHICS</h1>
        <p className="text-sm text-gray-500">PREDICTED RACE & AGE</p>
      </div>
      <div className="flex flex-col items-center justify-center h-full relative gap-4 w-[672px]">
        <div className="flex items-center justify-center gap-4">
          <div className=" w-[200px] h-96 flex flex-col gap-3 font-bold ">
            <div
              className={` w-full  h-[90px] flex justify-around flex-col   border-t-2 border-gray-300  transition-all duration-100 ease-out ${
                selectedCategory === "race"
                  ? "bg-black text-white hover:bg-black"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedCategory("race")}
            >
              <h2>{topRace.toUpperCase()}</h2>
              <h2>RACE</h2>
            </div>
            <div
              className={` w-full  h-[90px] flex justify-around flex-col   border-t-2 border-gray-300 transition-all duration-100 ease-out ${
                selectedCategory === "age"
                  ? "bg-black text-white hover:bg-black"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedCategory("age")}
            >
              <h2>{topAge.toUpperCase()}</h2>
              <h2>AGE</h2>
            </div>
            <div
              className={` w-full  h-[90px] flex justify-around flex-col  border-t-2 border-gray-300 transition-all duration-300 ease-out ${
                selectedCategory === "gender"
                  ? "bg-black text-white hover:bg-black"
                  : "bg-gray-100 hover:bg-gray-200 "
              }`}
              onClick={() => setSelectedCategory("gender")}
            >
              <h2>{topGender.toUpperCase()}</h2>
              <h2>SEX</h2>
            </div>
          </div>
          <div className="bg-gray-100 border-gray-300 border-t-2 w-[650px] h-96 relative flex items-center justify-center">
            <h1 className="absolute top-2 left-3 font-thin text-2xl">{renderTopResult()}</h1>
                <svg
                  width="400"
                  height="400"
                  viewBox="0 0 500 500"
                  className="absolute right-0"
                >
                  <circle
                    cx="250"
                    cy="250"
                    r={radius}
                    fill="none"
                    stroke="rgb(229, 231, 235)" /* Tailwind bg-gray-200 */
                    strokeWidth={strokeWidth}
                  />
                  <circle
                    cx="250"
                    cy="250"
                    r={radius}
                    fill="none"
                    stroke="black"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress}
                    strokeLinecap="round"
                    transform="rotate(-90 250 250)" // Start from top
                  />
                </svg>

              <div className="absolute text-4xl font-bold right-[160px] font-thin">{percentage}%</div>
          </div>
          <Demographics 
            data={getSelectedData()} 
            setPercentage={setPercentage}
            setTopRace={setTopRace}
            setTopAge={setTopAge}
            setTopGender={setTopGender}
          />
        </div>
      </div>
    </div>
  );
};

export default Final;
