import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./Home";
import History from "./History";
import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css’

function App() {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  return (
    <div className="App min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Routes>
      <DatePicker
        selectsStart
        selected={startDate}
        onChange={date => setStartDate(date)}
        startDate={startDate}
      />
    </div>

  );
}

export default App;
