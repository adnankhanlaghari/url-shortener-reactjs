import React, { useEffect, useState } from "react";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const temp = localStorage.getItem("history");
    setHistory(temp ? JSON.parse(temp) : []);
  }, []);

  const handleDelete = (index) => {
    const updatedArray = history.filter((_, i) => i !== index);
    setHistory(updatedArray);
    localStorage.setItem("history", JSON.stringify(updatedArray));
  };

  const handleReset = () => {
    setHistory([]);
    localStorage.removeItem("history");
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <a href="/" className="mb-4 text-blue-500">
        Homepage
      </a>
      {history.map((item, index) => (
        <div key={index} className="mb-4">
          <div className="row">
            <p className="mb-2">Original URL: {item.originalURL}</p>
          </div>
          <p className="mb-2">Shortened URL: {item.shortenedURL}</p>
          <button
            className="px-4 py-2 mr-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={() => handleCopy(item.shortenedURL)}
          >
            Copy
          </button>
          <button
            className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
            onClick={() => handleDelete(index)}
          >
            Delete
          </button>
        </div>
      ))}
      {history.length > 0 && (
        <button
          className="px-4 py-2 mt-4 text-sm text-white bg-gray-500 rounded hover:bg-gray-600"
          onClick={handleReset}
        >
          Reset History
        </button>
      )}
    </div>
  );
};

export default History;
