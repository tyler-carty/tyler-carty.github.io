import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated, config } from 'react-spring';
import { FaBriefcase, FaGraduationCap, FaCode } from 'react-icons/fa';

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

const TimelineItemWrapper = styled(animated.div)`
    position: relative;
    width: 50%;
    padding: 10px 40px;
    box-sizing: border-box;

    &:nth-child(odd) {
        left: 0;
        text-align: right;
    }

    &:nth-child(even) {
        left: 50%;
    }
`;

const TimelineContent = styled.div`
    padding: 20px;
    background: #112240;
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

const ExpandButton = styled.button`
    background: none;
    border: none;
    color: #64ffda;
    cursor: pointer;
    margin-top: 10px;
    padding: 0;
    font-size: 0.9em;

    &:hover {
        text-decoration: underline;
    }
`;

const timelineData = [
    {
        date: '2023 - Present',
        icon: <FaBriefcase />,
        title: 'Senior Data Engineer',
        company: 'Tech Innovations Inc.',
        description: 'Leading big data initiatives and implementing machine learning solutions.',
        details: 'Spearheaded the development of a real-time data processing pipeline handling over 1 million transactions per hour. Implemented advanced fraud detection algorithms reducing false positives by 30%.'
    },
    {
        date: '2022',
        icon: <FaCode />,
        title: 'Project: AI-Driven Market Analyzer',
        description: 'Developed an AI-powered tool for real-time market trend analysis.',
        details: 'Utilized natural language processing and machine learning to analyze social media sentiment and news articles, providing actionable insights for investment strategies.'
    },
    {
        date: '2020 - 2023',
        icon: <FaBriefcase />,
        title: 'Data Scientist',
        company: 'DataCorp Solutions',
        description: 'Focused on predictive modeling and data-driven decision making.',
        details: 'Created predictive models for customer churn, increasing retention rates by 25%. Developed an automated reporting system, saving 20 hours of manual work per week.'
    },
    {
        date: '2019',
        icon: <FaGraduationCap />,
        title: 'MSc in Data Science',
        company: 'Tech University',
        description: 'Specialized in machine learning and big data technologies.',
        details: 'Thesis on "Applying Deep Learning to Financial Time Series Forecasting" received departmental honors. Published two papers in peer-reviewed journals.'
    },
    // Add more items as needed
];

const TimelineItem = ({ item, index }) => {
    const [expanded, setExpanded] = useState(false);

    const springProps = useSpring({
        opacity: 1,
        transform: 'translateY(0)',
        from: { opacity: 0, transform: 'translateY(50px)' },
        delay: index * 200,
        config: config.gentle
    });

    const expandSpring = useSpring({
        height: expanded ? 'auto' : '0px',
        opacity: expanded ? 1 : 0,
        config: config.gentle
    });

    return (
        <TimelineItemWrapper style={springProps}>
            <TimelineContent>
                <TimelineDate>{item.date}</TimelineDate>
                <TimelineTitle>{item.title}</TimelineTitle>
                {item.company && <p style={{ color: '#64ffda' }}>{item.company}</p>}
                <TimelineDescription>{item.description}</TimelineDescription>
                <animated.div style={expandSpring}>
                    <TimelineDescription>{item.details}</TimelineDescription>
                </animated.div>
                <ExpandButton onClick={() => setExpanded(!expanded)}>
                    {expanded ? 'Read less' : 'Read more'}
                </ExpandButton>
            </TimelineContent>
            <TimelineIcon>{item.icon}</TimelineIcon>
        </TimelineItemWrapper>
    );
};

const InteractiveTimeline = () => {
    return (
        <TimelineContainer>
            <TimelineLine />
            {timelineData.map((item, index) => (
                <TimelineItem key={index} item={item} index={index} />
            ))}
        </TimelineContainer>
    );
};

export default InteractiveTimeline;