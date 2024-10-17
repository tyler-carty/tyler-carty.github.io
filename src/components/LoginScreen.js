import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoginContainer = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
    box-sizing: border-box;
`;

const LoginForm = styled.form`
    width: 100%;
    max-width: 300px;
    background-color: #112240;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(100, 255, 218, 0.2);
`;

const LoginTitle = styled.h1`
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
    color: #64ffda;
`;

const InputContainer = styled.div`
    position: relative;
    margin-bottom: 1rem;
    height: 2rem;
`;

const LoginInput = styled.div`
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    border: none;
    border-bottom: 2px solid #64ffda;
    background-color: transparent;
    color: #64ffda;
    font-size: 1rem;
    display: flex;
    align-items: center;
`;

const Cursor = styled.span`
    display: inline-block;
    width: 2px;
    height: 1.2em;
    background-color: #64ffda;
    margin-left: 2px;
    animation: blink 0.7s infinite;

    @keyframes blink {
        0% { opacity: 0 }
        50% { opacity: 1 }
        100% { opacity: 0 }
    }
`;

const LoginButton = styled.button`
    width: 100%;
    padding: 0.75rem;
    background-color: ${props => props.disabled ? '#45c7b3' : '#64ffda'};
    color: #0a192f;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    transition: all 0.3s ease;
    opacity: ${props => props.disabled ? 0.7 : 1};

    &:hover {
        background-color: ${props => props.disabled ? '#45c7b3' : '#45c7b3'};
    }
`;

const LoginScreen = ({ onLogin }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isTypingUsername, setIsTypingUsername] = useState(true);
    const [isTypingPassword, setIsTypingPassword] = useState(false);

    const fullUsername = 'tyler-cartwright';
    const fullPassword = 'password123';

    useEffect(() => {
        let timeout;
        if (isTypingUsername) {
            if (username !== fullUsername) {
                timeout = setTimeout(() => {
                    setUsername(prevUsername => fullUsername.slice(0, prevUsername.length + 1));
                }, 100);
            } else {
                setIsTypingUsername(false);
                setIsTypingPassword(true)
            }
        } else if (isTypingPassword) {
            if (password !== fullPassword) {
                timeout = setTimeout(() => {
                    setPassword(prevPassword => fullPassword.slice(0, prevPassword.length + 1));
                }, 100);
            } else {
                setIsTypingPassword(false);
            }
        }
        return () => clearTimeout(timeout);
    }, [username, password, isTypingUsername, isTypingPassword]);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            onLogin();
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
                <InputContainer>
                    <LoginInput>
                        {username}
                        {isTypingUsername && <Cursor />}
                    </LoginInput>
                </InputContainer>
                <InputContainer>
                    <LoginInput>
                        {password.split('').map(() => '*').join('')}
                        {isTypingPassword && <Cursor />}
                    </LoginInput>
                </InputContainer>
                <LoginButton type="submit" disabled={isTypingUsername || isTypingPassword || isLoading}>
                    {isLoading ? 'Accessing...' : 'Access Portfolio'}
                </LoginButton>
            </LoginForm>
        </LoginContainer>
    );
};

export default LoginScreen;