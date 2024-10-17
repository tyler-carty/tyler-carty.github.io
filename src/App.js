import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import GlobalStyle from './globalStyles';
import Sidebar from './components/Sidebar';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import ProjectInvestments from './components/ProjectInvestments';
import ExperienceTradingFloor from './components/ExperienceTradingFloor';
import LearningFutures from './components/LearningFutures';
import ContactTradingDesk from './components/ContactTradingDesk';

const AppContainer = styled.div`
    display: flex;
`;

const MainContent = styled.main`
    flex-grow: 1;
    margin-left: 200px; // Width of the sidebar
    padding: 2rem;
`;

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

const AppContent = () => {
    const location = useLocation();

    return (
        <AppContainer>
            {location.pathname !== '/' && <Sidebar />}
            <MainContent>
                <AnimatedRoutes />
            </MainContent>
        </AppContainer>
    );
};

function App() {
    return (
        <Router>
            <GlobalStyle />
            <AppContent />
        </Router>
    );
}

export default App;