import React from "react";

const Header = () => {
  return (
    <div className="flex items-center justify-between h-[64px] w-full">
      <div className="flex items-center">
        <span className="px-[10px] mx-[15px] text-sm">SKINSTRIC</span>
        <div className="flex items-center opacity-50">
          <span className="text-lg relative top-[-1px]">[</span>
          <span className="px-[10px] text-[14px]">INTRO</span>
          <span className="text-lg relative top-[-1px]">]</span>
        </div>
      </div>
      <button className=" bg-black text-white text-[16px] px-4 py-2 rounded mx-[25px] xs:text-xs">
        ENTER CODE
      </button>
    </div>
  );
};

export default Header;
