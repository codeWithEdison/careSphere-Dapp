
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import AddDoctor from './pages/AddDoctor';
import MedicalRecords from './pages/MedicalRecords';
import AccessControl from './pages/AccessControl';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/records" element={<MedicalRecords />} />
            <Route path="/access" element={<AccessControl />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;