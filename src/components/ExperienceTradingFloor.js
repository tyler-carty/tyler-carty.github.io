import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BaseComponent } from './BaseComponent';
import InteractiveTimeline from './InteractiveTimeline';

const ExperienceContainer = styled(motion.div)`
    padding: 2rem;
`;

const ExperienceHeader = styled.h2`
    font-size: 2.5rem;
    color: #64ffda;
    margin-bottom: 2rem;
    text-align: center;
`;

const ExperienceTradingFloor = () => {
    return (
        <BaseComponent>
            <ExperienceContainer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="timeline-overview"
            >
                <ExperienceHeader>Experience Trading Floor</ExperienceHeader>
                <InteractiveTimeline />
            </ExperienceContainer>
        </BaseComponent>
    );
};

export default ExperienceTradingFloor;