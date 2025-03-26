import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Testing from "./pages/Testing";
import Results from "./pages/Results";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/testing" element={<Testing />} />
          <Route path="/results" element={<Results/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
