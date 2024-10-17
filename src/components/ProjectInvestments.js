import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BaseComponent } from './BaseComponent';

const ProjectCard = styled(motion.div)`
  background-color: #112240;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 0 15px rgba(100, 255, 218, 0.1);
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  color: #64ffda;
  margin-bottom: 1rem;
`;

const ProjectDescription = styled.p`
  margin-bottom: 1rem;
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

const projects = [
    {
        title: "Sentiment Dynamics",
        description: "A real-time sentiment analysis tool for financial markets.",
        techStack: ["Python", "NLP", "React", "D3.js"],
        metrics: {
            impact: 85,
            complexity: 70,
            growth: 90
        }
    },
    {
        title: "TeslaTrack",
        description: "An IoT-based vehicle tracking system for Tesla cars.",
        techStack: ["IoT", "React Native", "Node.js", "MongoDB"],
        metrics: {
            impact: 75,
            complexity: 80,
            growth: 85
        }
    },
    // Add more projects here
];

const ProjectInvestments = () => {
    return (
        <BaseComponent title="Project Investments">
            {projects.map((project, index) => (
                <ProjectCard
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectDescription>{project.description}</ProjectDescription>
                    <TechStack>
                        {project.techStack.map((tech, i) => (
                            <TechTag key={i}>{tech}</TechTag>
                        ))}
                    </TechStack>
                    <ProjectMetrics>
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
                </ProjectCard>
            ))}
        </BaseComponent>
    );
};

export default ProjectInvestments;