import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Book,
    Briefcase,
    Brain,
    LineChart,
    Shield,
    Database,
    ArrowLeft
} from 'lucide-react';

const Chapter = ({ children, icon: Icon, title, description, index, isActive, progress }) => {
    const bgColors = [
        'from-blue-500/20', 'from-green-500/20', 'from-purple-500/20',
        'from-yellow-500/20', 'from-red-500/20', 'from-indigo-500/20'
    ];

    return (
        <motion.div
            className={`min-h-screen flex items-center justify-center p-8 bg-gradient-to-b ${bgColors[index]} to-slate-900`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0.3 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-4xl w-full">
                <motion.div
                    className="flex items-center gap-4 mb-8"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className={`w-16 h-16 rounded-full bg-white/10 flex items-center justify-center`}>
                        <Icon className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold">{title}</h2>
                </motion.div>

                <motion.div
                    className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-8"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    {children}
                </motion.div>

                <motion.div
                    className="h-1 bg-white/20 mt-8 rounded-full overflow-hidden"
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

const TechStack = ({ technologies }) => {
    return (
        <div className="flex flex-wrap gap-3 mt-4">
            {technologies.map((tech, index) => (
                <motion.span
                    key={tech}
                    className="px-3 py-1 bg-white/10 rounded-full text-sm"
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

const PORTFOLIO_CHAPTERS  = [
    {
        title: "The Foundation",
        icon: Book,
        content: (
            <>
                <motion.h3
                    className="text-2xl mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    Academic Excellence
                </motion.h3>
                <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <p className="text-lg">BSc Computer Science (First Class Honours)</p>
                    <TechStack technologies={[
                        "Computer Science A*", "Mathematics A*",
                        "IT & Software Development Distinction*"
                    ]} />
                </motion.div>
            </>
        )
    },
    {
        title: "First Steps in Banking",
        icon: Briefcase,
        content: (
            <>
                <motion.h3
                    className="text-2xl mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    Lloyds Banking Group Internship
                </motion.h3>
                <div className="space-y-6">
                    <motion.div
                        className="space-y-2"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h4 className="text-xl text-blue-400">Cloud Infrastructure Engineer</h4>
                        <p>Maintaining critical mortgage platform infrastructure</p>
                        <TechStack technologies={["Azure", "Kubernetes", "CI/CD", "Infrastructure as Code"]} />
                    </motion.div>

                    <motion.div
                        className="space-y-2"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h4 className="text-xl text-blue-400">Full Stack Engineer</h4>
                        <p>Modernizing legacy applications and building new features</p>
                        <TechStack technologies={["React", "C#", ".NET", "Azure", "RESTful APIs"]} />
                    </motion.div>
                </div>
            </>
        )
    },
    {
        title: "Solo Project Success",
        icon: Database,
        content: (
            <>
                <motion.h3
                    className="text-2xl mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    Hodsock Priory Management System
                </motion.h3>
                <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <p>Transformed venue management processes through custom software</p>
                    <TechStack technologies={[
                        "React", "Node.js", "Express", "MongoDB",
                        "System Architecture", "Project Management"
                    ]} />
                </motion.div>
            </>
        )
    },
    {
        title: "Research & Innovation",
        icon: Brain,
        content: (
            <>
                <div className="space-y-8">
                    <motion.div
                        className="space-y-2"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h4 className="text-xl text-yellow-400">From Posts to Profits</h4>
                        <p>Analyzing social media's impact on stock markets</p>
                        <TechStack technologies={[
                            "Python", "FinBERT", "MemeBERT",
                            "Sentiment Analysis", "Financial Analysis"
                        ]} />
                    </motion.div>

                    <motion.div
                        className="space-y-2"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h4 className="text-xl text-yellow-400">Healthcare ML Innovation</h4>
                        <p>90% accurate pneumonia detection with explainable AI</p>
                        <TechStack technologies={[
                            "Neural Networks", "Computer Vision",
                            "XAI", "Healthcare ML"
                        ]} />
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
                <motion.h3
                    className="text-2xl mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    Data Engineer @ Lloyds Banking Group
                </motion.h3>
                <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <p>Transforming banking data into actionable insights for crime prevention</p>
                    <TechStack technologies={[
                        "Google Cloud Platform", "BigQuery", "Python",
                        "Java", "Data Engineering", "Machine Learning"
                    ]} />
                </motion.div>
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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <p className="text-lg">
                        Passionate about advancing ML Engineering and Data Science in financial crime prevention,
                        focusing on developing innovative solutions that protect customers and enhance security.
                    </p>
                    <TechStack technologies={[
                        "Machine Learning", "Data Science", "Cloud Architecture",
                        "Financial Crime Prevention", "Innovation"
                    ]} />
                </motion.div>
            </>
        )
    }
];

// NavigationDots component with hover functionality
const NavigationDots = React.memo(({
                                       chapters,
                                       currentChapter,
                                       onDotClick,
                                       onHoverChange  // New prop for handling hover
                                   }) => {
    return (
        <motion.div
            className="fixed left-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
        >
            {chapters.map((chapter, index) => (
                <motion.button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentChapter === index
                            ? 'bg-white scale-125'
                            : 'bg-white/30 hover:bg-white/50'
                    }`}
                    onClick={() => onDotClick(index)}
                    onMouseEnter={() => onHoverChange(index)}
                    onMouseLeave={() => onHoverChange(null)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                />
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
    const [isScrolling, setIsScrolling] = useState(false);
    const containerRef = useRef(null);
    const lastScrollTime = useRef(0);

    const scrollToChapter = React.useCallback((index) => {
        if (index >= 0 && index < PORTFOLIO_CHAPTERS.length && !isScrolling) {
            setIsScrolling(true);
            setCurrentChapter(index);

            const element = containerRef.current;
            if (element) {
                const chapterHeight = element.clientHeight;
                element.scrollTo({
                    top: index * chapterHeight,
                    behavior: 'smooth'
                });
            }

            setTimeout(() => {
                setIsScrolling(false);
                lastScrollTime.current = Date.now();
            }, 700);
        }
    }, [isScrolling]); // Removed PORTFOLIO_CHAPTERS.length from dependencies

    const handleKeyNavigation = React.useCallback((e) => {
        if (!isExploring) return;

        const now = Date.now();
        if (now - lastScrollTime.current < 700) return;

        if (e.key === 'ArrowUp' && currentChapter > 0) {
            e.preventDefault();
            scrollToChapter(currentChapter - 1);
        } else if (e.key === 'ArrowDown' && currentChapter < PORTFOLIO_CHAPTERS.length - 1) {
            e.preventDefault();
            scrollToChapter(currentChapter + 1);
        }
    }, [isExploring, currentChapter, scrollToChapter]); // Removed PORTFOLIO_CHAPTERS.length

    const handleScroll = React.useCallback(() => {
        const element = containerRef.current;
        if (!element || isScrolling) return;

        const now = Date.now();
        if (now - lastScrollTime.current < 700) return;

        const scrollPosition = element.scrollTop;
        const chapterHeight = element.clientHeight;
        const newChapter = Math.round(scrollPosition / chapterHeight);

        if (newChapter !== currentChapter && newChapter >= 0 && newChapter < PORTFOLIO_CHAPTERS.length) {
            setCurrentChapter(newChapter);
            lastScrollTime.current = now;
        }
    }, [isScrolling, currentChapter]); // Removed PORTFOLIO_CHAPTERS.length

    // Initialize when exploration starts
    useEffect(() => {
        if (isExploring) {
            setCurrentChapter(0);
            if (containerRef.current) {
                containerRef.current.scrollTo(0, 0);
            }
        }
    }, [isExploring]);

    // Handle keyboard navigation
    useEffect(() => {
        if (isExploring) {
            window.addEventListener('keydown', handleKeyNavigation);
            return () => window.removeEventListener('keydown', handleKeyNavigation);
        }
    }, [isExploring, handleKeyNavigation]);

    // Handle scroll events
    useEffect(() => {
        const container = containerRef.current;
        if (container && isExploring) {
            container.addEventListener('scroll', handleScroll, { passive: true });
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, [isExploring, handleScroll]);

    return (
        <div className="h-screen bg-slate-900 text-white overflow-hidden">
            <AnimatePresence>
                {!isExploring ? (
                    <motion.div
                        className="h-screen flex flex-col items-center justify-center p-8 text-center"
                        exit={{ opacity: 0, scale: 0.8 }}
                    >
                        <motion.h1
                            className="text-6xl font-bold mb-6"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            Tyler Cartwright
                        </motion.h1>
                        <motion.h2
                            className="text-2xl text-blue-400 mb-8"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            Software Engineer | Data Scientist | ML Engineer
                        </motion.h2>
                        <motion.button
                            className="px-8 py-4 bg-blue-500 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors"
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

                        <NavigationDots
                            chapters={PORTFOLIO_CHAPTERS}
                            currentChapter={currentChapter}
                            onDotClick={(index) => {
                                if (!isScrolling) {
                                    scrollToChapter(index);
                                }
                            }}
                            onHoverChange={setHoveredChapter}
                        />

                        {hoveredChapter !== null && (
                            <ChapterPreview
                                chapter={PORTFOLIO_CHAPTERS[hoveredChapter]}
                                isVisible={hoveredChapter !== null}
                            />
                        )}

                        <div
                            ref={containerRef}
                            className="h-screen overflow-y-auto snap-y snap-mandatory"
                            onWheel={(e) => {
                                // Prevent any action if already scrolling
                                if (isScrolling) {
                                    e.preventDefault();
                                    return;
                                }

                                // Check the time since last scroll
                                const now = Date.now();
                                if (now - lastScrollTime.current < 700) {
                                    e.preventDefault();
                                    return;
                                }

                                e.preventDefault();
                                if (e.deltaY > 0 && currentChapter < PORTFOLIO_CHAPTERS.length - 1) {
                                    scrollToChapter(currentChapter + 1);
                                } else if (e.deltaY < 0 && currentChapter > 0) {
                                    scrollToChapter(currentChapter - 1);
                                }
                            }}
                        >
                            {PORTFOLIO_CHAPTERS.map((chapter, index) => (
                                <div key={index} className="snap-start h-screen">
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
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Portfolio;