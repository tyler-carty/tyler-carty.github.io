import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BaseComponent } from './BaseComponent';

const ExperienceCard = styled(motion.div)`
  background-color: #112240;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 0 15px rgba(100, 255, 218, 0.1);
`;

const CompanyName = styled.h3`
  font-size: 1.5rem;
  color: #64ffda;
  margin-bottom: 0.5rem;
`;

const JobTitle = styled.h4`
  font-size: 1.2rem;
  color: #8892b0;
  margin-bottom: 1rem;
`;

const Duration = styled.p`
  font-style: italic;
  margin-bottom: 1rem;
`;

const Achievements = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

const Achievement = styled.li`
  margin-bottom: 0.5rem;
  &:before {
    content: "▹";
    color: #64ffda;
    margin-right: 0.5rem;
  }
`;

const SkillsGained = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Skill = styled.span`
  background-color: #1d3557;
  color: #64ffda;
  padding: 0.25rem 0.5rem;
  border-radius: 5px;
  font-size: 0.9rem;
`;

const experiences = [
    {
        company: "LBG Data Engineering Desk",
        title: "Senior Data Engineer",
        duration: "2022 - Present",
        achievements: [
            "Led the development of a real-time data pipeline processing over 1M transactions per hour",
            "Implemented machine learning models for fraud detection, reducing false positives by 30%",
            "Mentored junior engineers and conducted knowledge sharing sessions on best practices"
        ],
        skills: ["Apache Spark", "Kafka", "Python", "AWS", "Machine Learning"]
    },
    {
        company: "LBG Cloud Infrastructure Division",
        title: "Cloud Infrastructure Intern",
        duration: "Summer 2021",
        achievements: [
            "Assisted in migrating legacy systems to cloud-based solutions, improving efficiency by 40%",
            "Developed automation scripts for routine maintenance tasks, saving 10 hours per week",
            "Contributed to the design of a new microservices architecture"
        ],
        skills: ["AWS", "Docker", "Kubernetes", "Terraform", "Python"]
    },
    // Add more experiences here
];

const ExperienceTradingFloor = () => {
    return (
        <BaseComponent title="Experience Trading Floor">
            {experiences.map((exp, index) => (
                <ExperienceCard
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <CompanyName>{exp.company}</CompanyName>
                    <JobTitle>{exp.title}</JobTitle>
                    <Duration>{exp.duration}</Duration>
                    <Achievements>
                        {exp.achievements.map((achievement, i) => (
                            <Achievement key={i}>{achievement}</Achievement>
                        ))}
                    </Achievements>
                    <SkillsGained>
                        {exp.skills.map((skill, i) => (
                            <Skill key={i}>{skill}</Skill>
                        ))}
                    </SkillsGained>
                </ExperienceCard>
            ))}
        </BaseComponent>
    );
};

export default ExperienceTradingFloor;