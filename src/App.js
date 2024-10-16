import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import GlobalStyle from './globalStyles';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import ProjectInvestments from './components/ProjectInvestments';
import ExperienceTradingFloor from './components/ExperienceTradingFloor';
import LearningFutures from './components/LearningFutures';
import ContactTradingDesk from './components/ContactTradingDesk';

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<LoginScreen />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/projects" element={<ProjectInvestments />} />
                <Route path="/experience" element={<ExperienceTradingFloor />} />
                <Route path="/learning" element={<LearningFutures />} />
                <Route path="/contact" element={<ContactTradingDesk />} />
            </Routes>
        </AnimatePresence>
    );
};

function App() {
    return (
        <Router>
            <GlobalStyle />
            <div className="App">
                <AnimatedRoutes />
            </div>
        </Router>
    );
}

export default App;