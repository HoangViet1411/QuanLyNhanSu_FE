import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Stats from './pages/Stats';
import EditEmployee from './pages/EditEmployee';
import AddEmployee from './pages/AddEmployee';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/edit-employee/:id" element={<EditEmployee />} />
        <Route path="/add-employee" element={<AddEmployee />} />

      </Routes>
    </Router>
  );
}

export default App;
