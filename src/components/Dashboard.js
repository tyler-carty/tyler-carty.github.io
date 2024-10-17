import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { FaBriefcase, FaLaptopCode, FaGraduationCap, FaChartLine } from 'react-icons/fa';
import {BaseComponent} from "./BaseComponent";

const DashboardContainer = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
`;

const Card = styled(motion.div)`
    background-color: #112240;
    border-radius: 10px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h2`
    font-size: 1.5rem;
    color: #64ffda;
    margin-bottom: 1rem;
`;

const CardContent = styled.div`
    color: #8892b0;
`;

const SkillCategory = styled.div`
    margin-bottom: 1rem;
    cursor: pointer;
`;

const ProjectSummary = styled.div`
    margin-bottom: 1rem;
`;

const ProjectTitle = styled.h3`
    font-size: 1.2rem;
    color: #ccd6f6;
    margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
    font-size: 0.9rem;
    color: #8892b0;
`;

const QuickLink = styled(motion.a)`
    display: inline-block;
    margin-top: 0.5rem;
    color: #64ffda;
    text-decoration: none;
    font-size: 0.9rem;

    &:hover {
        text-decoration: underline;
    }
`;

const QuickStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  text-align: center;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: #1d3557;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(100, 255, 218, 0.1);
  }
`;

const StatIcon = styled.div`
  font-size: 24px;
  color: #64ffda;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #ccd6f6;
  margin: 0.25rem 0;
`;

const StatLabel = styled.p`
  font-size: 0.9rem;
  color: #8892b0;
  margin: 0;
`;

const skillsData = [
    { subject: 'React', A: 90, fullMark: 100 },
    { subject: 'Python', A: 85, fullMark: 100 },
    { subject: 'Data Science', A: 80, fullMark: 100 },
    { subject: 'Machine Learning', A: 75, fullMark: 100 },
    { subject: 'Cloud Computing', A: 70, fullMark: 100 },
];

const experienceData = [
    { year: '2019', value: 30 },
    { year: '2020', value: 50 },
    { year: '2021', value: 70 },
    { year: '2022', value: 85 },
    { year: '2023', value: 95 },
];

const projectsData = [
    {
        title: 'AI-Driven Market Analyzer',
        description: 'Developed an AI-powered tool for real-time market trend analysis.',
        link: '/projects#market-analyzer'
    },
    {
        title: 'Big Data Pipeline',
        description: 'Built a scalable data pipeline processing millions of transactions per hour.',
        link: '/projects#data-pipeline'
    },
    // Add more projects as needed
];

const Dashboard = ({ onReady }) => {
    const [activeSkillSet, setActiveSkillSet] = useState('technical');
    const [dataLoaded, setDataLoaded] = useState(false);

    const technicalSkills = skillsData;
    const softSkills = [
        { subject: 'Communication', A: 85, fullMark: 100 },
        { subject: 'Teamwork', A: 90, fullMark: 100 },
        { subject: 'Problem Solving', A: 88, fullMark: 100 },
        { subject: 'Adaptability', A: 82, fullMark: 100 },
        { subject: 'Leadership', A: 78, fullMark: 100 },
    ];

    const quickStats = [
        { icon: <FaBriefcase />, value: '5+ Years', label: 'Experience' },
        { icon: <FaLaptopCode />, value: '20+', label: 'Projects' },
        { icon: <FaGraduationCap />, value: 'MSc', label: 'Data Science' },
        { icon: <FaChartLine />, value: '10+', label: 'Technologies' },
    ];

    useEffect(() => {
        // Simulate any async operations
        const loadData = async () => {
            // Perform any necessary data fetching or initialization here
            // For now, we'll just use a timeout to simulate async operation
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

    if (!dataLoaded) {
        return (
            <BaseComponent title="Dashboard">
                <div>Loading...</div>
            </BaseComponent>
        );
    }

    return (
        <BaseComponent title="Dashboard">
            <DashboardContainer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="dashboard-overview"
            >
                <Card className="skills-chart">
                    <CardTitle>Skills Portfolio</CardTitle>
                    <CardContent>
                        <SkillCategory onClick={() => setActiveSkillSet('technical')}>
                            Technical Skills
                        </SkillCategory>
                        <SkillCategory onClick={() => setActiveSkillSet('soft')}>
                            Soft Skills
                        </SkillCategory>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSkillSet}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <ResponsiveContainer width="100%" height={300}>
                                    <RadarChart data={activeSkillSet === 'technical' ? technicalSkills : softSkills}>
                                        <PolarGrid />
                                        <PolarAngleAxis dataKey="subject" />
                                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                                        <Radar name="Skills" dataKey="A" stroke="#64ffda" fill="#64ffda" fillOpacity={0.6} />
                                        <Tooltip />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </motion.div>
                        </AnimatePresence>
                    </CardContent>
                </Card>

                <Card className="experience-chart">
                    <CardTitle>Experience Growth</CardTitle>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={experienceData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="value" stroke="#64ffda" fill="#64ffda" fillOpacity={0.3} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="recent-projects">
                    <CardTitle>Recent Projects</CardTitle>
                    <CardContent>
                        {projectsData.map((project, index) => (
                            <ProjectSummary key={index}>
                                <ProjectTitle>{project.title}</ProjectTitle>
                                <ProjectDescription>{project.description}</ProjectDescription>
                                <QuickLink
                                    href={project.link}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Learn More
                                </QuickLink>
                            </ProjectSummary>
                        ))}
                    </CardContent>
                </Card>

                <Card className="quick-stats">
                    <CardTitle>Quick Stats</CardTitle>
                    <CardContent>
                        <QuickStatsGrid>
                            {quickStats.map((stat, index) => (
                                <StatItem key={index}>
                                    <StatIcon>{stat.icon}</StatIcon>
                                    <StatValue>{stat.value}</StatValue>
                                    <StatLabel>{stat.label}</StatLabel>
                                </StatItem>
                            ))}
                        </QuickStatsGrid>
                    </CardContent>
                </Card>
            </DashboardContainer>
        </BaseComponent>
    );
};

export default Dashboard;