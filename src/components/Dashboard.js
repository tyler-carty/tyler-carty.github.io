import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { BaseComponent } from "./BaseComponent";
import { FaCode, FaBriefcase, FaGraduationCap, FaChartLine, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import TechStackTags from './TechStackTags';

const DashboardContainer = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    padding: 2rem;
`;

const Card = styled(motion.div)`
    background-color: #112240;
    border-radius: 10px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
`;

const CardTitle = styled.h2`
    font-size: 1.5rem;
    color: #64ffda;
    margin-bottom: 1rem;
`;

const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
`;

const IconWrapper = styled.div`
    font-size: 3rem;
    color: #64ffda;
    margin-bottom: 1rem;
`;

const Highlight = styled.p`
    font-size: 2rem;
    font-weight: bold;
    color: #ccd6f6;
    margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
    font-size: 1rem;
    color: #8892b0;
    text-align: center;
`;

const ExpandButton = styled.button`
    background: none;
    border: none;
    color: #64ffda;
    cursor: pointer;
    align-self: flex-end;
    font-size: 1.2rem;
    margin-top: 1rem;
`;

const ExpandedContent = styled(motion.div)`
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #1d3557;
`;

const SkillBar = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
`;

const SkillName = styled.span`
    flex: 0 0 100px;
    color: #8892b0;
`;

const SkillLevel = styled.div`
    flex-grow: 1;
    height: 10px;
    background-color: #1d3557;
    border-radius: 5px;
    overflow: hidden;
`;

const SkillFill = styled.div`
    height: 100%;
    background-color: #64ffda;
    width: ${props => props.level}%;
`;

const ProjectItem = styled.div`
    margin-bottom: 1rem;
`;

const ProjectTitle = styled.h4`
    color: #ccd6f6;
    margin-bottom: 0.25rem;
`;

const ProjectDescription = styled.p`
    font-size: 0.9rem;
    color: #8892b0;
    margin-bottom: 0.25rem;
`;

const Dashboard = ({ onReady }) => {
    const [expandedCard, setExpandedCard] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);

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
        setExpandedCard(expandedCard === index ? null : index);
    };

    const cardData = [
        {
            title: "Technical Expertise",
            icon: <FaCode />,
            highlight: "Full-Stack",
            subtitle: "Developer",
            expandedContent: (
                <>
                    <p>Specialized skills:</p>
                    <SkillBar>
                        <SkillName>React</SkillName>
                        <SkillLevel><SkillFill level={90} /></SkillLevel>
                    </SkillBar>
                    <SkillBar>
                        <SkillName>Node.js</SkillName>
                        <SkillLevel><SkillFill level={85} /></SkillLevel>
                    </SkillBar>
                    <SkillBar>
                        <SkillName>Python</SkillName>
                        <SkillLevel><SkillFill level={80} /></SkillLevel>
                    </SkillBar>
                    <SkillBar>
                        <SkillName>AWS</SkillName>
                        <SkillLevel><SkillFill level={75} /></SkillLevel>
                    </SkillBar>
                </>
            )
        },
        {
            title: "Professional Experience",
            icon: <FaBriefcase />,
            highlight: "5+ Years",
            subtitle: "in Tech Industry",
            expandedContent: (
                <>
                    <p>Career progression:</p>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={[
                            { year: '2019', role: 'Junior Developer' },
                            { year: '2020', role: 'Developer' },
                            { year: '2021', role: 'Senior Developer' },
                            { year: '2022', role: 'Lead Developer' },
                            { year: '2023', role: 'Tech Lead' },
                        ]}>
                            <XAxis dataKey="year" />
                            <YAxis hide />
                            <Tooltip />
                            <Bar dataKey="role" fill="#64ffda" />
                        </BarChart>
                    </ResponsiveContainer>
                </>
            )
        },
        {
            title: "Education",
            icon: <FaGraduationCap />,
            highlight: "MSc",
            subtitle: "Data Science",
            expandedContent: (
                <>
                    <p>Educational journey:</p>
                    <ul style={{ color: '#8892b0', listStyleType: 'none', padding: 0 }}>
                        <li>✓ BSc in Computer Science (2018)</li>
                        <li>✓ MSc in Data Science (2020)</li>
                        <li>• Online courses in AI and ML</li>
                        <li>• Regular tech conference attendee</li>
                    </ul>
                </>
            )
        },
        {
            title: "Project Highlights",
            icon: <FaChartLine />,
            highlight: "10+",
            subtitle: "Major Projects",
            expandedContent: (
                <>
                    <ProjectItem>
                        <ProjectTitle>E-commerce Platform</ProjectTitle>
                        <ProjectDescription>Built a scalable online marketplace</ProjectDescription>
                        <TechStackTags tags={['React', 'Node.js', 'MongoDB', 'AWS']} />
                    </ProjectItem>
                    <ProjectItem>
                        <ProjectTitle>AI Chatbot</ProjectTitle>
                        <ProjectDescription>Developed an intelligent customer service bot</ProjectDescription>
                        <TechStackTags tags={['Python', 'TensorFlow', 'NLP', 'Azure']} />
                    </ProjectItem>
                    <ProjectItem>
                        <ProjectTitle>Data Visualization Tool</ProjectTitle>
                        <ProjectDescription>Created interactive dashboards for business analytics</ProjectDescription>
                        <TechStackTags tags={['D3.js', 'React', 'Node.js', 'PostgreSQL']} />
                    </ProjectItem>
                </>
            )
        }
    ];

    if (!dataLoaded) {
        return (
            <BaseComponent title="Dashboard">
                <div>Loading...</div>
            </BaseComponent>
        );
    }

    return (
        <BaseComponent title="Portfolio at a Glance">
            <DashboardContainer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                {cardData.map((card, index) => (
                    <Card
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <CardTitle>{card.title}</CardTitle>
                        <CardContent>
                            <IconWrapper>{card.icon}</IconWrapper>
                            <Highlight>{card.highlight}</Highlight>
                            <Subtitle>{card.subtitle}</Subtitle>
                        </CardContent>
                        <ExpandButton onClick={() => handleExpand(index)}>
                            {expandedCard === index ? <FaChevronUp /> : <FaChevronDown />}
                        </ExpandButton>
                        <AnimatePresence>
                            {expandedCard === index && (
                                <ExpandedContent
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {card.expandedContent}
                                </ExpandedContent>
                            )}
                        </AnimatePresence>
                    </Card>
                ))}
            </DashboardContainer>
        </BaseComponent>
    );
};

export default Dashboard;