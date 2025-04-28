import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Options = () => {
  const [hovering, setHovering] = useState(false);
  const location = useLocation();
  const { data } = location.state?.finalisedData;

  const hoverEffect = () => {
    return (
      <>
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 rotate-45 sm:w-[350px] w-[330px]  sm:h-[350px] h-[330px] dotted-diamond"></span>
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 rotate-45 sm:w-[400px] w-[380px]  sm:h-[400px] h-[380px] dotted-diamond"></span>
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 rotate-45 sm:w-[450px] w-[430px]  sm:h-[450px] h-[430px] dotted-diamond"></span>
      </>
    );
  };

  return (
    <div className="font-thin min-h-[calc(100vh-64px)] h-[calc(100vh-64px)] max-w-[100vw] px-8 py-4 relative overflow-hidden">
      {/* Diamonds */}
      <div
        className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          hovering ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
        style={{ transitionProperty: "opacity, transform" }} // Important!
        >
        {hoverEffect()}
      </div>

      {/* Grid */}
      <div className="rotate-45 w-[320px] h-[320px] bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 grid grid-cols-2 grid-rows-2 gap-2 p-4">
        {[
          "Demographics",
          "Skin type details",
          "Cosmetic Concerns",
          "Weather",
        ].map((text, i) => (
          <Link
            key={i}
            to={text === "Demographics" ? "/final" : "#"}
            state={text === "Demographics" ? { data } : undefined}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="transition-all ease-in-out duration-300 bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
          >
            <h2 className="text-sm -rotate-45">{text}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Options;
