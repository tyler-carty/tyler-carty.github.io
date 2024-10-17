import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChartLine, FaBriefcase, FaGraduationCap, FaEnvelope, FaBars, FaQuestionCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SidebarContainer = styled(motion.div)`
    background-color: #0a192f;
    width: 200px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    padding: 2rem 0;
    z-index: 1000;
    transition: all 0.3s ease-in-out;

    @media (max-width: 768px) {
        width: ${props => props.isOpen ? '200px' : '60px'};
        overflow: ${props => props.isOpen ? 'visible' : 'hidden'};
    }
`;

const Logo = styled.h1`
    color: #64ffda;
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
        font-size: ${props => props.isOpen ? '1.5rem' : '1rem'};
        margin-bottom: ${props => props.isOpen ? '2rem' : '1rem'};
    }
`;

const NavList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const NavItem = styled.li`
    margin-bottom: 1rem;
`;

const NavLink = styled(Link)`
    display: flex;
    align-items: center;
    color: ${props => props.active ? '#64ffda' : '#8892b0'};
    text-decoration: none;
    padding: 0.5rem 1rem;
    transition: all 0.3s ease;

    &:hover {
        background-color: #112240;
    }

    @media (max-width: 768px) {
        justify-content: ${props => props.isOpen ? 'flex-start' : 'center'};
        padding: ${props => props.isOpen ? '0.5rem 1rem' : '0.5rem'};
    }
`;

const Icon = styled.span`
    margin-right: 1rem;

    @media (max-width: 768px) {
        margin-right: ${props => props.isOpen ? '1rem' : '0'};
    }
`;

const Label = styled.span`
    @media (max-width: 768px) {
        display: ${props => props.isOpen ? 'inline' : 'none'};
    }
`;

const MenuButton = styled.button`
    display: none;
    background: none;
    border: none;
    color: #64ffda;
    font-size: 1.5rem;
    cursor: pointer;
    position: absolute;
    top: 1rem;
    right: -3rem;
    z-index: 1001;

    @media (max-width: 768px) {
        display: block;
    }
`;

const TourButton = styled.button`
  background-color: #64ffda;
  color: #0a192f;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: bold;
  transition: all 0.3s ease;
  margin-top: 1rem;
  width: 80%;
  margin-left: 10%;

  &:hover {
    background-color: #45c7b3;
  }

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
  }
`;

const Sidebar = ({ setShowTour }) => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(window.innerWidth > 768);

    useEffect(() => {
        const handleResize = () => {
            setIsOpen(window.innerWidth > 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navItems = [
        { path: '/dashboard', icon: <FaHome />, label: 'Dashboard' },
        { path: '/projects', icon: <FaChartLine />, label: 'Projects' },
        { path: '/experience', icon: <FaBriefcase />, label: 'Experience' },
        { path: '/learning', icon: <FaGraduationCap />, label: 'Learning' },
        { path: '/contact', icon: <FaEnvelope />, label: 'Contact' },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <SidebarContainer
            isOpen={isOpen}
            initial={false}
            animate={{ width: isOpen ? 200 : 60 }}
            transition={{ duration: 0.3 }}
        >
            <Logo isOpen={isOpen}>TC Portfolio</Logo>
            <MenuButton onClick={toggleMenu}>
                <FaBars />
            </MenuButton>
            <NavList>
                {navItems.map((item, index) => (
                    <NavItem key={index}>
                        <NavLink to={item.path} active={location.pathname === item.path ? 1 : 0} isOpen={isOpen}>
                            <Icon isOpen={isOpen}>{item.icon}</Icon>
                            <Label isOpen={isOpen}>{item.label}</Label>
                        </NavLink>
                    </NavItem>
                ))}
            </NavList>
            <TourButton onClick={() => setShowTour(true)} isOpen={isOpen}>
                <FaQuestionCircle /> {isOpen && "Start Tour"}
            </TourButton>
        </SidebarContainer>
    );
};

export default Sidebar;