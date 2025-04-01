import React from 'react'

const Demographics = ({ data }) => {
    const race = data?.race
    
    console.log(race)
  return (
    <div className="bg-gray-100 w-[300px] h-96">
         <ul className="space-y-1">
        {Object.entries(race).map(([key, value]) => (
          <li key={key} className="text-gray-700">
            {key.replace(/_/g, " ")}: <span className="font-bold">{(value * 100).toFixed(2)}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Demographics