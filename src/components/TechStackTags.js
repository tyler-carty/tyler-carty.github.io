import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const TagContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
`;

const Tag = styled(motion.span)`
    background-color: #1d3557;
    color: #64ffda;
    padding: 0.25rem 0.5rem;
    border-radius: 5px;
    font-size: 0.8rem;
`;

const TechStackTags = ({ tags }) => {
    return (
        <TagContainer>
            {tags.map((tag, index) => (
                <Tag
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                    {tag}
                </Tag>
            ))}
        </TagContainer>
    );
};

export default TechStackTags;