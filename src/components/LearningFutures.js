import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaExternalLinkAlt, FaCheckCircle, FaSpinner, FaHourglassHalf, FaBook, FaCertificate, FaLaptopCode } from 'react-icons/fa';
import { BaseComponent } from './BaseComponent';
import RadarChart from './RadarChart';

const LearningCard = styled(motion.div)`
    background-color: #112240;
    border-radius: 10px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 0 15px rgba(100, 255, 218, 0.1);
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 20px rgba(100, 255, 218, 0.2);
    }
`;

const LearningTitle = styled.h3`
    font-size: 1.5rem;
    color: #64ffda;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
`;

const LearningDescription = styled.p`
    margin-bottom: 1rem;
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

const ExternalLink = styled.a`
    color: #64ffda;
    text-decoration: none;
    display: flex;
    align-items: center;
    margin-top: 1rem;

    &:hover {
        text-decoration: underline;
    }
`;

const StatusIcon = styled.span`
    margin-right: 10px;
    font-size: 1.2rem;
`;

const learningData = [
    {
        title: "AWS Certified Solutions Architect - Professional",
        type: "certification",
        provider: "Amazon Web Services",
        status: "completed",
        completionDate: "2023-05-15",
        description: "Advanced certification demonstrating expertise in designing distributed systems on AWS.",
        skills: [
            "Architecting scalable and elastic systems",
            "Designing for disaster recovery and high availability",
            "Implementing cost-optimization strategies"
        ],
        impact: "Enhances ability to design and implement complex, scalable solutions on AWS, crucial for cloud-based projects.",
        projectApplication: "Applied in designing the architecture for a high-load, fault-tolerant financial data processing system.",
        link: "https://aws.amazon.com/certification/certified-solutions-architect-professional/"
    },
    {
        title: "Deep Learning Specialization",
        type: "course",
        provider: "Coursera",
        status: "in_progress",
        expectedCompletionDate: "2024-03-01",
        description: "Comprehensive course covering the foundations and applications of deep learning.",
        skills: [
            "Neural Networks and Deep Learning",
            "Improving Deep Neural Networks",
            "Structuring Machine Learning Projects",
            "Convolutional Neural Networks",
            "Sequence Models"
        ],
        impact: "Strengthens theoretical understanding and practical skills in implementing advanced deep learning models.",
        projectApplication: "To be applied in developing an AI-driven market trend prediction model.",
        link: "https://www.coursera.org/specializations/deep-learning"
    },
    {
        title: "Blockchain Development Workshop",
        type: "workshop",
        provider: "Ethereum Foundation",
        status: "planned",
        plannedStartDate: "2024-06-01",
        description: "Intensive workshop on Ethereum blockchain development and smart contract programming.",
        skills: [
            "Solidity programming",
            "Smart contract development and testing",
            "DApp architecture",
            "Web3.js integration"
        ],
        impact: "Will provide hands-on experience in blockchain development, opening up opportunities in DeFi projects.",
        projectApplication: "Planned for use in creating a decentralized voting system prototype.",
        link: "https://ethereum.org/en/developers/"
    },
    {
        title: "Rust Programming Language",
        type: "self_study",
        status: "in_progress",
        startDate: "2023-11-01",
        description: "Self-directed learning of the Rust programming language for systems programming and web assembly.",
        skills: [
            "Memory safety without garbage collection",
            "Concurrent programming",
            "Traits and generics",
            "Error handling in Rust"
        ],
        impact: "Expands capability to write high-performance, secure systems-level code and explore WebAssembly applications.",
        projectApplication: "Developing a high-performance data processing module for a trading system.",
        link: "https://www.rust-lang.org/learn"
    }
];

const skillAreaData = [
    { subject: 'Cloud Architecture', A: 90, fullMark: 100 },
    { subject: 'Machine Learning', A: 75, fullMark: 100 },
    { subject: 'DevOps', A: 80, fullMark: 100 },
    { subject: 'Data Engineering', A: 85, fullMark: 100 },
    { subject: 'Distributed Systems', A: 70, fullMark: 100 },
];

const LearningFutures = ({ onReady }) => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [expandedItem, setExpandedItem] = useState(null);

    useEffect(() => {
        const loadData = async () => {
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

    const getStatusIcon = (status) => {
        switch(status) {
            case 'completed':
                return <StatusIcon as={FaCheckCircle} style={{ color: '#64ffda' }} />;
            case 'in_progress':
                return <StatusIcon as={FaSpinner} style={{ color: '#ffd700' }} />;
            case 'planned':
                return <StatusIcon as={FaHourglassHalf} style={{ color: '#ff69b4' }} />;
            default:
                return null;
        }
    };

    const getTypeIcon = (type) => {
        switch(type) {
            case 'certification':
                return <StatusIcon as={FaCertificate} style={{ color: '#64ffda' }} />;
            case 'course':
                return <StatusIcon as={FaBook} style={{ color: '#64ffda' }} />;
            case 'workshop':
                return <StatusIcon as={FaLaptopCode} style={{ color: '#64ffda' }} />;
            case 'self_study':
                return <StatusIcon as={FaBook} style={{ color: '#64ffda' }} />;
            default:
                return null;
        }
    };

    if (!dataLoaded) {
        return (
            <BaseComponent title="Learning Futures">
                <div>Loading...</div>
            </BaseComponent>
        );
    }

    if (!dataLoaded) {
        return (
            <BaseComponent title="Learning Futures">
                <div>Loading...</div>
            </BaseComponent>
        );
    }

    return (
        <BaseComponent title="Learning Futures">
            <div className="learning-overview">
                <RadarChart
                    title="Skill Area Focus"
                    data={skillAreaData}
                    dataKey="A"
                    height={400}
                />

                {learningData.map((item, index) => (
                    <LearningCard
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleExpand(index)}
                    >
                        <LearningTitle>
                            {getStatusIcon(item.status)}
                            {getTypeIcon(item.type)}
                            {item.title}
                        </LearningTitle>
                        <LearningDescription>{item.description}</LearningDescription>
                        <p>Provider: {item.provider}</p>
                        {item.status === 'completed' && <p>Completed: {item.completionDate}</p>}
                        {item.status === 'in_progress' && (item.expectedCompletionDate ?
                                <p>Expected Completion: {item.expectedCompletionDate}</p> :
                                <p>Started: {item.startDate}</p>
                        )}
                        {item.status === 'planned' && <p>Planned Start: {item.plannedStartDate}</p>}
                        <ExpandButton>
                            {expandedItem === index ? 'Show less' : 'Show more'}
                            {expandedItem === index ? <FaChevronUp style={{ marginLeft: '5px' }} /> : <FaChevronDown style={{ marginLeft: '5px' }} />}
                        </ExpandButton>
                        <AnimatePresence>
                            {expandedItem === index && (
                                <ExpandedContent
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h4>Key Skills:</h4>
                                    <ul>
                                        {item.skills.map((skill, i) => (
                                            <li key={i}>{skill}</li>
                                        ))}
                                    </ul>
                                    <p><strong>Impact:</strong> {item.impact}</p>
                                    <p><strong>Project Application:</strong> {item.projectApplication}</p>
                                    <ExternalLink href={item.link} target="_blank" rel="noopener noreferrer">
                                        Learn More <FaExternalLinkAlt style={{ marginLeft: '5px' }} />
                                    </ExternalLink>
                                </ExpandedContent>
                            )}
                        </AnimatePresence>
                    </LearningCard>
                ))}
            </div>
        </BaseComponent>
    );
};

export default LearningFutures;