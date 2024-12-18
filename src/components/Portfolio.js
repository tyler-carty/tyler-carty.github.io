import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Book,
    Briefcase,
    Brain,
    LineChart,
    Shield,
    Database,
    ArrowLeft,
    Menu,
    ExternalLink
} from 'lucide-react';

// Mobile Navigation Menu Component
const MobileNav = ({ chapters, currentChapter, onChapterSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="lg:hidden">
            <motion.button
                className="fixed top-4 right-4 z-50 p-2 rounded-full bg-slate-800/50 backdrop-blur-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
            >
                <Menu className="w-6 h-6" />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-slate-900/95 z-40 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="w-full max-w-md p-4 space-y-4"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                        >
                            {chapters.map((chapter, index) => (
                                <motion.button
                                    key={index}
                                    className={`w-full p-4 rounded-lg flex items-center gap-4 ${
                                        currentChapter === index
                                            ? 'bg-blue-500/20 text-blue-400'
                                            : 'bg-slate-800/50'
                                    }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                        onChapterSelect(index);
                                        setIsOpen(false);
                                    }}
                                >
                                    <chapter.icon className="w-6 h-6" />
                                    <span className="text-lg font-medium">{chapter.title}</span>
                                </motion.button>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Updated Chapter Component with Responsive Styles
const Chapter = ({ children, icon: Icon, title, index, isActive, progress }) => {
    const bgColors = [
        'from-blue-500/20', 'from-green-500/20', 'from-purple-500/20',
        'from-yellow-500/20', 'from-red-500/20', 'from-indigo-500/20'
    ];

    return (
        <motion.div
            className={`min-h-screen flex items-center justify-center p-4 md:p-8 bg-gradient-to-b ${bgColors[index]} to-slate-900`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0.3 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-4xl w-full">
                <motion.div
                    className="flex items-center gap-4 mb-6 md:mb-8"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
                </motion.div>

                <motion.div
                    className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 md:p-8"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    {children}
                </motion.div>

                <motion.div
                    className="h-1 bg-white/20 mt-6 md:mt-8 rounded-full overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="h-full bg-white"
                        style={{ width: `${progress * 100}%` }}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
};

// Updated TechStack Component
const TechStack = ({ technologies }) => {
    return (
        <div className="flex flex-wrap gap-2 md:gap-3 mt-4">
            {technologies.map((tech, index) => (
                <motion.span
                    key={tech}
                    className="px-2 md:px-3 py-1 bg-white/10 rounded-full text-xs md:text-sm"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                >
                    {tech}
                </motion.span>
            ))}
        </div>
    );
};

const PORTFOLIO_CHAPTERS = [
    {
        title: "The Foundation",
        icon: Book,
        content: (
            <>
                {/* University Section */}
                <div className="space-y-8">
                    <motion.div
                        className="space-y-4"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.6}}
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                            <h3 className="text-2xl font-bold text-blue-400">University Education</h3>
                            <motion.div
                                className="self-start sm:self-auto"  // This ensures the date stays left-aligned on mobile
                                initial={{opacity: 0, y: -10}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.3}}
                            >
                                <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full
                                    bg-gradient-to-r from-blue-500/20 to-blue-400/10 backdrop-blur-sm
                                    border border-blue-500/20 text-blue-300 whitespace-nowrap">
                                    Sept 2020 - July 2024
                                </span>
                            </motion.div>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-6 space-y-6">
                            {/* Degree Information */}
                            <div className="flex items-start justify-between">
                                <div>
                                    <h4 className="text-xl font-semibold">BSc Computer Science</h4>
                                    <p className="text-white/70">University of Derby</p>
                                </div>
                                <span className="text-lg font-bold text-blue-400">First Class Honours</span>
                            </div>

                            {/* Dean's Awards */}
                            <div className="space-y-3">
                                <motion.div
                                    className="p-3 bg-white/5 rounded-lg"
                                    initial={{scale: 0.95, opacity: 0}}
                                    animate={{scale: 1, opacity: 1}}
                                    transition={{delay: 0.7}}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-medium">Dean's Award for Academic Excellence</span>
                                        <span className="text-sm text-blue-400">2020-2024</span>
                                    </div>
                                    <p className="text-sm text-white/70">Achieved in all three years of study</p>
                                </motion.div>
                            </div>

                            {/* Technologies */}
                            <div>
                                <h5 className="text-lg font-semibold text-blue-400 mb-2">Key Focus Areas</h5>
                                <TechStack technologies={[
                                    "Data Science",
                                    "Machine Learning",
                                    "Software Engineering"
                                ]}/>
                            </div>
                        </div>
                    </motion.div>

                    {/*/!* A-Levels Section *!/*/}
                    {/*<motion.div*/}
                    {/*    className="space-y-4"*/}
                    {/*    initial={{ opacity: 0 }}*/}
                    {/*    animate={{ opacity: 1 }}*/}
                    {/*    transition={{ delay: 0.8 }}*/}
                    {/*>*/}
                    {/*    <div className="flex items-center justify-between mb-4">*/}
                    {/*        <h3 className="text-2xl font-bold text-green-400">A-Level Education</h3>*/}
                    {/*        <span className="text-sm text-white/70 bg-green-500/20 px-3 py-1 rounded-full">*/}
                    {/*            September 2018 - June 2020*/}
                    {/*        </span>*/}
                    {/*    </div>*/}
                    {/*    <div className="bg-slate-800/50 rounded-lg p-6 space-y-6">*/}
                    {/*        /!* Computer Science *!/*/}
                    {/*        <div className="space-y-3">*/}
                    {/*            <div className="flex items-start justify-between">*/}
                    {/*                <h4 className="text-xl font-semibold">Computer Science</h4>*/}
                    {/*                <span className="text-lg font-bold text-green-400">A*</span>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}

                    {/*        /!* Mathematics *!/*/}
                    {/*        <div className="space-y-3">*/}
                    {/*            <div className="flex items-start justify-between">*/}
                    {/*                <h4 className="text-xl font-semibold">Mathematics</h4>*/}
                    {/*                <span className="text-lg font-bold text-green-400">A*</span>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}

                    {/*        /!* IT & Software Development *!/*/}
                    {/*        <div className="space-y-3">*/}
                    {/*            <div className="flex items-start justify-between">*/}
                    {/*                <h4 className="text-xl font-semibold">IT & Software Development</h4>*/}
                    {/*                <span className="text-lg font-bold text-green-400">Distinction*</span>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</motion.div>*/}
                </div>
            </>
        )
    },
    {
        title: "First Steps in Banking",
        icon: Briefcase,
        content: (
            <>
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                        <h3 className="text-2xl font-bold">Industrial Placement @ Lloyds Banking Group</h3>
                        <motion.div
                            className="self-start sm:self-auto"
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.3}}
                        >
                        <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full
                            bg-gradient-to-r from-green-500/20 to-green-400/10 backdrop-blur-sm
                            border border-green-500/20 text-green-300 whitespace-nowrap">
                            June 2022 - Sept 2023
                        </span>
                        </motion.div>
                    </div>

                    <motion.div
                        className="space-y-2"
                        initial={{x: -50, opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        transition={{delay: 0.4}}
                    >
                        <h4 className="text-xl text-blue-400">Cloud Infrastructure Engineer</h4>
                        <p>Maintaining critical mortgage platform infrastructure</p>
                        <TechStack technologies={["Azure", "Kubernetes", "CI/CD", "Infrastructure as Code"]}/>
                    </motion.div>

                    <motion.div
                        className="space-y-2"
                        initial={{x: -50, opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        transition={{delay: 0.6}}
                    >
                        <h4 className="text-xl text-blue-400">Full Stack Engineer</h4>
                        <p>Modernising legacy applications and building new customer journeys</p>
                        <TechStack technologies={["React", "C#", ".NET", "Azure", "RESTful APIs"]}/>
                    </motion.div>
                </div>
            </>
        )
    },
    {
        title: "Freelancing Success",
        icon: Database,
        content: (
            <>
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                        <h3 className="text-2xl font-bold">Staff Management System</h3>
                        <motion.div
                            className="self-start sm:self-auto"
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.3}}
                        >
                            <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full
                                bg-gradient-to-r from-indigo-500/20 to-indigo-400/10 backdrop-blur-sm
                                border border-indigo-500/20 text-indigo-300 whitespace-nowrap">
                                June 2024 - Sept 2024
                            </span>
                        </motion.div>
                    </div>

                    <motion.div
                        className="space-y-4"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.4}}
                    >
                        <div className="space-y-3">
                            <p className="text-lg">Designed and implemented a comprehensive staff management and
                                accounting system, now successfully deployed at both Hodsock Priory and Prestwold Hall
                                venues.</p>

                            <ul className="space-y-2 mt-4">
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"/>
                                    Developed on-premise solutions for secure local deployment at each venue
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"/>
                                    Reduced administrative overhead by 70% through process automation
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"/>
                                    Implemented comprehensive staff management, scheduling, and payroll features
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"/>
                                    Delivered secure role-based access control for different staff levels
                                </li>
                            </ul>
                        </div>

                        <div className="mt-6">
                            <h5 className="text-lg font-semibold text-purple-400 mb-3">Technologies Used</h5>
                            <TechStack technologies={[
                                "React",
                                "Node.js",
                                "Express",
                                "MongoDB",
                                "System Architecture"
                            ]}/>
                        </div>
                    </motion.div>
                </div>
            </>
        )
    },
    {
        title: "Research & Innovation",
        icon: Brain,
        content: (
            <>
                <div className="space-y-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                        <h3 className="text-2xl font-bold text-yellow-400">University Research Projects</h3>
                        <motion.div
                            className="self-start sm:self-auto"
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.3}}
                        >
                            <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full
                                bg-gradient-to-r from-yellow-500/20 to-yellow-400/10 backdrop-blur-sm
                                border border-yellow-500/20 text-yellow-300 whitespace-nowrap">
                                2020 - 2024
                            </span>
                        </motion.div>
                    </div>

                    <motion.div
                        className="space-y-4"
                        initial={{x: -50, opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        transition={{delay: 0.4}}
                    >
                        <div className="flex items-start justify-between">
                            <h4 className="text-xl text-yellow-400">From Posts to Profits</h4>
                            <motion.a
                                href="https://github.com/tyler-carty/social-media-sentiment/blob/main/sentiment_analysis.ipynb"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                            >
                                <span className="text-sm">View Code</span>
                                <ExternalLink className="w-4 h-4"/>
                            </motion.a>
                        </div>
                        <p>Analysing social media's impact on stock markets</p>
                        <TechStack technologies={[
                            "Python", "FinBERT", "MemeBERT",
                            "Sentiment Analysis", "Financial Analysis"
                        ]}/>
                    </motion.div>

                    <motion.div
                        className="space-y-4"
                        initial={{x: -50, opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        transition={{delay: 0.6}}
                    >
                        <div className="flex items-start justify-between">
                            <h4 className="text-xl text-yellow-400">Healthcare ML Innovation</h4>
                            <motion.a
                                href="https://github.com/tyler-carty/pneumonia-ml-xai/blob/main/Pneumonia%20Prediction%20with%20ML%20and%20XAI.ipynb"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                            >
                                <span className="text-sm">View Code</span>
                                <ExternalLink className="w-4 h-4"/>
                            </motion.a>
                        </div>
                        <p>90% accurate pneumonia detection with explainable AI</p>
                        <TechStack technologies={[
                            "Neural Networks", "Computer Vision",
                            "XAI", "Healthcare ML"
                        ]}/>
                    </motion.div>
                </div>
            </>
        )
    },
    {
        title: "Fighting Financial Crime",
        icon: Shield,
        content: (
            <>
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                        <h3 className="text-2xl font-bold">Data Engineer @ Lloyds Banking Group</h3>
                        <motion.div
                            className="self-start sm:self-auto"
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.3}}
                        >
                            <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full
                                bg-gradient-to-r from-red-500/20 to-red-400/10 backdrop-blur-sm
                                border border-red-500/20 text-red-300 whitespace-nowrap">
                                Sept 2024 - Present
                            </span>
                        </motion.div>
                    </div>

                    <motion.div
                        className="space-y-4"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.4}}
                    >
                        <p>Transforming banking data into actionable insights for crime prevention</p>
                        <TechStack technologies={[
                            "Google Cloud Platform", "BigQuery", "Python",
                            "Java", "Data Engineering", "Machine Learning"
                        ]}/>
                    </motion.div>
                </div>
            </>
        )
    },
    {
        title: "Future Vision",
        icon: LineChart,
        content: (
            <>
                <motion.div
                    className="space-y-4"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                >
                    <p className="text-lg">
                        Passionate about advancing ML Engineering and Data Science in financial crime prevention,
                        focusing on developing innovative solutions that protect customers and enhance security.
                    </p>
                    <TechStack technologies={[
                        "Machine Learning", "Data Science", "Cloud Architecture",
                        "Financial Crime Prevention", "Innovation"
                    ]}/>
                </motion.div>
            </>
        )
    }
];

const NavigationDots = React.memo(({
                                       chapters,
                                       currentChapter,
                                       onDotClick,
                                       onHoverChange
                                   }) => {
    return (
        <motion.div
            className="fixed left-2 md:left-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 md:gap-4 z-50 hidden lg:flex"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
        >
            {chapters.map((chapter, index) => (
                <div key={index} className="relative">
                    <motion.button
                        className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 relative z-10
                            ${currentChapter === index
                            ? 'bg-white scale-125'
                            : index < currentChapter
                                ? 'bg-white/70 hover:bg-white'
                                : 'bg-white/30 hover:bg-white/50'
                        }`}
                        onClick={() => onDotClick(index)}
                        onMouseEnter={() => onHoverChange(index)}
                        onMouseLeave={() => onHoverChange(null)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                    />
                    {currentChapter === index && (
                        <motion.div
                            className="absolute inset-0 rounded-full bg-white/30"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1.5 }}
                            transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        />
                    )}
                </div>
            ))}
        </motion.div>
    );
});

