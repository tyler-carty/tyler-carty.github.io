import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import {FaChevronDown, FaChevronUp, FaGithub, FaExternalLinkAlt, FaInfoCircle} from 'react-icons/fa';
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

const MetricsExplanation = styled.div`
    background-color: #112240;
    border-radius: 10px;
    padding: 1rem;
    margin-bottom: 2rem;
    box-shadow: 0 0 15px rgba(100, 255, 218, 0.1);
`;

const ExplanationTitle = styled.h3`
    color: #64ffda;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const ExplanationList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ExplanationItem = styled.li`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
`;

const MetricName = styled.span`
  color: #64ffda;
  font-weight: bold;
`;

const ProjectImpact = styled.div`
  margin-top: 1rem;
  font-style: italic;
  color: #64ffda;
`;

const ProjectInvestments = ({ onReady }) => {
    const [expandedProject, setExpandedProject] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [projects, setProjects] = useState([
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
            impact: "This project opened doors to fintech opportunities and deepened my NLP expertise."
        },
        {
            title: "Distributed Systems Simulator",
            description: "A tool for simulating and visualizing distributed systems.",
            techStack: ["Go", "gRPC", "React", "WebGL"],
            metrics: {
                impact: 75,
                complexity: 85,
                growth: 80
            },
            github: "https://github.com/username/distributed-sim",
            liveDemo: "https://distributed-sim.demo.com",
            impact: "Strengthened my understanding of complex systems and improved my Go programming skills."
        },
        // ... (you can add more projects here)
    ]);

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

    const toggleExpand = (index) => {
        setExpandedProject(expandedProject === index ? null : index);
    };

    const chartData = useMemo(() => {
        return projects.map(project => [
            { subject: 'Impact', A: project.metrics.impact },
            { subject: 'Complexity', A: project.metrics.complexity },
            { subject: 'Growth', A: project.metrics.growth },
        ]);
    }, [projects]);

    if (!dataLoaded) {
        return (
            <BaseComponent title="Project Investments">
                <div>Loading...</div>
            </BaseComponent>
        );
    }

    return (
        <BaseComponent title="Project Investments">
            <MetricsExplanation>
                <ExplanationTitle>
                    <FaInfoCircle /> Project Metrics Explained
                </ExplanationTitle>
                <ExplanationList>
                    <ExplanationItem>
                        <MetricName>Impact:</MetricName> How this project influenced my career choices and future opportunities.
                    </ExplanationItem>
                    <ExplanationItem>
                        <MetricName>Complexity:</MetricName> The level of challenge and depth of skills required to complete the project.
                    </ExplanationItem>
                    <ExplanationItem>
                        <MetricName>Growth:</MetricName> How relevant this project is to my future career progression plans.
                    </ExplanationItem>
                </ExplanationList>
            </MetricsExplanation>

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
                            {Object.entries(project.metrics).map(([key, value]) => (
                                <Metric key={key}>
                                    <MetricValue>{value}%</MetricValue>
                                    <MetricLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</MetricLabel>
                                </Metric>
                            ))}
                        </ProjectMetrics>
                        <ExpandButton className="expand-button">
                            {expandedProject === index ? (
                                <>Less Details <FaChevronUp /></>
                            ) : (
                                <>More Details <FaChevronDown /></>
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
                                    <ResponsiveContainer width="100%" height={300}>
                                        <RadarChart data={chartData[index]}>
                                            <PolarGrid />
                                            <PolarAngleAxis dataKey="subject" />
                                            <PolarRadiusAxis angle={30} domain={[0, 100]} />
                                            <Radar name="Project Metrics" dataKey="A" stroke="#64ffda" fill="#64ffda" fillOpacity={0.6} />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                    <ProjectImpact>{project.impact}</ProjectImpact>
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