// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import { Dashboard } from './Pages/Dashboard';
import { Test } from './Pages/Test';
import { AuthProvider } from '../context/AuthContext';
import Protected from '../services/Protected';
import Redirect from '../services/Redirect';
import { CaseTracker } from './Pages/CaseTracker';
import { ProjectTracker } from './Pages/ProjectTracker';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Redirect Protect={Login} />} />
        <Route path="/register" element={<Redirect Protect={Register} />} />
        <Route path="/dashboard" element={< Dashboard />} />
        <Route path="/casetracker" element={< CaseTracker />} />
        <Route path="/projecttracker" element={< ProjectTracker />} />
        <Route path="/test" element={< Test />} />  
      </Routes>
    </AuthProvider>
  );
}

export default App;
