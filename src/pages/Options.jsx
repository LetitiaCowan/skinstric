import React from "react";
import { Link, useLocation } from "react-router-dom";

const Options = () => {
  const location = useLocation();
  const { data } = location.state?.finalisedData;
  console.log(data);
  return (
    <div className=" font-thin min-h-[calc(100vh-64px)] h-[calc(100vh-64px)] max-w-[100vw] px-8 py-4 relative">
      <div className="rotate-45 w-[300px] h-[300px] bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 grid grid-cols-2 grid-rows-2 gap-2 p-4">
        <Link
          state={{ data }}
          to="/final"
          className="  transition-all ease-in-out duration-300  bg-gray-100 hover:bg-gray-200  flex items-center justify-center"
        >
          <h2 className="text-sm -rotate-45">Demographics</h2>
        </Link>

        <div className=" transition-all ease-in-out duration-300  bg-gray-100 hover:bg-gray-200  flex items-center justify-center">
          <h2 className="text-sm -rotate-45">Skin type details</h2>
        </div>
        <div className=" transition-all ease-in-out duration-300  bg-gray-100 hover:bg-gray-200  flex items-center justify-center">
          <h2 className="text-sm -rotate-45">Cosmetic Concerns</h2>
        </div>
        <div className=" transition-all ease-in-out duration-300  bg-gray-100 hover:bg-gray-200  flex items-center justify-center">
          <h2 className="text-sm -rotate-45">Weather</h2>
        </div>
      </div>
    </div>
  );
};

export default Options;
