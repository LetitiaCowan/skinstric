import React from "react";

const DemographicSelector = ({
  selectedCategory,
  onSelect,
  topRace,
  topAge,
  topGender,
}) => {
  const categories = [
    { id: "race", label: "RACE", value: topRace },
    { id: "age", label: "AGE", value: topAge },
    { id: "gender", label: "SEX", value: topGender },
  ];

  return (
    <div className="w-full sm:max-w-[200px] flex flex-row sm:flex-col gap-3 font-bold h-full text-sm sm:text-[16px]">
      {categories.map(({ id, label, value }) => (
        <div
          key={id}
          className={`w-full h-[90px] flex justify-around flex-col border-t-2 border-black transition-all duration-100 cursor-pointer ease-out ${
            selectedCategory === id
              ? "bg-black text-white hover:bg-black"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => onSelect(id)}
        >
          <h2>{value.toUpperCase()}</h2>
          <h2>{label}</h2>
        </div>
      ))}
    </div>
  );
};

export default DemographicSelector;
