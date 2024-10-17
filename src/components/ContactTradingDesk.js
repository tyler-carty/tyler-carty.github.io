import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BaseComponent } from './BaseComponent';

const FormContainer = styled(motion.div)`
  background-color: #112240;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 0 15px rgba(100, 255, 218, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #64ffda;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #64ffda;
  background-color: #0a192f;
  color: #8892b0;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #64ffda;
  background-color: #0a192f;
  color: #8892b0;
  border-radius: 5px;
  resize: vertical;
`;

const SubmitButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background-color: #64ffda;
  color: #0a192f;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  align-self: flex-start;
`;

const ThankYouMessage = styled(motion.div)`
  color: #64ffda;
  margin-top: 1rem;
`;

const ContactTradingDesk = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formData);
        setIsSubmitted(true);
    };

    return (
        <BaseComponent title="Contact Trading Desk">
            <div className="contact-overview">
                <FormContainer
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                >
                    {!isSubmitted ? (
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="subject">Subject</Label>
                                <Input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="message">Message</Label>
                                <TextArea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                            <SubmitButton
                                type="submit"
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                            >
                                Send Message
                            </SubmitButton>
                        </Form>
                    ) : (
                        <ThankYouMessage
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                        >
                            Thank you for your message! I'll get back to you soon.
                        </ThankYouMessage>
                    )}
                </FormContainer>
            </div>
        </BaseComponent>
    );
};

export default ContactTradingDesk;