import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BaseComponent } from './BaseComponent';

const LearningCard = styled(motion.div)`
  background-color: #112240;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 0 15px rgba(100, 255, 218, 0.1);
`;

const LearningTitle = styled.h3`
  font-size: 1.5rem;
  color: #64ffda;
  margin-bottom: 1rem;
`;

const LearningDescription = styled.p`
  margin-bottom: 1rem;
`;

const ProgressBar = styled.div`
  height: 10px;
  background-color: #1d3557;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const Progress = styled.div`
  height: 100%;
  width: ${props => props.width}%;
  background-color: #64ffda;
`;

const ChartTitle = styled.h3`
  font-size: 1.5rem;
  color: #64ffda;
  margin-bottom: 1rem;
  text-align: center;
`;

const learningData = [
    {
        title: "Advanced Machine Learning",
        description: "Deepening knowledge in neural networks and deep learning",
        progress: 60,
        futureValue: 95
    },
    {
        title: "Blockchain Development",
        description: "Learning Solidity and smart contract development",
        progress: 30,
        futureValue: 80
    },
    {
        title: "Cloud Architecture",
        description: "Mastering multi-cloud environments and serverless architectures",
        progress: 45,
        futureValue: 90
    }
];

const chartData = learningData.map(item => ({
    name: item.title,
    current: item.progress,
    potential: item.futureValue
}));

const LearningFutures = () => {
    return (
        <BaseComponent title="Learning Futures">
            {learningData.map((item, index) => (
                <LearningCard
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <LearningTitle>{item.title}</LearningTitle>
                    <LearningDescription>{item.description}</LearningDescription>
                    <ProgressBar>
                        <Progress width={item.progress} />
                    </ProgressBar>
                    <p>Current Progress: {item.progress}%</p>
                    <p>Future Potential: {item.futureValue}%</p>
                </LearningCard>
            ))}

            <ChartTitle>Learning Growth Potential</ChartTitle>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="current" fill="#8884d8" name="Current Progress" />
                    <Bar dataKey="potential" fill="#82ca9d" name="Future Potential" />
                </BarChart>
            </ResponsiveContainer>
        </BaseComponent>
    );
};

export default LearningFutures;