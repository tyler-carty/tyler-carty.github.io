import React from 'react';
import { BaseComponent, SectionContainer, SectionTitle } from './BaseComponent';

const LearningFutures = () => {
    return (
        <BaseComponent title="Learning Futures">
            <SectionContainer>
                <SectionTitle>Current Learning</SectionTitle>
                {/* Add content for current learning */}
            </SectionContainer>

            <SectionContainer>
                <SectionTitle>Future Goals</SectionTitle>
                {/* Add content for future goals */}
            </SectionContainer>
        </BaseComponent>
    );
};

export default LearningFutures;