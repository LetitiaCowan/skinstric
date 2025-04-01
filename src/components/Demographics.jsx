import React from 'react'

const Demographics = ({ data }) => {
  // Check which type of data was passed
  const race = data?.race;
  const age = data?.age;
  const gender = data?.gender;

  const renderContent = () => {
    if (race) {
      return (
        <ul className="space-y-1">
          {Object.entries(race).map(([key, value]) => (
            <li key={key} className="text-gray-700">
              {key.replace(/_/g, " ")}: <span className="font-bold">{(value * 100).toFixed(2)}%</span>
            </li>
          ))}
        </ul>
      );
    }

    if (age) {
      return (
        <ul className="space-y-1">
          {Object.entries(age).map(([key, value]) => (
            <li key={key} className="text-gray-700">
              {key.replace(/_/g, " ")}: <span className="font-bold">{(value * 100).toFixed(2)}%</span>
            </li>
          ))}
        </ul>
      );
    }

    if (gender) {
      return (
        <ul className="space-y-1">
          {Object.entries(gender).map(([key, value]) => (
            <li key={key} className="text-gray-700">
              {key.replace(/_/g, " ")}: <span className="font-bold">{(value * 100).toFixed(2)}%</span>
            </li>
          ))}
        </ul>
      );
    }

    return <p>No data selected</p>;
  };

  return (
    <div className="bg-gray-100 w-[300px] h-96 p-4">
      {renderContent()}
    </div>
  );
}

export default Demographics