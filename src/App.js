import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Testing from "./pages/Testing";
import Results from "./pages/Results";
import Options from "./pages/Options";
import Final from "./pages/Final";
function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/testing" element={<Testing />} />
          <Route path="/results" element={<Results/>}/>
          <Route path="/options" element={<Options/>}/>
          <Route path="/final" element={<Final/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
