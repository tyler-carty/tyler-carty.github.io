import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BaseComponent } from './BaseComponent';
import InteractiveTimeline from './InteractiveTimeline';

const ExperienceContainer = styled(motion.div)`
    padding: 2rem;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

const ExperienceHeader = styled.h2`
    font-size: 2.5rem;
    color: #64ffda;
    margin-bottom: 2rem;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 2rem;
        margin-bottom: 1.5rem;
    }
`;

const ExperienceTradingFloor = ({ onReady }) => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [expandedItem, setExpandedItem] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            // Simulate async data loading
            await new Promise(resolve => setTimeout(resolve, 1000));
            setDataLoaded(true);
        };

        loadData();
    }, []);

    useEffect(() => {
        if (dataLoaded) {
            onReady();
        }
    }, [dataLoaded, onReady]);

    const handleExpand = (index) => {
        setExpandedItem(expandedItem === index ? null : index);
    };

    if (!dataLoaded) {
        return (
            <BaseComponent>
                <div>Loading...</div>
            </BaseComponent>
        );
    }

    return (
        <BaseComponent>
            <ExperienceContainer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="timeline-overview"
            >
                <ExperienceHeader>Experience Trading Floor</ExperienceHeader>
                <InteractiveTimeline
                    onExpand={handleExpand}
                    expandedItem={expandedItem}
                />
            </ExperienceContainer>
        </BaseComponent>
    );
};

export default ExperienceTradingFloor;