import React, { useEffect, useState } from "react";
import validator from 'validator';

const Home = () => {
  const [url, setUrl] = useState('');
  const [urlToDisplay, setUrlToDisplay] = useState('');
  const [showData, setShowData] = useState(false);
  const [history, setHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;

    // Call the validate function
    validate(value);

    // Update the input value
    setUrl(value);
  };

  const validate = (value) => {
    if (validator.isURL(value)) {
      setErrorMessage('Valid URL');
    } else {
      setErrorMessage('Invalid URL');
    }
  };

  const generateRandomURL = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const randomURL = Array.from({ length: 5 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
    return `https://${randomURL}.com`;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) {
      const randomURL = generateRandomURL();
      const updatedArray = [...history, { originalURL: url, shortenedURL: randomURL }];
      setHistory(updatedArray);
      localStorage.setItem("history", JSON.stringify(updatedArray));
      setUrlToDisplay(randomURL);
      setShowData(true);
      setTimeout(() => setShowData(false), 5000);
      setUrl("");
    }
  };

  useEffect(() => {
    const temp = localStorage.getItem("history");
    setHistory(temp ? JSON.parse(temp) : []);
  }, []);

  return (
    <div className="flex flex-col items-center mt-10">
      <label className="mb-2">URL</label>
      <input
        className="px-4 py-2 mb-2 border border-gray-300 rounded"
        value={url}
        onChange={handleChange}
      />
      <p className="text-red-500">{errorMessage}</p>
      <button
        className="px-4 py-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <a className="mt-2 text-blue-500" href="/history">
        History Page
      </a>
      {showData && <h1 className="mt-4">{urlToDisplay}</h1>}
    </div>
  );
};

export default Home;
