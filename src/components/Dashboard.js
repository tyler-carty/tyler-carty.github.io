import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const DashboardContainer = styled(motion.div)`
    padding: 2rem;
`;

const DashboardHeader = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const SectionContainer = styled.div`
  background-color: #112240;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 0 15px rgba(100, 255, 218, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

const Dashboard = () => {
    useEffect(() => {
        // You can add any initialization logic here
    }, []);

    return (
        <DashboardContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <DashboardHeader>Portfolio Dashboard</DashboardHeader>

            <SectionContainer>
                <SectionTitle>Profile Summary</SectionTitle>
                {/* Add profile summary content here */}
            </SectionContainer>

            <SectionContainer>
                <SectionTitle>Experience Stocks</SectionTitle>
                {/* Add experience stocks content here */}
            </SectionContainer>

            <SectionContainer>
                <SectionTitle>Skills Portfolio</SectionTitle>
                {/* Add skills portfolio content here */}
            </SectionContainer>
        </DashboardContainer>
    );
};

export default Dashboard;