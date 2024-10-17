import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import GlobalStyle from './globalStyles';
import Sidebar from './components/Sidebar';
import PageTransitionWrapper from './components/PageTransitionWrapper';
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
    padding: 2rem;
    transition: margin-left 0.3s ease-in-out;

    @media (min-width: 769px) {
        margin-left: 200px;
    }

    @media (max-width: 768px) {
        margin-left: 60px;
    }
`;


const AnimatedRoutes = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/';

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransitionWrapper><LoginScreen /></PageTransitionWrapper>} />
                <Route path="/dashboard" element={<PageTransitionWrapper><Dashboard /></PageTransitionWrapper>} />
                <Route path="/projects" element={<PageTransitionWrapper><ProjectInvestments /></PageTransitionWrapper>} />
                <Route path="/experience" element={<PageTransitionWrapper><ExperienceTradingFloor /></PageTransitionWrapper>} />
                <Route path="/learning" element={<PageTransitionWrapper><LearningFutures /></PageTransitionWrapper>} />
                <Route path="/contact" element={<PageTransitionWrapper><ContactTradingDesk /></PageTransitionWrapper>} />
            </Routes>
        </AnimatePresence>
    );
};

function AppContent() {
    const location = useLocation();
    const isLoginPage = location.pathname === '/';

    return (
        <AppContainer>
            {!isLoginPage && <Sidebar />}
            <MainContent hasSidebar={!isLoginPage}>
                <AnimatedRoutes />
            </MainContent>
        </AppContainer>
    );
}

function App() {
    return (
        <Router>
            <GlobalStyle />
            <AppContent />
        </Router>
    );
}

export default App;