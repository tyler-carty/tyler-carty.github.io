import React from 'react';
import { ResponsiveContainer, RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import styled from 'styled-components';

const ChartTitle = styled.h3`
    font-size: 1.5rem;
    color: #64ffda;
    margin-bottom: 1rem;
    text-align: center;
`;

const CustomTooltip = styled.div`
    background-color: #0a192f;
    border: 1px solid #64ffda;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(100, 255, 218, 0.2);
`;

const TooltipLabel = styled.p`
    color: #64ffda;
    font-weight: bold;
    margin: 0;
`;

const TooltipValue = styled.p`
    color: #8892b0;
    margin: 5px 0 0;
`;

const CustomTooltipComponent = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const metricName = payload[0].payload.subject;
        return (
            <CustomTooltip>
                <TooltipLabel>{metricName}</TooltipLabel>
                <TooltipValue>{`${payload[0].value}%`}</TooltipValue>
            </CustomTooltip>
        );
    }
    return null;
};

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
                    <Tooltip content={<CustomTooltipComponent />} />
                </RechartsRadarChart>
            </ResponsiveContainer>
        </>
    );
};

export default RadarChart;