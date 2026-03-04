import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Developers = () => {
    const [hoveredLeft, setHoveredLeft] = useState(false);
    const [hoveredRight, setHoveredRight] = useState(false);
    const timerLeft = useRef(null);
    const timerRight = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={{
            width: '100%',
            minHeight: isMobile ? '135vw' : '100vh',
            position: 'relative'
        }}>
            {/* Full-page dark blur base from App background */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.65)',
                backdropFilter: 'blur(3px)',
                zIndex: 0
            }}></div>

            {/* Container for Full Screen Image + Overlay */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                width: '100%',
                minHeight: isMobile ? '135vw' : '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingTop: '120px',
                overflow: 'hidden'
            }}>
                {/* Text Overlay */}
                <div className="text-center" style={{
                    zIndex: 3,
                    position: 'absolute',
                    top: 0,
                    padding: isMobile ? '1rem' : '2rem'
                }}>
                    <h1 className="ap-title" style={{ color: '#ffb300', textShadow: '4px 4px 8px rgba(0,0,0,0.9)', margin: 0, fontSize: isMobile ? '2.5rem' : '5rem' }}>
                        DE<span className="op-font">V</span>ELOPERS
                    </h1>
                    <p style={{ color: '#fff', fontSize: isMobile ? '0.9rem' : '1.4rem', fontFamily: "'Inter', sans-serif", textAlign: 'center', textShadow: '2px 2px 4px #000', marginTop: '0.5rem', fontWeight: 500 }}>
                        Meet the minds behind Hack-O-Holic 4.0
                    </p>
                </div>

                {/* Left Interaction Area (Luffy side) */}
                <div
                    style={{ position: 'absolute', top: 0, left: 0, width: isMobile ? '42%' : '38%', height: '100%', zIndex: 10, cursor: 'pointer' }}
                    onMouseEnter={() => !isMobile && setHoveredLeft(true)}
                    onMouseLeave={() => !isMobile && setHoveredLeft(false)}
                    onClick={() => {
                        if (isMobile) {
                            setHoveredLeft(true);
                            if (timerLeft.current) clearTimeout(timerLeft.current);
                            timerLeft.current = setTimeout(() => setHoveredLeft(false), 5000);
                        }
                    }}
                >
                    {/* Transparent Cutout Layer */}
                    <motion.img
                        src="/assets/duo%20luffy.png"
                        alt="Developer 1"
                        whileHover={{ scale: 1.06, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: isMobile ? '1px' : '2px',
                            width: isMobile ? '65%' : 'calc(100% + 55px)',
                            height: isMobile ? '65%' : 'calc(100% + 35px)',
                            objectFit: 'contain',
                            objectPosition: 'bottom left',
                            pointerEvents: 'auto',
                            transformOrigin: 'bottom left',
                            cursor: 'pointer'
                        }}
                    />

                    {/* Left Detail Card Sliding In */}
                    <AnimatePresence>
                        {hoveredLeft && (
                            <motion.div
                                initial={{ x: -300, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -300, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                style={{
                                    position: 'absolute',
                                    top: '40%',
                                    right: isMobile ? '-5%' : '10%',
                                    width: isMobile ? '120px' : '300px',
                                    padding: isMobile ? '0.5rem' : '2rem',
                                    background: 'transparent',
                                    color: 'white',
                                    textAlign: 'right'
                                }}
                            >
                                <a href="https://www.linkedin.com/in/ishant-singh-bisht-247a4b322" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                    <h3 style={{ fontSize: isMobile ? '1.4rem' : '2.5rem', margin: 0, color: '#ffb300', fontFamily: "'Bebas Neue', sans-serif", textShadow: '3px 3px 6px rgba(0,0,0,0.9)' }}>Ixotic</h3>
                                </a>
                                <p style={{ fontSize: isMobile ? '0.7rem' : '1.2rem', fontFamily: "'Inter', sans-serif", textShadow: '2px 2px 4px #000', fontWeight: 'bold' }}>Lead Developer</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Interaction Area (Ace side) */}
                <div
                    style={{ position: 'absolute', top: 0, right: 0, width: isMobile ? '42%' : '38%', height: '100%', zIndex: 10, cursor: 'pointer' }}
                    onMouseEnter={() => !isMobile && setHoveredRight(true)}
                    onMouseLeave={() => !isMobile && setHoveredRight(false)}
                    onClick={() => {
                        if (isMobile) {
                            setHoveredRight(true);
                            if (timerRight.current) clearTimeout(timerRight.current);
                            timerRight.current = setTimeout(() => setHoveredRight(false), 5000);
                        }
                    }}
                >
                    {/* Transparent Cutout Layer */}
                    <motion.img
                        src="/assets/duo%20ace.png"
                        alt="Developer 2"
                        whileHover={{ scale: 1.06, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                        style={{
                            position: 'absolute',
                            bottom: isMobile ? 0 : '-27px',
                            right: isMobile ? '1px' : '2px',
                            width: isMobile ? 'calc(100% + 10px)' : 'calc(100% + 60px)',
                            height: isMobile ? 'calc(100% + 10px)' : 'calc(100% + 40px)',
                            objectFit: 'contain',
                            objectPosition: 'bottom right',
                            pointerEvents: 'auto',
                            transformOrigin: 'bottom right',
                            cursor: 'pointer'
                        }}
                    />

                    {/* Right Detail Card Sliding In */}
                    <AnimatePresence>
                        {hoveredRight && (
                            <motion.div
                                initial={{ x: 300, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 300, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                style={{
                                    position: 'absolute',
                                    top: '40%',
                                    left: isMobile ? '-10px' : '-120px',
                                    width: isMobile ? '120px' : '300px',
                                    padding: isMobile ? '0.5rem' : '2rem',
                                    background: 'transparent',
                                    color: 'white',
                                    textAlign: 'left'
                                }}
                            >
                                <a href="https://www.linkedin.com/in/sandeep-singh-3b716b327" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                    <h3 style={{ fontSize: isMobile ? '1.4rem' : '2.5rem', margin: 0, color: '#ffb300', fontFamily: "'Bebas Neue', sans-serif", textShadow: '3px 3px 6px rgba(0,0,0,0.9)' }}>Arstoca</h3>
                                </a>
                                <p style={{ fontSize: isMobile ? '0.7rem' : '1.2rem', fontFamily: "'Inter', sans-serif", textShadow: '2px 2px 4px #000', fontWeight: 'bold' }}>UI/UX Designer</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Developers;
