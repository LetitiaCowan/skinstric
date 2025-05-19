import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Demographics from "../components/Demographics";
import DemographicSelector from "../components/DemographicSelector";
import ConfidenceCircle from "../components/ConfidenceCircle";

const Final = () => {
  const location = useLocation();
  const { race, gender, age } = location.state?.data || {};

  const [selectedCategory, setSelectedCategory] = useState("race");
  const [percentage, setPercentage] = useState(0);
  const [topRace, setTopRace] = useState('Unknown');
  const [topAge, setTopAge] = useState('Unknown');
  const [topGender, setTopGender] = useState('Unknown');
  const [categoryPercentages, setCategoryPercentages] = useState({
    race: 0,
    age: 0,
    gender: 0
  });

  useEffect(() => {
    // Set initial values based on the highest confidence values
    const setHighestValue = (data, setter, category) => {
      if (data) {
        const highest = Object.entries(data).sort((a, b) => b[1] - a[1])[0];
        const formattedValue = highest[0]
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        setter(formattedValue);
        setCategoryPercentages(prev => ({
          ...prev,
          [category]: Math.floor(highest[1] * 100)
        }));
      }
    };

    setHighestValue(race, setTopRace, 'race');
    setHighestValue(age, setTopAge, 'age');
    setHighestValue(gender, setTopGender, 'gender');
  }, [race, age, gender]);

  useEffect(() => {
    // Update percentage when category changes
    setPercentage(categoryPercentages[selectedCategory]);
  }, [selectedCategory, categoryPercentages]);

  const getSelectedData = () => {
    return { [selectedCategory]: { race, age, gender }[selectedCategory] };
  };

  const getSelectedLabel = () => {
    switch (selectedCategory) {
      case 'race':
        return topRace;
      case 'age':
        return topAge;
      case 'gender':
        return topGender;
      default:
        return 'Unknown';
    }
  };

  const handlePercentageUpdate = (newPercentage) => {
    setPercentage(newPercentage);
    setCategoryPercentages(prev => ({
      ...prev,
      [selectedCategory]: newPercentage
    }));
  };

  return (
    <div className="font-thin min-h-[calc(100vh-64px)] h-[calc(100vh-64px)] max-w-[100vw] px-4 sm:px-8 py-4 relative flex justify-center items-center flex-col">
      <div className="flex flex-col items-start justify-center w-full">
        <p className="text-sm">A.I. ANALYSIS</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal">DEMOGRAPHICS</h1>
        <p className="text-sm text-gray-500">PREDICTED RACE & AGE</p>
      </div>
      <div className="flex items-center justify-center h-full relative gap-4 w-full">
      <div className="flex sm:flex-row flex-col items-center justify-center h-[400px] relative gap-4 w-full">
          <DemographicSelector
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
            topRace={topRace}
            topAge={topAge}
            topGender={topGender}
          />
          <ConfidenceCircle
            percentage={percentage}
            label={getSelectedLabel()}
          />
          <Demographics
            data={getSelectedData()}
            setPercentage={handlePercentageUpdate}
            setTopRace={setTopRace}
            setTopAge={setTopAge}
            setTopGender={setTopGender}
          />
        </div>
      </div>
    </div>
  );
};

export default Final;
