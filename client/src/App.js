import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './store/authContext';
import { AuthView } from './views/Auth/AuthView';
import { IndexView } from './views/Index/IndexView';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<AuthView />} />
            <Route path="/" element={<IndexView />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
