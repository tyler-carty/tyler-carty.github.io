import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BaseComponent } from "./BaseComponent";
import {
    FaReact, FaNodeJs, FaPython, FaGoogle, FaGithub, FaLinkedin, FaEnvelope,
    FaChartLine, FaTrophy, FaUser, FaGraduationCap
} from 'react-icons/fa';

const DashboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    background-color: #0a192f;
    min-height: 100vh;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

const FloatingElement = styled(motion.div)`
    background-color: rgba(17, 34, 64, 0.8);
    border-radius: 10px;
    padding: 1.5rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    width: 100%;
`;

const Header = styled.div`
    margin-bottom: 2rem;
`;

const Name = styled(motion.h1)`
    font-size: 4rem;
    color: #64ffda;
    margin-bottom: 0.5rem;

    @media (max-width: 768px) {
        font-size: 3rem;
    }
`;

const Title = styled(motion.h2)`
    font-size: 2rem;
    color: #8892b0;

    @media (max-width: 768px) {
        font-size: 1.5rem;
    }
`;

const CardHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    color: #64ffda;
`;

const CardIcon = styled.div`
    font-size: 1.5rem;
    margin-right: 0.5rem;
`;

const CardTitle = styled.h3`
    font-size: 1.2rem;
    margin: 0;
`;

const SkillsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;
`;

const SkillsFloatingElement = styled(FloatingElement)`
    background-color: rgba(17, 34, 64, 0.8);
    border-radius: 10px;
    padding: 1.5rem;
    width: 100%;
`;

const SkillIcon = styled(motion.div)`
    font-size: 2.5rem;
    color: #64ffda;
    display: flex;
    align-items: center;
`;

const SkillName = styled.span`
    color: #8892b0;
    font-size: 0.9rem;
    margin-left: 0.5rem;
`;

const BioText = styled.p`
    font-size: 1rem;
    color: #8892b0;
    line-height: 1.6;
    margin-bottom: 1rem;
`;

const BioHighlight = styled.span`
    color: #64ffda;
    font-weight: bold;
`;

const AchievementList = styled.ul`
    color: #8892b0;
    padding-left: 0;
    list-style-type: none;
`;

const AchievementItem = styled.li`
    margin-bottom: 1rem;
    display: flex;
    align-items: flex-start;
`;

const AchievementIcon = styled.div`
    color: #64ffda;
    font-size: 1.2rem;
    margin-right: 0.5rem;
    margin-top: 0.2rem;
`;

const AchievementText = styled.p`
    margin: 0;
`;

const AchievementMetric = styled.span`
    display: block;
    color: #64ffda;
    font-weight: bold;
    font-size: 1.1rem;
    margin-top: 0.2rem;
`;

const Degree = styled.h4`
    font-size: 1.2rem;
    color: #64ffda;
    margin-bottom: 0.5rem;
`;

const University = styled.p`
    font-size: 1rem;
    color: #8892b0;
    margin-bottom: 1rem;
`;

const SocialLinks = styled.div`
    display: flex;
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

const BottomGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const GridElement = styled(FloatingElement)`
  margin: 0;
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
        { name: 'Python', icon: FaPython },
        { name: 'React', icon: FaReact },
        { name: 'Node.js', icon: FaNodeJs },
        { name: 'GCP', icon: FaGoogle },
    ];

    const achievementsData = [
        {
            icon: <FaChartLine />,
            text: "Modernised industry-leading financial systems",
            metric: "1M+ Users"
        },
        {
            icon: <FaTrophy />,
            text: "Developed end-to-end solutions improving admin for local businesses",
            metric: "40+ Hours per Month"
        },
        {
            icon: <FaUser />,
            text: "Contributed to crime prevention by maintaining real-time transaction data flow",
            metric: "400M+ Records"
        }
    ];

    const educationData = {
        degree: "BSc in Computer Science",
        university: "University of Derby",
        year: "2024",
    };

    if (!dataLoaded) {
        return (
            <BaseComponent>
                <Header>
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
                </Header>
                <div>Loading...</div>
            </BaseComponent>
        );
    }

    return (
        <BaseComponent>
            <DashboardContainer>
                <Header>
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
                </Header>

                <FloatingElement
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <CardHeader>
                        <CardIcon><FaUser /></CardIcon>
                        <CardTitle>About Me</CardTitle>
                    </CardHeader>
                    <BioText>
                        Passionate engineer with <BioHighlight>3+ years</BioHighlight> of experience in full-stack development and data science.
                        I thrive on creating <BioHighlight>scalable solutions</BioHighlight> and turning <BioHighlight>complex data</BioHighlight> into <BioHighlight>actionable insights</BioHighlight>.
                    </BioText>
                    <BioText>
                        Always pushing the boundaries of what's possible in tech.
                    </BioText>
                </FloatingElement>

                <SkillsFloatingElement
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <CardHeader>
                        <CardIcon><FaChartLine /></CardIcon>
                        <CardTitle>Top Skills</CardTitle>
                    </CardHeader>
                    <SkillsContainer>
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
                </SkillsFloatingElement>

                <FloatingElement
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <CardHeader>
                        <CardIcon><FaTrophy /></CardIcon>
                        <CardTitle>Key Achievements</CardTitle>
                    </CardHeader>
                    <AchievementList>
                        {achievementsData.map((achievement, index) => (
                            <AchievementItem key={index}>
                                <AchievementIcon>{achievement.icon}</AchievementIcon>
                                <div>
                                    <AchievementText>{achievement.text}</AchievementText>
                                    <AchievementMetric>{achievement.metric}</AchievementMetric>
                                </div>
                            </AchievementItem>
                        ))}
                    </AchievementList>
                </FloatingElement>

                <BottomGrid>
                    <GridElement
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <CardHeader>
                            <CardIcon><FaGraduationCap /></CardIcon>
                            <CardTitle>Education</CardTitle>
                        </CardHeader>
                        <Degree>{educationData.degree}</Degree>
                        <University>{educationData.university}, {educationData.year}</University>
                    </GridElement>

                    <GridElement
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                    >
                        <CardHeader>
                            <CardIcon><FaEnvelope /></CardIcon>
                            <CardTitle>Let's Connect</CardTitle>
                        </CardHeader>
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
                    </GridElement>
                </BottomGrid>
            </DashboardContainer>
        </BaseComponent>
    );
};

export default Dashboard;