import React from "react";

const Testing = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] max-w-[100vw] font-bold px-8 py-4 flex justify-center ">
      <p className="absolute left-6">TO START ANALYSIS</p>
      <div className="flex items-center justify-center flex-col">
        <p className="text-[10px] text-gray-400">CLICK TO TYPE</p>
        <input className="text-3xl text-black font-thin placeholder-black max-w-[245px] border-b-2 outline-none" placeholder="Introduce Yourself " type="text" />

      </div>
    </div>
  );
};

export default Testing;
