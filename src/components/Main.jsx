import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import arrowImg from "../assets/buttin-icon-shrunk (1).png";
import { Link } from "react-router";

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
    <div className="min-h-[calc(100vh-64px)] max-w-[100vw] flex items-center justify-between relative">
      <div
        className={`transition-opacity duration-700 ${
          isLeftHidden ? "pointer-events-none" : "opacity-100"
        } flex flex-row items-center gap-[1rem] px-[16px]`}
      >
        {/* Left Section */}
        <button
          className={
            isLeftHidden
              ? " transition-opacity duration-700 opacity-0"
              : "opacity-100"
          }
          onMouseEnter={() => {
            tl.current.play();
            setIsRightHidden(true); // Hide right section
          }}
          onMouseLeave={() => {
            tl.current.reverse();
            setIsRightHidden(false); // Show right section
          }}
        >
          <img
            className="w-10 h-10 opacityAnimation"
            src={arrowImg}
            alt="arrow"
          />
        </button>
        <span
          className={
            isLeftHidden
              ? " transition-opacity duration-700 opacity-0"
              : "opacity-100"
          }
        >
          DISCOVER A.I.
        </span>
        <div
          className={`diamond-border-right ${
            isRightHidden ? "borderFade" : null
          }`}
        ></div>
      </div>

      {/* Title Section */}
      <div className="text-[100px] flex flex-col items-center font-thin text-center">
        <span ref={titleRef1}>Sophisticated</span>
        <span ref={titleRef2}>skincare</span>
      </div>

      <div
        className={`transition-opacity duration-700 ${
          isRightHidden ? " pointer-events-none" : "opacity-100"
        } flex flex-row items-center gap-[1rem] px-[16px]`}
      >
        {/* Right Section */}
        {/* {console.log(isRightHidden)} */}
        {console.log(isLeftHidden)}

        <div
          className={`diamond-border-left ${isLeftHidden ? "borderFade" : ""}`}
        ></div>
        <span
          className={
            isRightHidden
              ? " transition-opacity duration-700 opacity-0"
              : "opacity-100"
          }
        >
          TAKE TEST
        </span>
        <Link to="/testing"
          className={
            isRightHidden
              ? " transition-opacity duration-700 opacity-0"
              : "opacity-100"
          }
          onMouseEnter={() => {
            tl2.current.play();
            setIsLeftHidden(true); // Hide left section
          }}
          onMouseLeave={() => {
            tl2.current.reverse();
            setIsLeftHidden(false); // Show left section
          }}
        >
          <img
            className={`w-10 h-10 rotate-180 opacityAnimation`}
            src={arrowImg}
            alt="arrow"
          />
        </Link>
      </div>
      <p className="absolute bottom-0 left-0 mx-10 my-10">
        Skinstric developed an A.I. that creates a <br/>highly-personalized routine
        tailored to <br/> what your skin needs.
      </p>
    </div>
  );
};

export default Main;
