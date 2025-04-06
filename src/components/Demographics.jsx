import React, { useEffect } from "react";

const Demographics = ({
  data,
  setPercentage,
  setTopRace,
  setTopAge,
  setTopGender,
}) => {
  const race = data?.race;
  const age = data?.age;
  const gender = data?.gender;

  useEffect(() => {
    if (race) {
      const highestRace = Object.entries(race).sort((a, b) => b[1] - a[1])[0];
      setTopRace(
        highestRace[0]
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      );
    } else if (age) {
      const highestAge = Object.entries(age).sort((a, b) => b[1] - a[1])[0];
      setTopAge(
        highestAge[0]
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      );
    } else if (gender) {
      const highestGender = Object.entries(gender).sort(
        (a, b) => b[1] - a[1]
      )[0];
      setTopGender(
        highestGender[0]
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      );
    }
  }, [race, age, gender, setTopRace, setTopAge, setTopGender]);

  useEffect(() => {
    if (race) {
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

  const handleActualDemographics = (key) => {
    if (race) {
      setTopRace(key);
    } else if (age) {
      setTopAge(key);
    } else if (gender) {
      setTopGender(key);
    }
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
                  onClick={() =>
                    handleActualDemographics(
                      key.charAt(0).toUpperCase() + key.slice(1)
                    )
                  }
                >
                  {key
                    .replace(/_/g, " ")
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                  :{" "}
                  <span className="font-thin">
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
                <li
                  key={key}
                  className="text-gray-700 flex justify-between hover:bg-gray-200 p-1"
                  onClick={() => handleActualDemographics(key)}
                >
                  {key
                    .replace(/_/g, " ")
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                  :{" "}
                  <span className="font-thin">
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
                <li
                  key={key}
                  className="text-gray-700 flex justify-between hover:bg-gray-200 p-1"
                  onClick={() =>
                    handleActualDemographics(
                      key.charAt(0).toUpperCase() + key.slice(1)
                    )
                  }
                >
                  {key
                    .replace(/_/g, " ")
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                  :{" "}
                  <span className="font-thin">
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
