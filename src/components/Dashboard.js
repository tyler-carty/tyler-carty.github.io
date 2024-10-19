import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BaseComponent } from "./BaseComponent";
import { FaReact, FaNodeJs, FaPython, FaAws, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const DashboardContainer = styled.div`
    position: relative;
    height: calc(100vh - 4rem);
    overflow: hidden;
    background-color: #0a192f;
    padding: 2rem;
`;

const FloatingElement = styled(motion.div)`
    position: absolute;
    background-color: rgba(17, 34, 64, 0.8);
    border-radius: 10px;
    padding: 1.5rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const Name = styled(motion.h1)`
    font-size: 4rem;
    color: #64ffda;
    margin-bottom: 0.5rem;
    position: absolute;
    top: 10%;
    left: 10%;
`;

const Title = styled(motion.h2)`
    font-size: 2rem;
    color: #8892b0;
    position: absolute;
    top: calc(10% + 5rem);
    left: 10%;
`;

const SkillsContainer = styled(FloatingElement)`
    top: 30%;
    left: 15%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const SkillIcon = styled(motion.div)`
    font-size: 2.5rem;
    color: #64ffda;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
`;

const SkillName = styled.span`
    font-size: 1rem;
    color: #8892b0;
    margin-left: 1rem;
`;

const BioCard = styled(FloatingElement)`
    top: 25%;
    right: 10%;
    width: 30%;
    max-width: 400px;
`;

const BioText = styled.p`
    font-size: 1rem;
    color: #8892b0;
    line-height: 1.6;
`;

const AchievementsCard = styled(FloatingElement)`
    bottom: 20%;
    left: 20%;
    width: 30%;
    max-width: 400px;
`;

const AchievementList = styled.ul`
    color: #8892b0;
    padding-left: 1.5rem;
`;

const AchievementItem = styled.li`
    margin-bottom: 0.5rem;
`;

const ConnectCard = styled(FloatingElement)`
    bottom: 15%;
    right: 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SocialLinks = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
`;

const SocialIcon = styled(motion.a)`
    font-size: 1.5rem;
    color: #64ffda;
    &:hover {
        color: #45c7b3;
    }
`;

const FloatingEducation = styled(FloatingElement)`
    top: 60%;
    left: 5%;
    text-align: center;
`;

const Degree = styled.h4`
    font-size: 1.2rem;
    color: #ccd6f6;
    margin-bottom: 0.5rem;
`;

const University = styled.p`
  font-size: 1rem;
  color: #8892b0;
`;

const Dashboard = ({ onReady }) => {
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

    const skillsData = [
        { name: 'React', icon: FaReact },
        { name: 'Node.js', icon: FaNodeJs },
        { name: 'Python', icon: FaPython },
        { name: 'AWS', icon: FaAws },
    ];

    if (!dataLoaded) {
        return (
            <BaseComponent title="Dashboard">
                <div>Loading...</div>
            </BaseComponent>
        );
    }

    return (
        <BaseComponent title="Dashboard">
            <DashboardContainer>
                <Name
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Tyler Cartwright
                </Name>
                <Title
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Full-Stack Developer & Data Scientist
                </Title>

                <SkillsContainer
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    {skillsData.map((skill, index) => (
                        <SkillIcon
                            key={skill.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        >
                            <skill.icon />
                            <SkillName>{skill.name}</SkillName>
                        </SkillIcon>
                    ))}
                </SkillsContainer>

                <BioCard
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <BioText>
                        Passionate engineer with 5+ years of experience in full-stack development and data science.
                        I thrive on creating scalable solutions and turning complex data into actionable insights.
                        Always pushing the boundaries of what's possible in tech.
                    </BioText>
                </BioCard>

                <AchievementsCard
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <AchievementList>
                        <AchievementItem>Architected a high-load fintech platform serving 1M+ users</AchievementItem>
                        <AchievementItem>Developed ML models improving prediction accuracy by 30%</AchievementItem>
                        <AchievementItem>Led a team of 5 in delivering a critical project ahead of schedule</AchievementItem>
                    </AchievementList>
                </AchievementsCard>

                <ConnectCard
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <BioText>Let's collaborate on something amazing!</BioText>
                    <SocialLinks>
                        <SocialIcon href="https://github.com/your-github" target="_blank" rel="noopener noreferrer"
                                    whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
                        >
                            <FaGithub />
                        </SocialIcon>
                        <SocialIcon href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer"
                                    whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
                        >
                            <FaLinkedin />
                        </SocialIcon>
                        <SocialIcon href="mailto:your.email@example.com"
                                    whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
                        >
                            <FaEnvelope />
                        </SocialIcon>
                    </SocialLinks>
                </ConnectCard>

                <FloatingEducation
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                >
                    <Degree>MSc in Data Science</Degree>
                    <University>Tech University, 2020</University>
                </FloatingEducation>
            </DashboardContainer>
        </BaseComponent>
    );
};

export default Dashboard;