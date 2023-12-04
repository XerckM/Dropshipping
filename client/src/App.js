import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './store/authContext';
import ProtectedRoutes from './utils/ProtectedRoutes';
import PublicRoutes from './utils/PublicRoutes';
import { AuthView } from './views/Auth/AuthView';
import { HomeView } from './views/Home/HomeView';
import { IndexView } from './views/Index/IndexView';
import { NoPageExists } from "./views/404/404";

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route element={<PublicRoutes />}>
                            <Route path="/" element={<IndexView />} />
                            <Route path="/auth" element={<AuthView />} />
                        </Route>
                        <Route element={<ProtectedRoutes />}>
                            <Route path="/home" element={<HomeView />} />
                        </Route>
                        <Route path="*" element={<NoPageExists />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    )
}

export default App;
