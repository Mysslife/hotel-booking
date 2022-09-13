import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import ListHotel from "./pages/listHotel/ListHotel";
import SingleHotel from "./pages/singleHotel/SingleHotel";
import Login from "./pages/login/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<ListHotel />} />
        <Route path="/hotels/:id" element={<SingleHotel />} />
      </Routes>
    </Router>
  );
}

export default App;
