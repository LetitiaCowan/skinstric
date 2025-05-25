import React, { useState, useEffect } from 'react';

const ConfidenceCircle = ({ percentage, label }) => {
  const [size, setSize] = useState(() => {
    if (window.innerWidth < 640) return 'xs';
    if (window.innerWidth < 768) return 'sm';
    if (window.innerWidth < 1024) return 'md';
    if (window.innerWidth < 1280) return 'lg';
    return 'xl';
  });
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setSize('xs');
      else if (window.innerWidth < 768) setSize('sm');
      else if (window.innerWidth < 1024) setSize('md');
      else if (window.innerWidth < 1280) setSize('lg');
      else setSize('xl');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getDimensions = () => {
    switch (size) {
      case 'xs':
        return { radius: 100, svgSize: "250" };
      case 'sm':
        return { radius: 120, svgSize: "300" };
      case 'md':
        return { radius: 140, svgSize: "350" };
      case 'lg':
        return { radius: 160, svgSize: "380" };
      case 'xl':
        return { radius: 180, svgSize: "400" };
      default:
        return { radius: 180, svgSize: "400" };
    }
  };

  const { radius, svgSize } = getDimensions();
  const strokeWidth = 4;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;

  return (
    <div className="bg-gray-100 border-black border-t-2 w-full sm:max-w-[650px] h-full min-h-[150px] relative">
      <h1 className="absolute top-2 left-3 font-thin text-2xl">{label}</h1>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <svg
          width={svgSize}
          height={svgSize}
          viewBox="0 0 500 500"
          className="relative"
        >
          <circle
            cx="250"
            cy="250"
            r={radius}
            fill="none"
            stroke="rgb(229, 231, 235)"
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
            transform="rotate(-90 250 250)"
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-thin">
          {percentage}%
        </div>
      </div>
    </div>
  );
};

export default ConfidenceCircle; 