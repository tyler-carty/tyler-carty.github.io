import React from 'react';
import { ResponsiveContainer, RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import styled from 'styled-components';

const ChartTitle = styled.h3`
  font-size: 1.5rem;
  color: #64ffda;
  margin-bottom: 1rem;
  text-align: center;
`;

const RadarChart = ({ title, data, dataKey, height = 400 }) => {
    return (
        <>
            {title && <ChartTitle>{title}</ChartTitle>}
            <ResponsiveContainer width="100%" height={height}>
                <RechartsRadarChart data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="Skill Level" dataKey={dataKey} stroke="#64ffda" fill="#64ffda" fillOpacity={0.6} />
                    <Tooltip />
                </RechartsRadarChart>
            </ResponsiveContainer>
        </>
    );
};

export default RadarChart;