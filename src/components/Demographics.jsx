import React, { useState } from "react";
import DemographicData from "./DemographicData";

const Demographics = ({
  data,
  setPercentage,
  setTopRace,
  setTopAge,
  setTopGender,
}) => {
  const { race, age, gender } = data || {};
  const [selectedItems, setSelectedItems] = useState({
    race: null,
    age: null,
    gender: null
  });

  const handleDemographicSelect = (type, key) => {
    const formattedKey = key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    // Update the percentage based on the selected demographic
    const demographicData = { race, age, gender }[type];
    if (demographicData && demographicData[key]) {
      setPercentage(Math.floor(demographicData[key] * 100));
    }

    // Update selected items state
    setSelectedItems(prev => ({
      ...prev,
      [type]: key
    }));

    switch (type) {
      case "race":
        setTopRace(formattedKey);
        break;
      case "age":
        setTopAge(formattedKey);
        break;
      case "gender":
        setTopGender(formattedKey);
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-gray-100 w-full max-w-[300px] h-full p-4 border-black border-t-2 scale-90 sm:scale-100">

      
      {race && (
        <DemographicData
          data={race}
          type="race"
          onSelect={(key) => handleDemographicSelect("race", key)}
          setPercentage={setPercentage}
          selectedItem={selectedItems.race}
        />
      )}
      {age && (
        <DemographicData
          data={age}
          type="age"
          onSelect={(key) => handleDemographicSelect("age", key)}
          setPercentage={setPercentage}
          selectedItem={selectedItems.age}
        />
      )}
      {gender && (
        <DemographicData
          data={gender}
          type="gender"
          onSelect={(key) => handleDemographicSelect("gender", key)}
          setPercentage={setPercentage}
          selectedItem={selectedItems.gender}
        />
      )}
    </div>
  );
};

export default Demographics;
