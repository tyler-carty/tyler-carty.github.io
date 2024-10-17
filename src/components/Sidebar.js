import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChartLine, FaBriefcase, FaGraduationCap, FaEnvelope } from 'react-icons/fa';

const SidebarContainer = styled.div`
  background-color: #0a192f;
  width: 200px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding: 2rem 0;
`;

const Logo = styled.h1`
  color: #64ffda;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
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
`;

const Icon = styled.span`
  margin-right: 1rem;
`;

const Sidebar = () => {
    const location = useLocation();

    const navItems = [
        { path: '/dashboard', icon: <FaHome />, label: 'Dashboard' },
        { path: '/projects', icon: <FaChartLine />, label: 'Projects' },
        { path: '/experience', icon: <FaBriefcase />, label: 'Experience' },
        { path: '/learning', icon: <FaGraduationCap />, label: 'Learning' },
        { path: '/contact', icon: <FaEnvelope />, label: 'Contact' },
    ];

    return (
        <SidebarContainer>
            <Logo>TC Portfolio</Logo>
            <NavList>
                {navItems.map((item, index) => (
                    <NavItem key={index}>
                        <NavLink to={item.path} active={location.pathname === item.path}>
                            <Icon>{item.icon}</Icon>
                            {item.label}
                        </NavLink>
                    </NavItem>
                ))}
            </NavList>
        </SidebarContainer>
    );
};

export default Sidebar;