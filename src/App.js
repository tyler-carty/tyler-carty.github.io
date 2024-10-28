import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Portfolio from './components/Portfolio';

const App = () => {
    return (
        <AnimatePresence mode="wait">
            <div className="min-h-screen bg-slate-900 font-sans antialiased">
                {/* Initial page load animation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                >
                    {/* Background gradient effect */}
                    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

                    {/* Background grid pattern */}
                    <div
                        className="fixed inset-0 opacity-10"
                        style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '32px 32px'
                        }}
                    />

                    {/* Main content */}
                    <main className="relative z-10">
                        <Portfolio />
                    </main>

                    {/* Social links */}
                    <footer className="fixed bottom-4 right-4 flex gap-4 z-50">
                        <motion.a
                            href="https://github.com/tyler-carty"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/50 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </motion.a>
                        <motion.a
                            href="https://linkedin.com/in/tyler-cartwright"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/50 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </motion.a>
                    </footer>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default App;