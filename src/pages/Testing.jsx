import React from "react";

const Testing = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] max-w-[100vw] font-bold px-8 py-4 flex justify-center ">
      <p className="absolute left-6">TO START ANALYSIS</p>
      <div className="max-w-[250px] flex items-center justify-center flex-col">
        <p className="text-sm">CLICK TO TYPE</p>
        <input className="text-lg max-w-[160px]" placeholder="introduce yourself " type="text" />
      </div>
    </div>
  );
};

export default Testing;