const ChapterPreview = ({ chapter, isVisible }) => {
    return (
        <motion.div
            className="fixed left-16 top-1/2 -translate-y-1/2 bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 z-40"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
        >
            <p className="text-sm text-white/80">{chapter.title}</p>
        </motion.div>
    );
};


const Portfolio = () => {
    const [currentChapter, setCurrentChapter] = useState(0);
    const [isExploring, setIsExploring] = useState(false);
    const [hoveredChapter, setHoveredChapter] = useState(null);
    const containerRef = useRef(null);
    const isScrolling = useRef(false);
    const scrollTimeout = useRef(null);

    const scrollToChapter = React.useCallback((index) => {
        if (index >= 0 && index < PORTFOLIO_CHAPTERS.length && !isScrolling.current) {
            isScrolling.current = true;
            setCurrentChapter(index);

            // Reset scrolling state after animation
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
            scrollTimeout.current = setTimeout(() => {
                isScrolling.current = false;
            }, 700);
        }
    }, []);

    const handleKeyNavigation = React.useCallback((e) => {
        if (!isExploring || isScrolling.current) return;

        if (e.key === 'ArrowUp' && currentChapter > 0) {
            e.preventDefault();
            scrollToChapter(currentChapter - 1);
        } else if (e.key === 'ArrowDown' && currentChapter < PORTFOLIO_CHAPTERS.length - 1) {
            e.preventDefault();
            scrollToChapter(currentChapter + 1);
        }
    }, [isExploring, currentChapter, scrollToChapter]);

    // Handle wheel events (desktop)
    const handleWheel = React.useCallback((e) => {
        e.preventDefault();

        if (isScrolling.current) return;

        if (e.deltaY > 0 && currentChapter < PORTFOLIO_CHAPTERS.length - 1) {
            scrollToChapter(currentChapter + 1);
        } else if (e.deltaY < 0 && currentChapter > 0) {
            scrollToChapter(currentChapter - 1);
        }
    }, [currentChapter, scrollToChapter]);

    // Add touch handling for mobile
    const touchStart = useRef(null);

    // Handle touch events (mobile)
    const handleTouchStart = (e) => {
        touchStart.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
        e.preventDefault(); // Prevent native scroll

        if (isScrolling.current || !touchStart.current) return;

        const touchY = e.touches[0].clientY;
        const diff = touchStart.current - touchY;

        // Require minimum swipe distance of 50px
        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentChapter < PORTFOLIO_CHAPTERS.length - 1) {
                scrollToChapter(currentChapter + 1);
            } else if (diff < 0 && currentChapter > 0) {
                scrollToChapter(currentChapter - 1);
            }
            touchStart.current = null; // Reset to prevent multiple triggers
        }
    };

    const handleTouchEnd = () => {
        touchStart.current = null;
    };

    // Handle keyboard navigation
    useEffect(() => {
        if (isExploring) {
            window.addEventListener('keydown', handleKeyNavigation);
            return () => window.removeEventListener('keydown', handleKeyNavigation);
        }
    }, [isExploring, handleKeyNavigation]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
        };
    }, []);

    // Initialize when exploration starts
    useEffect(() => {
        if (isExploring) {
            setCurrentChapter(0);
            if (containerRef.current) {
                containerRef.current.scrollTo(0, 0);
            }
        }
    }, [isExploring]);

    return (
        <div className="h-screen bg-slate-900 text-white overflow-hidden">
            <AnimatePresence>
                {!isExploring ? (
                    <motion.div
                        className="h-screen flex flex-col items-center justify-center p-4 md:p-8 text-center"
                        exit={{ opacity: 0, scale: 0.8 }}
                    >
                        <motion.h1
                            className="text-4xl md:text-6xl font-bold mb-4 md:mb-6"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            Tyler Cartwright
                        </motion.h1>
                        <motion.h2
                            className="text-xl md:text-2xl text-blue-400 mb-6 md:mb-8"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            Software Engineer | Data Scientist | ML Engineer
                        </motion.h2>
                        <motion.button
                            className="px-6 md:px-8 py-3 md:py-4 bg-blue-500 rounded-full text-base md:text-lg font-semibold hover:bg-blue-600 transition-colors"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            onClick={() => setIsExploring(true)}
                        >
                            Explore My Journey
                        </motion.button>
                    </motion.div>
                ) : (
                    <>
                        <motion.button
                            className="fixed top-4 left-4 z-50 p-2 rounded-full bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/50 transition-colors"
                            onClick={() => {
                                setIsExploring(false);
                                setCurrentChapter(0);
                            }}
                            whileHover={{scale: 1.1}}
                            whileTap={{scale: 0.9}}
                        >
                            <ArrowLeft className="w-5 h-5"/>
                        </motion.button>

                        <MobileNav
                            chapters={PORTFOLIO_CHAPTERS}
                            currentChapter={currentChapter}
                            onChapterSelect={scrollToChapter}
                        />

                        <NavigationDots
                            chapters={PORTFOLIO_CHAPTERS}
                            currentChapter={currentChapter}
                            onDotClick={scrollToChapter}
                            onHoverChange={setHoveredChapter}
                        />

                        {hoveredChapter !== null && (
                            <ChapterPreview
                                chapter={PORTFOLIO_CHAPTERS[hoveredChapter]}
                                isVisible={true}
                            />
                        )}

                        <div className="h-screen overflow-hidden">
                            <div
                                ref={containerRef}
                                className="h-screen w-full flex flex-col touch-none transition-transform duration-700 ease-in-out"
                                onWheel={handleWheel}
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                                style={{
                                    transform: `translateY(-${currentChapter * 100}vh)`,
                                    overscrollBehavior: 'none',
                                    willChange: 'transform'
                                }}
                            >
                                {PORTFOLIO_CHAPTERS.map((chapter, index) => (
                                    <div
                                        key={index}
                                        className="h-screen w-full flex-shrink-0"
                                    >
                                        <Chapter
                                            icon={chapter.icon}
                                            title={chapter.title}
                                            index={index}
                                            isActive={currentChapter === index}
                                            progress={index <= currentChapter ? 1 : 0}
                                        >
                                            {chapter.content}
                                        </Chapter>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Portfolio;