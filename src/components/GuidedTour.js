import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const TourOverlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    pointer-events: none;
`;

const TourCard = styled(motion.div)`
    position: absolute;
    background-color: #112240;
    border-radius: 10px;
    padding: 1.5rem;
    max-width: 350px;
    box-shadow: 0 0 20px rgba(100, 255, 218, 0.3);
    pointer-events: auto;
    z-index: 1001;
`;

const TourTitle = styled.h2`
    color: #64ffda;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
`;

const TourContent = styled.p`
    color: #8892b0;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    line-height: 1.5;
`;

const TourNavigation = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TourButton = styled.button`
    background-color: #64ffda;
    color: #0a192f;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: bold;
    transition: all 0.3s ease;

    &:hover {
        background-color: #45c7b3;
        transform: translateY(-2px);
    }

    &:disabled {
        background-color: #1d3557;
        cursor: not-allowed;
        transform: none;
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

const ProgressIndicator = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1rem;
`;

const ProgressDot = styled.div`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${props => props.active ? '#64ffda' : '#1d3557'};
    margin: 0 4px;
    transition: background-color 0.3s ease;
`;

const HighlightBox = styled(motion.div)`
    position: absolute;
    border: 2px solid #64ffda;
    border-radius: 5px;
    pointer-events: none;
    z-index: 1000;
    box-shadow: 0 0 0 9999px rgba(10, 25, 47, 0.7);
`;

const tourSteps = [
    {
        path: '/dashboard',
        steps: [
            {
                title: 'Welcome to Your Financial Portfolio',
                content: 'This dashboard represents your skills and experiences as financial assets. Let us explore each section.',
                target: '.dashboard-overview'
            },
            {
                title: 'Skills Portfolio',
                content: 'This radar chart visualizes your technical and soft skills. The further the point from the center, the stronger the skill.',
                target: '.skills-chart'
            },
            {
                title: 'Experience Growth',
                content: 'This line chart demonstrates your professional growth over time. Notice how your experience compounds, just like a good investment!',
                target: '.experience-chart'
            },
            {
                title: 'Recent Projects',
                content: 'These cards showcase your most recent or significant projects. Think of them as your top-performing stocks.',
                target: '.recent-projects'
            },
            {
                title: 'Quick Stats',
                content: 'These metrics provide a snapshot of your professional achievements.',
                target: '.quick-stats'
            }
        ]
    },
    {
        path: '/projects',
        steps: [
            {
                title: 'Project Investments',
                content: 'Welcome to your project portfolio. Each card here represents a significant project you have worked on.',
                target: '.projects-overview'
            },
            {
                title: 'Project Card',
                content: 'Each project is presented as an investment opportunity. Let us look at the details of one.',
                target: '.project-card:first-child'
            },
            {
                title: 'Tech Stack',
                content: 'These tags represent the technologies used in the project. They are like the underlying assets of your investment.',
                target: '.tech-stack'
            },
            {
                title: 'Project Metrics',
                content: 'These metrics show the impact, complexity, and growth potential of the project. Higher percentages indicate greater significance.',
                target: '.project-metrics'
            },
            {
                title: 'Detailed View',
                content: 'Click on "More Details" to see an expanded view with performance charts and links to the project.',
                target: '.project-card .expand-button'
            }
        ]
    },
    {
        path: '/experience',
        steps: [
            {
                title: 'Experience Trading Floor',
                content: 'Welcome to your career timeline. This represents your professional journey as a series of trades and investments.',
                target: '.timeline-overview'
            },
            {
                title: 'Timeline Entry',
                content: 'Each entry represents a significant milestone or role in your career. The vertical line shows the progression of time.',
                target: '.timeline-item'
            },
            {
                title: 'Role Details',
                content: 'Click on an entry to see more details about that role or achievement. It is like examining the details of a particular trade.',
                target: '.timeline-item .expand-button'
            }
        ]
    },
    {
        path: '/learning',
        steps: [
            {
                title: 'Learning Futures',
                content: 'This section showcases your ongoing learning and future skill projections.',
                target: '.learning-overview'
            },
            {
                title: 'Current Learning',
                content: 'These cards represent the skills or technologies you are currently focusing on. They are your active investments.',
                target: '.current-learning'
            },
            {
                title: 'Growth Potential',
                content: 'This chart shows the potential growth of your skills. Higher bars indicate areas with significant room for improvement.',
                target: '.growth-chart'
            },
            {
                title: 'Future Interests',
                content: 'These are areas you are interested in exploring. Think of them as potential future investments in your skill portfolio.',
                target: '.future-interests'
            }
        ]
    },
    {
        path: '/contact',
        steps: [
            {
                title: 'Contact Trading Desk',
                content: 'Welcome to the contact section. Here, you can reach out just like you would contact a trading desk for high-value transactions.',
                target: '.contact-overview'
            },
            {
                title: 'Contact Form',
                content: 'Use this form to send a message. Think of it as placing an order in the market of professional opportunities.',
                target: '.contact-overview'
            },
            {
                title: 'Tour Complete',
                content: 'Congratulations! You have completed the tour of your financial portfolio. Feel free to explore further or reach out via this contact form.',
                target: '.contact-overview'
            }
        ]
    }
];

const GuidedTour = ({ setIsTourActive, isPageReady }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [highlightPosition, setHighlightPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
    const [cardPosition, setCardPosition] = useState({ top: 0, left: 0 });
    const [isElementVisible, setIsElementVisible] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const updateAttempts = useRef(0);
    const maxAttempts = 10;

    const updatePositions = useCallback(() => {
        const currentTourStep = tourSteps[currentPage].steps[currentStep];
        const targetElement = document.querySelector(currentTourStep.target);

        if (targetElement) {
            const rect = targetElement.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

            setHighlightPosition({
                top: rect.top + scrollTop,
                left: rect.left + scrollLeft,
                width: rect.width,
                height: rect.height
            });

            // Calculate card position
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            let cardTop = rect.bottom + scrollTop + 20;
            let cardLeft = rect.left + scrollLeft;

            // Adjust card position if it goes off-screen
            if (cardTop + 200 > viewportHeight) {
                cardTop = rect.top + scrollTop - 220;
            }
            if (cardLeft + 350 > viewportWidth) {
                cardLeft = viewportWidth - 370;
            }
            if (cardTop < 0) {
                cardTop = 20;
            }
            if (cardLeft < 0) {
                cardLeft = 20;
            }

            setCardPosition({ top: cardTop, left: cardLeft });
            setIsElementVisible(true);
            updateAttempts.current = 0;
        } else if (updateAttempts.current < maxAttempts) {
            updateAttempts.current++;
            setTimeout(updatePositions, 100);
        } else {
            console.error(`Failed to find target element: ${currentTourStep.target}`);
            setIsElementVisible(false);
            updateAttempts.current = 0;
        }
    }, [currentPage, currentStep]);

    useEffect(() => {
        if (isPageReady) {
            setIsElementVisible(false);
            updatePositions();
        }
    }, [isPageReady, updatePositions]);

    useEffect(() => {
        const currentTourStep = tourSteps[currentPage];
        if (location.pathname !== currentTourStep.path) {
            setIsElementVisible(false);
            navigate(currentTourStep.path);
        }
    }, [currentPage, navigate, location.pathname]);

    useEffect(() => {
        const handleResize = () => {
            updatePositions();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [updatePositions]);

    const handleNext = useCallback(() => {
        const currentPageSteps = tourSteps[currentPage].steps;
        if (currentStep < currentPageSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else if (currentPage < tourSteps.length - 1) {
            setCurrentPage(currentPage + 1);
            setCurrentStep(0);
        } else {
            setIsTourActive(false);
        }
    }, [currentPage, currentStep, setIsTourActive]);

    const handlePrev = useCallback(() => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        } else if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
            setCurrentStep(tourSteps[currentPage - 1].steps.length - 1);
        }
    }, [currentPage, currentStep]);

    const handleSkip = useCallback(() => {
        setIsTourActive(false);
    }, [setIsTourActive]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'ArrowRight') {
                handleNext();
            } else if (event.key === 'ArrowLeft') {
                handlePrev();
            } else if (event.key === 'Escape') {
                handleSkip();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleNext, handlePrev, handleSkip]);

    return (
        <TourOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <AnimatePresence mode="wait">
                {isElementVisible && (
                    <TourCard
                        key={`${currentPage}-${currentStep}`}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            top: cardPosition.top,
                            left: cardPosition.left
                        }}
                    >
                        <TourTitle>{tourSteps[currentPage].steps[currentStep].title}</TourTitle>
                        <TourContent>{tourSteps[currentPage].steps[currentStep].content}</TourContent>
                        <TourNavigation>
                            <TourButton onClick={handlePrev} disabled={currentPage === 0 && currentStep === 0}>
                                Previous
                            </TourButton>
                            <SkipButton onClick={handleSkip}>Skip Tour</SkipButton>
                            <TourButton onClick={handleNext}>
                                {currentPage === tourSteps.length - 1 && currentStep === tourSteps[currentPage].steps.length - 1 ? 'Finish' : 'Next'}
                            </TourButton>
                        </TourNavigation>
                        <ProgressIndicator>
                            {tourSteps[currentPage].steps.map((_, index) => (
                                <ProgressDot key={index} active={index === currentStep} />
                            ))}
                        </ProgressIndicator>
                    </TourCard>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isElementVisible && (
                    <HighlightBox
                        key={`highlight-${currentPage}-${currentStep}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            top: highlightPosition.top,
                            left: highlightPosition.left,
                            width: highlightPosition.width,
                            height: highlightPosition.height
                        }}
                    />
                )}
            </AnimatePresence>
        </TourOverlay>
    );
};

export default GuidedTour;