import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoginContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 300px;
    background-color: #112240;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(100, 255, 218, 0.2);
`;

const LoginTitle = styled.h1`
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
`;

const LoginInput = styled.input`
    margin-bottom: 1rem;
    padding: 0.5rem;
    border: none;
    border-bottom: 2px solid #64ffda;
    background-color: transparent;
    color: #64ffda;
    font-size: 1rem;

    &::placeholder {
        color: #8892b0;
    }
`;

const LoginButton = styled.button`
  padding: 0.75rem;
  background-color: #64ffda;
  color: #0a192f;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #45c7b3;
    transform: translateY(-2px);
  }
`;

const LoginScreen = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            navigate('/dashboard');
        }, 1000);
    };

    return (
        <LoginContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <LoginForm onSubmit={handleLogin}>
                <LoginTitle>Tyler Cartwright's Portfolio</LoginTitle>
                <LoginInput type="text" placeholder="Username" value="TylerCartwright" readOnly />
                <LoginInput type="password" placeholder="Password" value="********" readOnly />
                <LoginButton type="submit" disabled={isLoading}>
                    {isLoading ? 'Accessing...' : 'Access Portfolio'}
                </LoginButton>
            </LoginForm>
        </LoginContainer>
    );
};

export default LoginScreen;