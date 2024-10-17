import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { BaseComponent } from './BaseComponent';

const ProjectCard = styled(motion.div)`
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

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  color: #64ffda;
  margin-bottom: 1rem;
`;

const ProjectDescription = styled.p`
  margin-bottom: 1rem;
  color: #8892b0;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TechTag = styled.span`
    background-color: #1d3557;
    color: #64ffda;
    padding: 0.25rem 0.5rem;
    border-radius: 5px;
    font-size: 0.9rem;
`;

const ProjectMetrics = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
`;

const Metric = styled.div`
    text-align: center;
`;

const MetricValue = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    color: #64ffda;
`;

const MetricLabel = styled.div`
    font-size: 0.9rem;
    color: #8892b0;
`;

const ExpandButton = styled.button`
    background: none;
    border: none;
    color: #64ffda;
    cursor: pointer;
    font-size: 1rem;
    display: flex;
    align-items: center;
    margin: 0 auto;
`;

const ExpandedContent = styled(motion.div)`
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #1d3557;
`;

const ProjectLinks = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
`;

const ProjectLink = styled.a`
    color: #64ffda;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
        text-decoration: underline;
    }
`;

const projects = [
    {
        title: "Sentiment Dynamics",
        description: "A real-time sentiment analysis tool for financial markets.",
        techStack: ["Python", "NLP", "React", "D3.js"],
        metrics: {
            impact: 85,
            complexity: 70,
            growth: 90
        },
        github: "https://github.com/username/sentiment-dynamics",
        liveDemo: "https://sentiment-dynamics.demo.com",
        performanceData: [
            { month: 'Jan', performance: 65 },
            { month: 'Feb', performance: 70 },
            { month: 'Mar', performance: 80 },
            { month: 'Apr', performance: 85 },
            { month: 'May', performance: 90 },
        ]
    },
    {
        title: "TeslaTrack",
        description: "An IoT-based vehicle tracking system for Tesla cars.",
        techStack: ["IoT", "React Native", "Node.js", "MongoDB"],
        metrics: {
            impact: 75,
            complexity: 80,
            growth: 85
        },
        github: "https://github.com/username/teslatrack",
        liveDemo: "https://teslatrack.demo.com",
        performanceData: [
            { month: 'Jan', performance: 60 },
            { month: 'Feb', performance: 65 },
            { month: 'Mar', performance: 75 },
            { month: 'Apr', performance: 80 },
            { month: 'May', performance: 85 },
        ]
    },
];

const ProjectInvestments = () => {
    const [expandedProject, setExpandedProject] = useState(null);

    const toggleExpand = (index) => {
        setExpandedProject(expandedProject === index ? null : index);
    };

    return (
        <BaseComponent title="Project Investments">
            <div className="projects-overview">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => toggleExpand(index)}
                        className="project-card"
                    >
                        <ProjectTitle>{project.title}</ProjectTitle>
                        <ProjectDescription>{project.description}</ProjectDescription>
                        <TechStack className="tech-stack">
                            {project.techStack.map((tech, i) => (
                                <TechTag key={i}>{tech}</TechTag>
                            ))}
                        </TechStack>
                        <ProjectMetrics className="project-metrics">
                            <Metric>
                                <MetricValue>{project.metrics.impact}%</MetricValue>
                                <MetricLabel>Impact</MetricLabel>
                            </Metric>
                            <Metric>
                                <MetricValue>{project.metrics.complexity}%</MetricValue>
                                <MetricLabel>Complexity</MetricLabel>
                            </Metric>
                            <Metric>
                                <MetricValue>{project.metrics.growth}%</MetricValue>
                                <MetricLabel>Growth Potential</MetricLabel>
                            </Metric>
                        </ProjectMetrics>
                        <ExpandButton className="expand-button">
                            {expandedProject === index ? (
                                <>
                                    Less Details <FaChevronUp />
                                </>
                            ) : (
                                <>
                                    More Details <FaChevronDown />
                                </>
                            )}
                        </ExpandButton>
                        <AnimatePresence>
                            {expandedProject === index && (
                                <ExpandedContent
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ProjectLinks>
                                        <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer">
                                            <FaGithub /> GitHub
                                        </ProjectLink>
                                        <ProjectLink href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                                            <FaExternalLinkAlt /> Live Demo
                                        </ProjectLink>
                                    </ProjectLinks>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <LineChart data={project.performanceData}>
                                            <XAxis dataKey="month" stroke="#8892b0" />
                                            <YAxis stroke="#8892b0" />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#112240', border: 'none' }}
                                                labelStyle={{ color: '#64ffda' }}
                                                itemStyle={{ color: '#8892b0' }}
                                            />
                                            <Line type="monotone" dataKey="performance" stroke="#64ffda" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </ExpandedContent>
                            )}
                        </AnimatePresence>
                    </ProjectCard>
                ))}
            </div>
        </BaseComponent>
    );
};

export default ProjectInvestments;