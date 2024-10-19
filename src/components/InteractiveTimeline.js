import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaCode, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const TimelineContainer = styled.div`
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
`;

const TimelineLine = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    background-color: #64ffda;
`;

const TimelineItemWrapper = styled(motion.div)`
    position: relative;
    width: 50%;
    padding: 10px 40px;
    box-sizing: border-box;
    cursor: pointer;

    &:nth-child(odd) {
        left: 0;
        text-align: right;
    }

    &:nth-child(even) {
        left: 50%;
    }
`;

const TimelineContent = styled(motion.div)`
    padding: 20px;
    background: #112240;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(100, 255, 218, 0.2);
    }
`;

const TimelineIcon = styled.div`
    position: absolute;
    top: 50%;
    width: 40px;
    height: 40px;
    background: #64ffda;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0a192f;
    font-size: 20px;

    ${TimelineItemWrapper}:nth-child(odd) & {
        right: -20px;
    }

    ${TimelineItemWrapper}:nth-child(even) & {
        left: -20px;
    }
`;

const TimelineDate = styled.div`
    font-size: 0.85em;
    color: #64ffda;
    margin-bottom: 5px;
`;

const TimelineTitle = styled.h3`
    margin: 0 0 10px;
    color: #ccd6f6;
`;

const TimelineDescription = styled.p`
    margin: 0;
    color: #8892b0;
`;

const ExpandButton = styled.div`
    color: #64ffda;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    font-size: 0.9em;
`;

const ExpandedContent = styled(motion.div)`
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #1d3557;
`;

const TechStack = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
`;

const TechTag = styled.span`
    background-color: #1d3557;
    color: #64ffda;
    padding: 0.25rem 0.5rem;
    border-radius: 5px;
    font-size: 0.9rem;
`;

const timelineData = [
    {
        date: '2023 - Present',
        icon: <FaBriefcase />,
        title: 'Senior Data Engineer',
        company: 'Tech Innovations Inc.',
        description: 'Leading big data initiatives and implementing machine learning solutions.',
        details: 'Spearheaded the development of a real-time data processing pipeline handling over 1 million transactions per hour. Implemented advanced fraud detection algorithms reducing false positives by 30%.',
        techStack: ['Python', 'Apache Spark', 'Kubernetes', 'TensorFlow']
    },
    {
        date: '2022',
        icon: <FaCode />,
        title: 'Project: AI-Driven Market Analyzer',
        description: 'Developed an AI-powered tool for real-time market trend analysis.',
        details: 'Utilized natural language processing and machine learning to analyze social media sentiment and news articles, providing actionable insights for investment strategies.',
        techStack: ['Python', 'NLP', 'Machine Learning', 'AWS']
    },
    {
        date: '2020 - 2023',
        icon: <FaBriefcase />,
        title: 'Data Scientist',
        company: 'DataCorp Solutions',
        description: 'Focused on predictive modeling and data-driven decision making.',
        details: 'Created predictive models for customer churn, increasing retention rates by 25%. Developed an automated reporting system, saving 20 hours of manual work per week.',
        techStack: ['Python', 'R', 'SQL', 'Tableau']
    },
    {
        date: '2019',
        icon: <FaGraduationCap />,
        title: 'MSc in Data Science',
        company: 'Tech University',
        description: 'Specialized in machine learning and big data technologies.',
        details: 'Thesis on "Applying Deep Learning to Financial Time Series Forecasting" received departmental honors. Published two papers in peer-reviewed journals.',
        techStack: ['Python', 'TensorFlow', 'Time Series Analysis', 'Big Data']
    },
];

const TimelineItem = ({ item, index, onExpand, isExpanded }) => {
    return (
        <TimelineItemWrapper
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            onClick={() => onExpand(index)}
        >
            <TimelineContent>
                <TimelineDate>{item.date}</TimelineDate>
                <TimelineTitle>{item.title}</TimelineTitle>
                {item.company && <p style={{ color: '#64ffda' }}>{item.company}</p>}
                <TimelineDescription>{item.description}</TimelineDescription>
                <ExpandButton>
                    {isExpanded ? 'Read less' : 'Read more'}
                    {isExpanded ? <FaChevronUp style={{ marginLeft: '5px' }} /> : <FaChevronDown style={{ marginLeft: '5px' }} />}
                </ExpandButton>
                <AnimatePresence>
                    {isExpanded && (
                        <ExpandedContent
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <TimelineDescription>{item.details}</TimelineDescription>
                            <TechStack>
                                {item.techStack.map((tech, i) => (
                                    <TechTag key={i}>{tech}</TechTag>
                                ))}
                            </TechStack>
                        </ExpandedContent>
                    )}
                </AnimatePresence>
            </TimelineContent>
            <TimelineIcon>{item.icon}</TimelineIcon>
        </TimelineItemWrapper>
    );
};

const InteractiveTimeline = ({ onExpand, expandedItem }) => {
    return (
        <TimelineContainer>
            <TimelineLine />
            {timelineData.map((item, index) => (
                <TimelineItem
                    key={index}
                    item={item}
                    index={index}
                    onExpand={onExpand}
                    isExpanded={expandedItem === index}
                />
            ))}
        </TimelineContainer>
    );
};

export default InteractiveTimeline;