import React from 'react';

const DemographicData = ({ data, type, onSelect, setPercentage, selectedItem }) => {
  if (!data) return null;

  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);

  return (
    <>
      <div className="flex items-center justify-between ">
        <h2>{type.toUpperCase()}</h2>
        <h2>A.I. CONFIDENCE</h2>
      </div>
      <ul className="space-y-1 flex flex-row sm:flex-col">
        {entries.map(([key, value]) => (
          <li
            key={key}
            className={`flex justify-between cursor-pointer p-1 transition-all duration-100 ease-out ${
              selectedItem === key
                ? "bg-black text-white hover:bg-black"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => onSelect(key)}
          >
            {key
              .split('_')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')}
            : <span className={`${selectedItem === key ? "text-white" : "font-thin"}`}>{Math.floor(value * 100)}%</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default DemographicData; 