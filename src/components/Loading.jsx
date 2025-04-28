import React from 'react'

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
    <div className="relative w-72 h-72">
      <div
        className="absolute opacity-30 inset-0 border-dotted border-2 border-black animate-spin rounded-sm"
        style={{ animationDuration: "8s" }}
      ></div>
      <div
        className="absolute opacity-30 inset-0 border-dotted border-2 border-black animate-spin rounded-sm"
        style={{ animationDuration: "7.5s" }}
      ></div>
      <div
        className="absolute opacity-30 inset-0 border-dotted border-2 border-black animate-spin rounded-sm"
        style={{ animationDuration: "7s" }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-gray-600 text-md text-center max-w-[150px]">
          Preparing your analysis...
        </p>
      </div>
    </div>
  </div>
  )
}

export default Loading