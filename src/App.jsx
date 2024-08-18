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
        <Route path="/" element={<Redirect Component={Login} />} />
        <Route path="/register" element={<Redirect Component={Register} />} />
        <Route path="/dashboard" element={<Protected Component={Dashboard} />} />
        <Route path="/casetracker" element={<Protected Component={CaseTracker} />} />
        <Route path="/projecttracker" element={<Protected Component={ProjectTracker} />} /> 
      </Routes>
    </AuthProvider>
  );
}

export default App;
