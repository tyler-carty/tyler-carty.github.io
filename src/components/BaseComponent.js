import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageContainer = styled(motion.div)`
  padding: 2rem;
  color: #8892b0;
`;

const PageHeader = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #64ffda;
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
  color: #64ffda;
`;

const BaseComponent = ({ title, children }) => {
    return (
        <PageContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <PageHeader>{title}</PageHeader>
            {children}
        </PageContainer>
    );
};

export { BaseComponent, SectionContainer, SectionTitle };