import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './store/authContext';
import ProtectedRoute from './utils/ProtectedRoute'; // Adjust the import path as needed
import { AuthView } from './views/Auth/AuthView';
import { HomeView } from './views/Home/HomeView'; // Import HomeView
import { IndexView } from './views/Index/IndexView';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<IndexView />} />
            <Route path="/authenticate" element={<AuthView />} />
            <Route path="/home" element={
              <ProtectedRoute>
                <HomeView />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
