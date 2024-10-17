import React, { useState, useCallback } from 'react';
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
import GuidedTour from './components/GuidedTour';

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

function AppContent() {
    const location = useLocation();
    const isLoginPage = location.pathname === '/';
    const [showTour, setShowTour] = useState(false);
    const [isPageReady, setIsPageReady] = useState(false);

    const handleLogin = useCallback(() => {
        setShowTour(true);
    }, []);

    const handlePageReady = useCallback(() => {
        setIsPageReady(true);
    }, []);

    const handlePageChange = useCallback(() => {
        setIsPageReady(false);
    }, []);

    return (
        <AppContainer>
            {!isLoginPage && <Sidebar setShowTour={setShowTour} />}
            <MainContent hasSidebar={!isLoginPage}>
                <AnimatePresence mode="wait" onExitComplete={handlePageChange}>
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<PageTransitionWrapper><LoginScreen onLogin={handleLogin} /></PageTransitionWrapper>} />
                        <Route path="/dashboard" element={<PageTransitionWrapper><Dashboard onReady={handlePageReady} /></PageTransitionWrapper>} />
                        <Route path="/projects" element={<PageTransitionWrapper><ProjectInvestments onReady={handlePageReady} /></PageTransitionWrapper>} />
                        <Route path="/experience" element={<PageTransitionWrapper><ExperienceTradingFloor onReady={handlePageReady} /></PageTransitionWrapper>} />
                        <Route path="/learning" element={<PageTransitionWrapper><LearningFutures onReady={handlePageReady} /></PageTransitionWrapper>} />
                        <Route path="/contact" element={<PageTransitionWrapper><ContactTradingDesk onReady={handlePageReady} /></PageTransitionWrapper>} />
                    </Routes>
                </AnimatePresence>
                {showTour && <GuidedTour setIsTourActive={setShowTour} isPageReady={isPageReady} />}
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