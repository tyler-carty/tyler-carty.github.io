import React from 'react';
import { BaseComponent, SectionContainer, SectionTitle } from './BaseComponent';

const ProjectInvestments = () => {
    return (
        <BaseComponent title="Project Investments">
            <SectionContainer>
                <SectionTitle>Sentiment Dynamics</SectionTitle>
                {/* Add content for Sentiment Dynamics project */}
            </SectionContainer>

            <SectionContainer>
                <SectionTitle>TeslaTrack</SectionTitle>
                {/* Add content for TeslaTrack project */}
            </SectionContainer>

            <SectionContainer>
                <SectionTitle>FraudGuard</SectionTitle>
                {/* Add content for FraudGuard project */}
            </SectionContainer>

            <SectionContainer>
                <SectionTitle>VenueVantage</SectionTitle>
                {/* Add content for VenueVantage project */}
            </SectionContainer>
        </BaseComponent>
    );
};

export default ProjectInvestments;