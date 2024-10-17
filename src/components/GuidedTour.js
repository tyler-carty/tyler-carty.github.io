import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const TourOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(10, 25, 47, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const TourCard = styled(motion.div)`
  background-color: #112240;
  border-radius: 10px;
  padding: 2rem;
  max-width: 500px;
  box-shadow: 0 0 20px rgba(100, 255, 218, 0.3);
`;

const TourTitle = styled.h2`
  color: #64ffda;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const TourContent = styled.p`
  color: #8892b0;
  margin-bottom: 1.5rem;
`;

const TourNavigation = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TourButton = styled.button`
  background-color: #64ffda;
  color: #0a192f;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background-color: #45c7b3;
  }

  &:disabled {
    background-color: #1d3557;
    cursor: not-allowed;
  }
`;

const SkipButton = styled(TourButton)`
  background-color: transparent;
  color: #64ffda;
  border: 1px solid #64ffda;

  &:hover {
    background-color: rgba(100, 255, 218, 0.1);
  }
`;

const tourSteps = [
    {
        path: '/dashboard',
        title: 'Welcome to Your Financial Portfolio',
        content: 'This dashboard represents your skills and experiences as financial assets. Explore the charts to see your growth and potential.',
    },
    {
        path: '/projects',
        title: 'Project Investments',
        content: 'Here you\'ll find your top projects, represented as investment opportunities. Click on each project to reveal more details and performance metrics.',
    },
    {
        path: '/experience',
        title: 'Experience Trading Floor',
        content: 'Your professional journey is visualized as a trading floor timeline. Scroll through to see your career milestones and achievements.',
    },
    {
        path: '/learning',
        title: 'Learning Futures',
        content: 'This section showcases your ongoing learning and future skill projections. It\'s like investing in your personal growth!',
    },
    {
        path: '/contact',
        title: 'Contact Trading Desk',
        content: 'Ready to connect? Use this form to reach out, just like you would contact a trading desk for high-value transactions.',
    },
];

const GuidedTour = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isTourActive, setIsTourActive] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isTourActive) {
            navigate(tourSteps[currentStep].path);
        }
    }, [currentStep, isTourActive, navigate]);

    const handleNext = () => {
        if (currentStep < tourSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsTourActive(false);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSkip = () => {
        setIsTourActive(false);
    };

    if (!isTourActive) return null;

    return (
        <TourOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <TourCard
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <TourTitle>{tourSteps[currentStep].title}</TourTitle>
                <TourContent>{tourSteps[currentStep].content}</TourContent>
                <TourNavigation>
                    <TourButton onClick={handlePrev} disabled={currentStep === 0}>
                        Previous
                    </TourButton>
                    <SkipButton onClick={handleSkip}>Skip Tour</SkipButton>
                    <TourButton onClick={handleNext}>
                        {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
                    </TourButton>
                </TourNavigation>
            </TourCard>
        </TourOverlay>
    );
};

export default GuidedTour;