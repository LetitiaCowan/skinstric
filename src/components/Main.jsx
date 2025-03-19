import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import arrowImg from "../assets/buttin-icon-shrunk (1).png";

const Main = () => {
  const titleRef1 = useRef(null);
  const titleRef2 = useRef(null);
  const tl = useRef(null);
  const tl2 = useRef(null);

  const [isLeftHidden, setIsLeftHidden] = useState(false);
  const [isRightHidden, setIsRightHidden] = useState(false);

  useEffect(() => {
    tl.current = gsap
      .timeline({ paused: true })
      .to(titleRef1.current, {
        x: "20vw",
        duration: 0.7,
        ease: "power2.out",
      })
      .to(
        titleRef2.current,
        {
          x: "25vw",
          duration: 0.7,
          ease: "power2.out",
        },
        "<"
      );

    tl2.current = gsap
      .timeline({ paused: true })
      .to(titleRef1.current, {
        x: "-20vw",
        duration: 0.7,
        ease: "power2.out",
      })
      .to(
        titleRef2.current,
        {
          x: "-25vw",
          duration: 0.7,
          ease: "power2.out",
        },
        "<"
      );

    return () => {
      tl.current.kill();
      tl2.current.kill();
    };
  }, []);

  return (
    <div className="min-h-[calc(100vh-100px)] max-w-[100vw] flex items-center justify-between relative">
      <div
        className={`transition-opacity duration-700 ${
          isLeftHidden ? " pointer-events-none" : "opacity-100"
        } flex flex-row items-center gap-[1rem] px-[16px]`}
      >
      {/* Left Section */}
        <button
        className={isLeftHidden ? " transition-opacity duration-700 opacity-0" : "opacity-100"}
          onMouseEnter={() => {
            tl.current.play();
            setIsRightHidden(true); // Hide right section
          }}
          onMouseLeave={() => {
            tl.current.reverse();
            setIsRightHidden(false); // Show right section
          }}
        >
          <img className="w-10 h-10 opacityAnimation" src={arrowImg} alt="arrow" />
        </button>
        <span className={isLeftHidden ? " transition-opacity duration-700 opacity-0" : "opacity-100"}>DISCOVER A.I.</span>
        <div className={`diamond-border-right ${isLeftHidden ? " transition-opacity duration-700 opacity-0" : null}`}></div>
      </div>

      {/* Title Section */}
      <div className="text-[100px] flex flex-col items-center font-thin text-center">
        <span ref={titleRef1}>Sophisticated</span>
        <span ref={titleRef2}>skincare</span>
      </div>

      <div
        className={`transition-opacity duration-700 ${
          isRightHidden ? "opacity-0 pointer-events-none" : "opacity-100"
        } flex flex-row items-center gap-[1rem] px-[16px]`}
      >
      {/* Right Section */}

        <div className="diamond-border-left"></div>
        <span>TAKE TEST</span>
        <button
          onMouseEnter={() => {
            tl2.current.play();
            setIsLeftHidden(true); // Hide left section
          }}
          onMouseLeave={() => {
            tl2.current.reverse();
            setIsLeftHidden(false); // Show left section
          }}
        >
          <img className="w-10 h-10 rotate-180 opacityAnimation" src={arrowImg} alt="arrow" />
        </button>
      </div>
    </div>
  );
};

export default Main;
