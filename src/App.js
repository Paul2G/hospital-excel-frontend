import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Patients from "./pages/Patients";
import PatientRegister from "./pages/PatientRegister";

import "./assets/css/globals.css"
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Router>          
          <Navbar />
          <main className="mainContent">
            <Routes>
              <Route path="/" element={<Patients />}/>
              <Route path="/register" element={<PatientRegister />}/>
            </Routes>
          </main>
          <Footer />
      </Router>
    </div>
  );
}

export default App;
