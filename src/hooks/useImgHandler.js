import { useState, useEffect } from "react";

const API_URL =
  "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo";

const useImageHandler = () => {
  const [base64Image, setBase64Image] = useState(null);
  const [demographics, setDemographics] = useState(null);

  // Load stored image when component mounts
  useEffect(() => {
    const savedImage = localStorage.getItem("uploadedImage");
    if (savedImage) {
      setBase64Image(savedImage);
    }
  }, []);

  // Convert image to Base64 and save to localStorage
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(",")[1]; // Extract Base64 string
        setBase64Image(base64String);
        localStorage.setItem("uploadedImage", base64String);
      };
    }
  };

  // Modified API call
  const analyzeImage = async () => {
    if (!base64Image) return alert("Please upload an image first!");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers if required by the API
        },
        body: JSON.stringify({
          image: base64Image,  // Changed from 'Image' to 'image'
          // Add any additional required fields the API might need
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      setDemographics(data.data);
      localStorage.setItem("demographicsData", JSON.stringify(data.data));
    } catch (error) {
      console.error("Error analyzing image:", error);
      alert("Failed to analyze image. Please try again.");
    }
  };

  return { base64Image, setBase64Image, demographics, handleImageUpload, analyzeImage };
};

export default useImageHandler;
