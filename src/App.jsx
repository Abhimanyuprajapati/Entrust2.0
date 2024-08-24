// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import { Dashboard } from './Pages/Dashboard';
import { AuthProvider } from '../context/AuthContext';
import Protected from '../services/Protected';
import { CaseTracker } from './Pages/CaseTracker';
import { ProjectTracker } from './Pages/ProjectTracker';
import { SingleCase } from './components/casetracker/SingleCase';
import { ProjectDetails } from './components/projecttracker/ProjectDetails';

function App() {
  return (
    <AuthProvider>
      <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/caseTracker" element={<CaseTracker/>}/>
      <Route path="/projectTracker" element={<ProjectTracker/>}/>
      <Route path="/singlecase" element={<SingleCase/>}/>
      <Route path="/project/:projectId" element={<ProjectDetails />} />
      {/* <Route path="/dashboard" element={<Protected Component={Dashboard} />} /> */}
      {/* <Route path="/casetracker" element={<Protected Component={CaseTracker} />} /> */}
      {/* <Route path="/projecttracker" element={<Protected Component={ProjectTracker} />} />  */}
      </Routes>
    </AuthProvider>
  );
}

export default App;