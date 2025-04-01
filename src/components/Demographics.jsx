import React, { use, useEffect } from "react";

const Demographics = ({ data, setPercentage, setTopResult }) => {
  const race = data?.race;
  const age = data?.age;
  const gender = data?.gender;

  useEffect(() => {
    if (race) {
      const highestRace = Object.entries(race).sort((a, b) => b[1] - a[1])[0];
      setTopResult(highestRace[0]);
    } else if (age) {
      const highestAge = Object.entries(age).sort((a, b) => b[1] - a[1])[0];
      setTopResult(highestAge[0]);
    } else if (gender) {
      const highestGender = Object.entries(gender).sort((a, b) => b[1] - a[1])[0];
      setTopResult(highestGender[0]);
    }
  }, [race, age, gender, setTopResult]);

  useEffect(() => {
    if (race) {
      // Get the highest percentage race
      const highestRacePercentage = Object.entries(race).sort(
        (a, b) => b[1] - a[1]
      )[0];
      setPercentage(Math.floor(highestRacePercentage[1] * 100));
    } else if (age) {
      const highestAgePercentage = Object.entries(age).sort(
        (a, b) => b[1] - a[1]
      )[0];
      setPercentage(Math.floor(highestAgePercentage[1] * 100));
    } else if (gender) {
      const highestGenderPercentage = Object.entries(gender).sort(
        (a, b) => b[1] - a[1]
      )[0];
      setPercentage(Math.floor(highestGenderPercentage[1] * 100));
    }
  }, [race, age, gender, setPercentage]);

  const handleItemClick = (value) => {
    setPercentage(Math.floor(value * 100));
  };

  const renderContent = () => {
    if (race) {
      return (
        <>
          <div className="flex items-center justify-between">
            <h2>RACE</h2>
            <h2>A.I. CONFIDENCE</h2>
          </div>
          <ul className="space-y-1">
            {Object.entries(race)
              .sort((a, b) => b[1] - a[1])
              .map(([key, value]) => (
                <li
                  key={key}
                  className="text-gray-700 flex justify-between cursor-pointer hover:bg-gray-200 p-1"
                  onClick={() => handleItemClick(value)}
                >
                  {key.replace(/_/g, " ")}:{" "}
                  <span className="font-bold">
                    {Math.floor((value * 100).toFixed(2))}%
                  </span>
                </li>
              ))}
          </ul>
        </>
      );
    }

    if (age) {
      return (
        <>
          <div className="flex items-center justify-between">
            <h2>AGE</h2>
            <h2>A.I. CONFIDENCE</h2>
          </div>
          <ul className="space-y-1">
            {Object.entries(age)
              .sort((a, b) => b[1] - a[1])
              .map(([key, value]) => (
                <li key={key} className="text-gray-700 flex justify-between">
                  {key.replace(/_/g, " ")}:{" "}
                  <span className="font-bold">
                    {" "}
                    {Math.floor((value * 100).toFixed(2))}%
                  </span>
                </li>
              ))}
          </ul>
        </>
      );
    }

    if (gender) {
      return (
        <>
          <div className="flex items-center justify-between">
            <h2>GENDER</h2>
            <h2>A.I. CONFIDENCE</h2>
          </div>
          <ul className="space-y-1">
            {Object.entries(gender)
              .sort((a, b) => b[1] - a[1])
              .map(([key, value]) => (
                <li key={key} className="text-gray-700 flex justify-between">
                  {key.replace(/_/g, " ")}:{" "}
                  <span className="font-bold">
                    {" "}
                    {Math.floor((value * 100).toFixed(2))}%
                  </span>
                </li>
              ))}
          </ul>
        </>
      );
    }
  };

  return (
    <div className="bg-gray-100 w-[300px] h-96 p-4 border-gray-300 border-t-2">
      {renderContent()}
    </div>
  );
};

export default Demographics;
