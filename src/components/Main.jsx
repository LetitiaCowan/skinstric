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
    <div className="min-h-[calc(100vh-64px)] max-w-[100vw] flex flex-col md:flex-row items-center justify-between relative overflow-hidden px-4 md:px-8">
      <div
        className={`transition-opacity duration-700 ${
          isLeftHidden ? "pointer-events-none" : "opacity-100"
        } flex flex-row items-center gap-[1rem] px-[16px] order-2 md:order-1`}
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
            setIsRightHidden(true);
          }}
          onMouseLeave={() => {
            tl.current.reverse();
            setIsRightHidden(false);
          }}
        >
          <img
            className="w-8 h-8 md:w-10 md:h-10 opacityAnimation"
            src={arrowImg}
            alt="arrow"
          />
        </button>
        <span
          className={
            isLeftHidden
              ? " transition-opacity duration-700 opacity-0"
              : "opacity-100 text-sm md:text-base"
          }
        >
          DISCOVER A.I.
        </span>
        <div
          className={`diamond-border-right hidden md:block ${
            isRightHidden ? "borderFade" : null
          }`}
        ></div>
      </div>

      {/* Title Section */}
      <div className="text-[40px] md:text-[60px] lg:text-[100px] flex flex-col items-center font-thin text-center order-1 md:order-2 my-8 md:my-0">
        <span ref={titleRef1}>Sophisticated</span>
        <span ref={titleRef2}>skincare</span>
      </div>

      <div
        className={`transition-opacity duration-700 ${
          isRightHidden ? " pointer-events-none" : "opacity-100"
        } flex flex-row items-center gap-[1rem] px-[16px] order-3`}
      >
        {/* Right Section */}
        <div
          className={`diamond-border-left hidden md:block ${
            isLeftHidden ? "borderFade" : ""
          }`}
        ></div>
        <span
          className={
            isRightHidden
              ? " transition-opacity duration-700 opacity-0"
              : "opacity-100 text-sm md:text-base"
          }
        >
          TAKE TEST
        </span>
        <Link
          to="/testing"
          className={
            isRightHidden
              ? " transition-opacity duration-700 opacity-0"
              : "opacity-100"
          }
          onMouseEnter={() => {
            tl2.current.play();
            setIsLeftHidden(true);
          }}
          onMouseLeave={() => {
            tl2.current.reverse();
            setIsLeftHidden(false);
          }}
        >
          <img
            className={`w-8 h-8 md:w-10 md:h-10 rotate-180 opacityAnimation`}
            src={arrowImg}
            alt="arrow"
          />
        </Link>
      </div>
      <p className="absolute bottom-0 left-0 mx-4 md:mx-10 my-4 md:my-10 text-sm md:text-base">
        Skinstric developed an A.I. that creates a <br className="hidden md:block" />
        highly-personalized routine tailored to <br className="hidden md:block" /> what your skin needs.
      </p>
    </div>
  );
};

export default Main;
