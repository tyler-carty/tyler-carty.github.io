import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FaBriefcase, FaLaptopCode, FaGraduationCap, FaEnvelope } from 'react-icons/fa';

const DashboardContainer = styled(motion.div)`
    padding: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
`;

const DashboardHeader = styled.h1`
    font-size: 2.5rem;
    margin-bottom: 2rem;
    grid-column: 1 / -1;
    color: #64ffda;
`;

const SectionContainer = styled.div`
    background-color: #112240;
    border-radius: 10px;
    padding: 1.5rem;
    box-shadow: 0 0 15px rgba(100, 255, 218, 0.1);
`;

const SectionTitle = styled.h2`
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #64ffda;
`;

const QuickLinkContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
`;

const QuickLink = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1d3557;
    border-radius: 10px;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: #64ffda;
        color: #0a192f;
    }
`;

const SkillContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`;

const SkillName = styled.span`
    flex: 1;
`;

const SkillBar = styled.div`
  flex: 2;
  height: 10px;
  background-color: #1d3557;
  border-radius: 5px;
  overflow: hidden;
`;

const SkillProgress = styled.div`
  height: 100%;
  background-color: #64ffda;
  width: ${props => props.width}%;
`;

const experienceData = [
    { year: 2019, value: 30 },
    { year: 2020, value: 50 },
    { year: 2021, value: 70 },
    { year: 2022, value: 85 },
    { year: 2023, value: 95 },
];

const skillsData = [
    { name: 'React', value: 90 },
    { name: 'Python', value: 85 },
    { name: 'Data Science', value: 80 },
    { name: 'Machine Learning', value: 75 },
    { name: 'Cloud Computing', value: 70 },
];

const projectData = [
    { name: 'Sentiment Dynamics', value: 30 },
    { name: 'TeslaTrack', value: 25 },
    { name: 'FraudGuard', value: 20 },
    { name: 'VenueVantage', value: 25 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
    return (
        <DashboardContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <DashboardHeader>Portfolio Dashboard</DashboardHeader>

            <SectionContainer>
                <SectionTitle>Experience Growth</SectionTitle>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={experienceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#64ffda" />
                    </LineChart>
                </ResponsiveContainer>
            </SectionContainer>

            <SectionContainer>
                <SectionTitle>Skills Portfolio</SectionTitle>
                {skillsData.map((skill, index) => (
                    <SkillContainer key={index}>
                        <SkillName>{skill.name}</SkillName>
                        <SkillBar>
                            <SkillProgress width={skill.value} />
                        </SkillBar>
                    </SkillContainer>
                ))}
            </SectionContainer>

            <SectionContainer>
                <SectionTitle>Project Distribution</SectionTitle>
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie
                            data={projectData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {projectData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </SectionContainer>

            <SectionContainer>
                <SectionTitle>Quick Links</SectionTitle>
                <QuickLinkContainer>
                    <QuickLink whileHover={{ scale: 1.05 }}><FaBriefcase size={24} /></QuickLink>
                    <QuickLink whileHover={{ scale: 1.05 }}><FaLaptopCode size={24} /></QuickLink>
                    <QuickLink whileHover={{ scale: 1.05 }}><FaGraduationCap size={24} /></QuickLink>
                    <QuickLink whileHover={{ scale: 1.05 }}><FaEnvelope size={24} /></QuickLink>
                </QuickLinkContainer>
            </SectionContainer>
        </DashboardContainer>
    );
};

export default Dashboard;