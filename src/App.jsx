import { Routes, Route } from 'react-router-dom';
import { Entrust } from './Components/EntrustPage/Entrust';
import { Dashboard } from './Components/DashboardPage/Dashboard';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Entrust />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
