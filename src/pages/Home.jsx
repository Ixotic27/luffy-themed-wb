import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { Clock, Users, GraduationCap, MapPin, Anchor, Award } from 'lucide-react';

function Home() {
    const location = useLocation();

    // Scroll to section if hash exists
    useEffect(() => {
        if (location.hash) {
            let elem = document.getElementById(location.hash.slice(1));
            if (elem) {
                setTimeout(() => elem.scrollIntoView({ behavior: 'smooth' }), 100);
            }
        } else {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
    }, [location]);

    // Countdown State
    const [timeLeft, setTimeLeft] = useState({
        days: '00', hours: '00', minutes: '00', seconds: '00'
    });

    // Track card active state
    const [activeTrack, setActiveTrack] = useState(null);

    const tracks = [
        { id: 1, image: 'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/tc1_qoqghv', title: 'AI & Machine Learning', description: 'Build intelligent solutions using cutting-edge AI and ML technologies.', color: '#1a1a2e', imgPosition: 'top center' },
        { id: 4, image: 'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/tc4_tjynjx', title: 'Open Innovation', description: 'Revolutionize finance with blockchain and decentralized systems.', color: '#1b1b2f', imgPosition: 'center top' },
        { id: 3, image: 'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/tc2_c1nobf', title: 'IoT & Hardware', description: 'Bridge the physical and digital worlds through smart connected devices.', color: '#16213e', imgPosition: 'top center' },
        { id: 5, image: 'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/tc5_pdj0oe', title: 'Cybersecurity', description: 'Defend the digital frontier with innovative security solutions.', color: '#162032', imgPosition: 'top center' },
        { id: 2, image: 'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/tc3_totskg', title: 'Cloud Computing', description: 'Create powerful web and mobile applications for the modern era.', color: '#5a2d00', imgPosition: 'top center' },
    ];

    // Carousel State
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const carouselImages = [
        'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/carousel-image-1_ppo0vc',
        'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/carousel-image-2_a0xkww',
        'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/carousel-image-3_yaeclz',
        'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/carousel-image-4_dliwfv'
    ];

    // Preload all carousel images on mount to eliminate fetch delay on slide change
    useEffect(() => {
        carouselImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    // Auto-advance Carousel
    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
        }, 4000); // 4 seconds per slide
        return () => clearInterval(slideInterval);
    }, [carouselImages.length]);

    // Gallery State (gallery-bg.png section)
    const [galleryIndex, setGalleryIndex] = useState(0);
    const galleryImages = [
        'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/g1_rqdbko',
        'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/g2_tv0r5r',
        'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/g3_i9iw5f',
        'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/g4_ngrxtv',
        'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/g5_fdymth',
        'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/g6_t1vfhn',
        'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/g7_asqdyf',
        'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/g8_nkbis3',
        'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/g9_uymbrv',
        'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/g10_fd9puj',
        'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/g11_q1zydu',
        'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/g12_ndcxk3'
    ];

    useEffect(() => {
        const galleryInterval = setInterval(() => {
            setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
        }, 3000); // 3 seconds per slide
        return () => clearInterval(galleryInterval);
    }, [galleryImages.length]);

    // Preload all gallery images on mount to eliminate fetch delay on slide change
    useEffect(() => {
        galleryImages.forEach((src, i) => {
            setTimeout(() => {
                const img = new Image();
                img.src = src;
            }, i * 200); // stagger by 200ms each so we don't hammer the network
        });
    }, []);

    useEffect(() => {
        const targetDate = new Date('March 28, 2026 00:00:00').getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({
                days: days.toString().padStart(2, '0'),
                hours: hours.toString().padStart(2, '0'),
                minutes: minutes.toString().padStart(2, '0'),
                seconds: seconds.toString().padStart(2, '0')
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* Intro Section */}
            <section id="home" className="about-section slide-up" style={{ marginTop: '2rem' }}>
                <div className="about-text" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)', minWidth: 0 }}>
                    <h1 className="about-title" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color: '#ffffff', marginBottom: '0', wordBreak: 'break-word', lineHeight: '1.1' }}>HACK-<span className="op-font">O</span>-HOLIC 4.0</h1>
                    <h2 className="about-title-secondary" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', color: '#ffffff', borderBottom: 'none', paddingBottom: 0, wordBreak: 'break-word' }}>P<span className="op-font">I</span>RATE K<span className="op-font">I</span>NG'S CHALLENGE</h2>

                    <p className="about-desc" style={{ fontSize: '1.5rem', color: '#e2e8f0', marginTop: '1.5rem' }}>
                        Set Sail for the Ultimate One Piece Themed Hackathon!<br />
                        Code, Create, and Conquer!
                    </p>
                </div>

                <div className="about-image">
                    <div className="pirate-manga-panel">
                        <img src="https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/luffy_thumbs_up_uqxtnq" alt="Luffy Thumbs Up" />
                        <div className="panel-caption">Setting sail on the digital Grand Line</div>
                    </div>
                </div>
            </section>

            {/* Countdown & Description Section */}
            <section id="mission" className="countdown-section">
                <h2 className="about-title" style={{ fontSize: '4rem', color: '#ffffff', marginBottom: '2rem', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>CHALLENGE BEGINS IN:</h2>

                <div className="custom-countdown-container" style={{ flexWrap: 'nowrap', overflowX: 'auto' }}>
                    <div className="countdown-box">
                        <span className="box-digit">{timeLeft.days}</span>
                        <span className="box-label">DAYS</span>
                    </div>
                    <span className="countdown-colon">:</span>
                    <div className="countdown-box">
                        <span className="box-digit">{timeLeft.hours}</span>
                        <span className="box-label">HOURS</span>
                    </div>
                    <span className="countdown-colon">:</span>
                    <div className="countdown-box">
                        <span className="box-digit">{timeLeft.minutes}</span>
                        <span className="box-label">MINUTES</span>
                    </div>
                    <span className="countdown-colon">:</span>
                    <div className="countdown-box">
                        <span className="box-digit">{timeLeft.seconds}</span>
                        <span className="box-label">SECONDS</span>
                    </div>
                </div>

                <div className="description-container" style={{ maxWidth: '800px', marginTop: 'calc(4rem - 20px)' }}>
                    <img src="https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/description_no8zhs" alt="Hackathon Description Details" className="description-img" loading="lazy" decoding="async" />
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                        <Link
                            to="/register"
                            style={{ display: 'inline-block', transition: 'transform 0.3s ease', cursor: 'pointer', backgroundColor: '#ffffff', padding: '0.4rem', borderRadius: '8px', textDecoration: 'none' }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <div style={{ border: '2px solid #1e40af', padding: '0.2rem', borderRadius: '4px', backgroundColor: '#ffffff' }}>
                                <img src="https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/register_jmkwc7" alt="Register Now" style={{ width: '100%', maxWidth: '350px', height: 'auto', display: 'block' }} loading="lazy" decoding="async" />
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* home-artwork-bg.jpg Page Layout Section */}
            <section style={{ width: '100%', backgroundColor: '#0f172a', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <div className="thematic-bg-container" style={{ width: '100%', position: 'relative' }}>
                    <img src="https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/home-artwork-bg_ejs7y0" alt="One Piece Artwork" className="thematic-bg-img" loading="lazy" decoding="async" />
                    {/* Top Fade Transition */}
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '200px', background: 'linear-gradient(180deg, rgba(31,34,40,1) 0%, rgba(31,34,40,0) 100%)' }}></div>
                    {/* Subtle Red Thematic Overlay */}
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(139, 0, 0, 0.2)', mixBlendMode: 'multiply', pointerEvents: 'none' }}></div>
                    {/* Bottom Fade out to Footer */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100px', background: 'linear-gradient(0deg, rgba(21,24,28,1) 0%, rgba(21,24,28,0) 100%)' }}></div>

                    {/* Thematic positioning for the text & carousel content over the home-artwork-bg.jpg background image */}
                    <div className="thematic-overlay">

                        {/* Left Column: Description & Stats */}
                        <div className="thematic-text-col">
                            <h2 className="mobile-only-heading">AB<span className="op-font">O</span>UT HACK-<span className="op-font">O</span>-HOLIC 4.0</h2>
                            <div style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#cbd5e1', marginBottom: '2rem', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
                                <p style={{ marginBottom: '1.5rem' }}>
                                    Hack-O-Holic 4.0 is the ultimate One Piece-themed hackathon, bringing together developers, designers, and innovators to build incredible projects in a 24-hour voyage.
                                </p>
                                <p>
                                    Inspired by the spirit of adventure, camaraderie, and creativity, we challenge participants to push their boundaries and create solutions that could change the Grand Line of technology. Join us for an unforgettable experience filled with coding, challenges, and pirate spirit.
                                </p>
                            </div>
                            <p style={{ fontSize: '1.2rem', color: '#fbbf24', fontWeight: 'bold', marginBottom: '4rem', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
                                Only 250 teams will be registered initially, and only 110 exceptional crews will be shortlisted for the finale.<br />
                                Exclusive to Graphic Era Hill University!
                            </p>

                            {/* Stats Row */}
                            <div className="stats-row">
                                <div className="stats-box">
                                    <div className="stats-number">250</div>
                                    <div className="stats-label">Participants</div>
                                </div>
                                <div className="stats-box">
                                    <div className="stats-number">24</div>
                                    <div className="stats-label">Hours</div>
                                </div>
                                <div className="stats-box">
                                    <div className="stats-number">25K+</div>
                                    <div className="stats-label">In Prizes</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Image Carousel */}
                        <div className="carousel-wrapper">
                            <div className="carousel-container" style={{ position: 'relative', width: '100%', aspectRatio: '16/9', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '5px solid #c92a2a', boxShadow: '0 0 20px rgba(201, 42, 42, 0.4)', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#000' }}>

                                {/* The Background/Current Image */}
                                <AnimatePresence>
                                    <motion.img
                                        key={currentImageIndex}
                                        src={carouselImages[currentImageIndex]}
                                        alt={`Gallery slide ${currentImageIndex + 1}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.6, ease: "easeInOut" }}
                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}
                                    />
                                </AnimatePresence>
                            </div>

                            {/* Navigation Dots */}
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', zIndex: 10 }}>
                                {carouselImages.map((_, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        style={{
                                            width: '12px',
                                            height: '12px',
                                            borderRadius: '50%',
                                            backgroundColor: currentImageIndex === idx ? '#c92a2a' : 'rgba(255, 255, 255, 0.4)',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.3s ease',
                                            boxShadow: currentImageIndex === idx ? '0 0 10px #c92a2a' : 'none'
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Event Details Section */}
            <section className="event-details-section">
                <div className="event-details-bg">
                    <img src="https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/going-merry-bg_xga6uh" alt="Going Merry Ship" className="event-details-ship event-ship-desktop" loading="lazy" decoding="async" />
                    <img src="https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/mobile3_atuahk" alt="Going Merry Ship Mobile" className="event-details-ship event-ship-mobile" loading="lazy" decoding="async" />
                    {/* Top fade — blends from dark above */}
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '180px', background: 'linear-gradient(to bottom, rgba(21,24,28,1) 0%, transparent 100%)', zIndex: 5, pointerEvents: 'none' }}></div>
                    {/* Bottom fade — blends into bright-bg.png section */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '180px', background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 100%)', zIndex: 5, pointerEvents: 'none' }}></div>
                </div>
                <div className="event-details-content">
                    <h2 className="event-details-title">GR<span className="op-font">A</span>ND L<span className="op-font">I</span>NE G<span className="op-font">U</span>IDELINES</h2>
                    {/* Desktop Cards - PNG images with text */}
                    <div className="event-cards-grid desktop-cards">
                        <div className="event-card-wrapper card-luffy">
                            <img src="https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/luffy_dujdzd" alt="Format Card" className="event-card-img" loading="lazy" decoding="async" />
                            <div className="event-card-text">
                                <span className="event-card-label">FORMAT</span>
                                <span className="event-card-value">24 Hours · Offline — On Campus</span>
                            </div>
                        </div>
                        <div className="event-card-wrapper card-zoro">
                            <img src="https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/zoro_gpuj1x" alt="Team Size Card" className="event-card-img" loading="lazy" decoding="async" />
                            <div className="event-card-text">
                                <span className="event-card-label">TEAM SIZE</span>
                                <span className="event-card-value">2 – 4 Members</span>
                            </div>
                        </div>
                        <div className="event-card-wrapper card-nami">
                            <img src="https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/nami_rgnnc8" alt="Eligibility Card" className="event-card-img" loading="lazy" decoding="async" />
                            <div className="event-card-text">
                                <span className="event-card-label">ELIGIBILITY</span>
                                <span className="event-card-value">University Students</span>
                            </div>
                        </div>
                        <div className="event-card-wrapper card-sanji">
                            <img src="https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/sanji_nz3t1k" alt="Venue Card" className="event-card-img" loading="lazy" decoding="async" />
                            <div className="event-card-text">
                                <span className="event-card-label">VENUE</span>
                                <span className="event-card-value">Graphic Era Hill University<br />Dehradun</span>
                            </div>
                        </div>
                        <div className="event-card-wrapper card-ussop">
                            <img src="https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/ussop_qhtzrg" alt="Max Registrations Card" className="event-card-img" loading="lazy" decoding="async" />
                            <div className="event-card-text">
                                <span className="event-card-label">MAX REGISTRATIONS</span>
                                <span className="event-card-value">250 Teams</span>
                            </div>
                        </div>
                        <div className="event-card-wrapper card-chopper">
                            <img src="https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/chopper_2_zaomg4" alt="Finale Entries Card" className="event-card-img" loading="lazy" decoding="async" />
                            <div className="event-card-text">
                                <span className="event-card-label">FINALE ENTRIES</span>
                                <span className="event-card-value">110 / 250</span>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Cards - Text based */}
                    <div className="event-cards-grid mobile-cards">
                        <div className="event-card cyan">
                            <span className="event-card-icon"><Clock size={24} color="#00e5ff" /></span>
                            <span className="event-card-label">FORMAT</span>
                            <span className="event-card-value">24 Hours · Offline — On Campus</span>
                        </div>
                        <div className="event-card cyan">
                            <span className="event-card-icon"><Users size={24} color="#00e5ff" /></span>
                            <span className="event-card-label">TEAM SIZE</span>
                            <span className="event-card-value">2 – 4 Members</span>
                        </div>
                        <div className="event-card cyan">
                            <span className="event-card-icon"><GraduationCap size={24} color="#00e5ff" /></span>
                            <span className="event-card-label">ELIGIBILITY</span>
                            <span className="event-card-value">University Students</span>
                        </div>
                        <div className="event-card gold">
                            <span className="event-card-icon"><MapPin size={24} color="#ffb300" /></span>
                            <span className="event-card-label">VENUE</span>
                            <span className="event-card-value">Graphic Era Hill University, Dehradun</span>
                        </div>
                        <div className="event-card gold">
                            <span className="event-card-icon"><Anchor size={24} color="#ffb300" /></span>
                            <span className="event-card-label">MAX REGISTRATIONS</span>
                            <span className="event-card-value">250 Teams</span>
                        </div>
                        <div className="event-card gold">
                            <span className="event-card-icon"><Award size={24} color="#ffb300" /></span>
                            <span className="event-card-label">FINALE ENTRIES</span>
                            <span className="event-card-value">110 / 250</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* New Section for bright-bg.png - Natural aspect ratio with Overlay Text and Background effect */}
            <section id="road-to-laughtale" className="new-section-4" style={{
                width: '100%',
                position: 'relative',
                backgroundColor: '#000',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '5rem 1rem 6rem 1rem'
            }}>
                {/* Dark overlay */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 0 }}></div>
                {/* Top fade — blends from going-merry-bg.jpeg section */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '150px', background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, transparent 100%)', zIndex: 1, pointerEvents: 'none' }}></div>
                {/* Bottom fade — blends into nikka.jpeg */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100px', background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 100%)', zIndex: 1, pointerEvents: 'none' }}></div>

                <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h1 className="about-title text-center" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#ffb300', textShadow: '2px 2px 4px rgba(0,0,0,0.8)', marginBottom: '4rem' }}>
                        R<span className="op-font">O</span>AD T<span className="op-font">O</span> L<span className="op-font">A</span>UGH T<span className="op-font">A</span>LE
                    </h1>

                    {/* Event Flow - Dark Cards under bright-bg.png */}
                    <div className="event-flow-wrapper">

                        {/* Round 1 Card */}
                        <div className="flow-card">
                            <div className="flow-node">01</div>
                            <div className="flow-content">
                                <h3>Round 1: Registration Round</h3>
                                <ul className="flow-list">
                                    <li>Submit your presentation, explaining your idea.</li>
                                    <li>Showcase your creativity and problem-solving approach.</li>
                                    <li>The most promising ideas will be selected to move on to the next round.</li>
                                    <li className="highlight-yellow">Last date of submission: March 21, 2025</li>
                                </ul>
                                <div className="flow-badges">
                                    <span className="badge badge-purple">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                        Team Size: 3-4 Members
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Round 2 Card */}
                        <div className="flow-card">
                            <div className="flow-node">02</div>
                            <div className="flow-content">
                                <h3>Round 2: 24 Hours Hackathon</h3>
                                <ul className="flow-list">
                                    <li>Teams will have 24 hours of nonstop innovation and developing solutions.</li>
                                    <li>Rs. 300 registration fee per team if your team is selected.</li>
                                    <li>Fun events and games to keep the energy high.</li>
                                    <li>A chance to win exciting rewards and prizes.</li>
                                </ul>
                                <div className="flow-badges">
                                    <span className="badge badge-dark">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                        Duration: 24 Hours
                                    </span>
                                    <span className="badge badge-dark">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
                                        Selection: Top 3 Teams
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Smooth Fade Transition blending the bottom of the map into the next section */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '250px', background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 100%)', zIndex: 10, pointerEvents: 'none' }}></div>
            </section>

            {/* New Section for nikka.jpeg - Background is absolute, content is in-flow */}
            <section className="nikka-section-wrapper">
                {/* Background image + glass overlay — absolute behind everything */}
                <picture className="nikka-bg-picture">
                    <source media="(max-width: 900px)" srcSet="https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/mobile_nikka_j8cidh" />
                    <img src="https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/nikka_t8uh2s" alt="" aria-hidden="true" className="nikka-bg-img" loading="lazy" decoding="async" />
                </picture>
                <div className="nikka-bg-overlay"></div>

                {/* Smooth top fade from previous section — reduced to avoid heavy black bleed */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '120px', background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, transparent 100%)', zIndex: 10, pointerEvents: 'none' }}></div>

                {/* Smooth bottom fade into the next section */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '150px', background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 100%)', zIndex: 10, pointerEvents: 'none' }}></div>

                {/* In-flow content — grows the section naturally */}
                <div className="nikka-content">
                    {/* Section Header */}
                    <h2 className="track-section-title">Choose Your Track</h2>

                    {/* Track Cards Row */}
                    <div className="track-cards-wrapper">
                        {tracks.map(track => (
                            <div
                                key={track.id}
                                className={`track-card track-card-${track.id} ${activeTrack === track.id ? 'track-card-active' : ''}`}
                                style={{ background: `linear-gradient(180deg, ${track.color} 0%, #000 100%)` }}
                                onClick={() => setActiveTrack(activeTrack === track.id ? null : track.id)}
                            >
                                {/* Text content at top */}
                                <div className="track-card-text">
                                    <h3 className="track-card-title">{track.title}</h3>
                                    <p className={`track-card-desc ${activeTrack === track.id ? 'track-card-desc-visible' : ''}`}>{track.description}</p>
                                </div>

                                {/* Image at bottom */}
                                <div className="track-card-img-wrapper">
                                    <img
                                        src={track.image}
                                        alt={track.title}
                                        className={`track-card-img track-card-img-${track.id}`}
                                        style={{ objectPosition: track.imgPosition }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== Manga Panel Mosaic Scroller ===== */}
            {(() => {
                const row1 = [
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/Luffy_r9gnrp',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/one_piece_manga_vjriqt',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/download_nausq0',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/download_1_fdhski',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/download_2_xj5egc',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/download_3_rigbuy',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/download_4_lqf4my',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/26ff1d71915a78bd30b6d9b24bb6c994_rdj2ko',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/gear2_i30q7e',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/50d48b2918f1cb1459bd32c7a9666ede_vw9chb',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/Hack O Holic 4.0/new manga panels/pxb79lykluxell8obvzg',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/Hack O Holic 4.0/new manga panels/wwdrta2nsrscskego3kx',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/Hack O Holic 4.0/new manga panels/bnfbv0t7rnrsmsixnhg8',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/Hack O Holic 4.0/new manga panels/l3qjaj3la2vceuzvffhh',
                ];
                const row2 = [
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/download_5_q7d3s9',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/download_6_e9bohg',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/download_7_jrp2n2',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/download_8_bp7wwn',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/download_9_dprw6p',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/download_10_qqthhc',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/p1_abdoxf',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/one_piece-_monkey_d__luffy_mpcacs',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/f0c83cbbb913934694c5990734c6e0a9_lxlyj8',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/loki_first_appearance_oxqxqu',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/luffy_gear_5_brblaj',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/Hack O Holic 4.0/new manga panels/wijsk7nassyu0uivxgsm',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/Hack O Holic 4.0/new manga panels/jov19lxotlrknrysriir',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/Hack O Holic 4.0/new manga panels/a9c4ny621xsubcdzhoos',
                ];
                const row3 = [
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/download_11_ke2kiw',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/download_12_dxouex',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/download_13_kkr3cp',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/download_14_iyd31s',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/onepiece____manga____story____nakama____pirates____anime____king_of_pirates____story____chapter____sshzt0',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/bipskiug3v4n4rwhjewl',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/Screenshot_2026-03-02_162330_isyoxw',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/Screenshot_2026-03-02_163205_x10huk',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/whats-your-favorite-one-piece-manga-panel-v0-pfvg890ojfbf1_d00slq',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/whitebeard_vs_marine_qg4ofl',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/wp11456620_syoitc',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/drop-the-coolest-looking-op-manga-panel-artistically-v0-r37rr45eee4f1_qte4wn',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/Hack O Holic 4.0/new manga panels/fumem1vy6szrbfm4ckmz',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/Hack O Holic 4.0/new manga panels/ryrpwdrp9ehr9jrgexor',
                    'https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/Hack O Holic 4.0/new manga panels/sudunzlfwxwm478cef88',
                ];

                return (
                    <>
                        {/* ===== gallery-bg.png Gallery Section (Matches structure of mobile 4/nikka) ===== */}
                        <section id="gallery" className="nikka-section-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '12rem 1rem 4rem 1rem' }}>
                            {/* Background image + glass overlay — absolute behind everything */}
                            <picture className="nikka-bg-picture">
                                <source media="(max-width: 900px)" srcSet="https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/gallery-bg_zxkxho" />
                                <img src="https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/gallery-bg_zxkxho" alt="" aria-hidden="true" className="nikka-bg-img" style={{ objectPosition: 'center -100px' }} loading="lazy" decoding="async" />
                            </picture>

                            {/* Smooth top fade transition bridging from the previous section into gallery-bg.png */}
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '300px', background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, transparent 100%)', zIndex: 10, pointerEvents: 'none' }}></div>

                            {/* Glass Effect Overlay */}
                            <div style={{
                                position: 'absolute',
                                top: 0, left: 0, width: '100%', height: '100%',
                                backgroundColor: 'rgba(15, 23, 42, 0.4)',
                                backdropFilter: 'blur(8px)',
                                WebkitBackdropFilter: 'blur(8px)',
                                zIndex: 1
                            }}></div>

                            <div style={{ position: 'relative', zIndex: 2, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <h2 className="about-title text-center" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#ffb300', textShadow: '2px 2px 4px rgba(0,0,0,0.8)', marginBottom: '1rem', fontFamily: "'Bebas Neue', cursive, sans-serif", letterSpacing: '2px' }}>
                                    THE CR<span className="op-font">E</span>W'S J<span className="op-font">O</span>URNAL
                                </h2>
                                <p style={{ color: '#fff', fontSize: '1.2rem', fontFamily: "'Inter', sans-serif", marginBottom: '3rem', textAlign: 'center', textShadow: '1px 1px 2px #000' }}>
                                    Reliving the legendary voyages of past Hack-O-Holic crews
                                </p>

                                {/* 12-Picture Gallery View */}
                                <div style={{
                                    width: '100%',
                                    maxWidth: '800px',
                                    height: '400px',
                                    position: 'relative',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    border: '2px solid rgba(255,179,0,0.3)',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
                                }}>
                                    <AnimatePresence mode="popLayout">
                                        <motion.img
                                            key={galleryIndex}
                                            src={galleryImages[galleryIndex]}
                                            initial={{ x: 300, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            exit={{ x: -300, opacity: 0 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 30, opacity: { duration: 0.2 } }}
                                            style={{
                                                position: 'absolute',
                                                top: 0, left: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                            alt={`Gallery Image ${galleryIndex + 1}`}
                                        />
                                    </AnimatePresence>
                                </div>
                            </div>
                        </section>

                        {/* ===== FAQ Window Section ===== */}
                        <section id="faqs" style={{
                            width: '100%',
                            backgroundColor: '#0d1117',
                            padding: '6rem 2rem',
                            position: 'relative',
                            zIndex: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <h2 className="about-title text-center" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#d4a843', textShadow: '2px 2px 4px rgba(0,0,0,0.5)', marginBottom: '4rem', fontFamily: "'Bebas Neue', cursive, sans-serif", letterSpacing: '2px' }}>
                                    <span className="op-font">F</span>REQ<span className="op-font">U</span>ENTLY <span className="op-font">A</span>SKED Q<span className="op-font">U</span>ESTIONS
                                </h2>

                                <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    {[
                                        { q: "What is Hack-O-Holic 4.0?", a: "A 24-hour One Piece-themed hackathon bringing together developers and innovators to build incredible projects." },
                                        { q: "Who can participate?", a: "Graphic Era Hill University students! You can participate in teams of 2 to 4 members." },
                                        { q: "Is it an online or offline event?", a: "It is a completely offline, on-campus event in Graphic Era Hill University, Dehradun." },
                                        { q: "What should I bring?", a: "Bring your laptop, charger, student ID, any hardware you might need, and your adventurous pirate spirit!" }
                                    ].map((faq, i) => (
                                        <div key={i} style={{
                                            background: 'rgba(255, 255, 255, 0.03)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            borderRadius: '12px',
                                            padding: '1.5rem 2rem',
                                            transition: 'transform 0.3s ease, background 0.3s ease',
                                            cursor: 'pointer'
                                        }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'none';
                                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                                            }}>
                                            <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '0.75rem', fontFamily: "'Inter', sans-serif", fontWeight: '600' }}>
                                                <span style={{ color: '#ffb300', marginRight: '0.5rem' }}>Q.</span>{faq.q}
                                            </h3>
                                            <p style={{ color: '#9ca3af', fontSize: '1rem', lineHeight: '1.6', fontFamily: "'Inter', sans-serif" }}>
                                                {faq.a}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Luffy peeking from the right middle */}
                            <img
                                src="https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/luffy_peeking_vuvq7k"
                                alt="Luffy Peeking"
                                className="luffy-faq-peek"
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: '1.5rem',
                                    transform: 'translateY(-50%)',
                                    objectFit: 'contain',
                                    zIndex: 20,
                                    pointerEvents: 'none',
                                    filter: 'drop-shadow(0 0 12px rgba(0,0,0,0.6))'
                                }}
                            />
                        </section>

                        <section className="manga-mosaic-section">
                            <div className="manga-mosaic-overlay">
                                {/* Inner Flex Container for Overlay UI */}
                                <div className="manga-mosaicui">
                                    {/* Row 1: skull icon + text */}
                                    <div className="manga-mosaicui-row1" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                        <img src="https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/strawhat_skull_aegbju" alt="Strawhat Skull" className="manga-skull" style={{ marginBottom: '1rem' }} loading="lazy" decoding="async" />
                                        <span style={{ fontSize: '2.5rem', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '4px', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>ONE PIECE</span>
                                        <div className="manga-mosaic-text-wrapper" style={{ marginTop: '0.5rem' }}>
                                            <p className='manga-mosaicui-desc' style={{ textAlign: 'center' }}>want to join the exciting adventure with us</p>
                                        </div>
                                    </div>

                                    {/* Row 2: register button, centered */}
                                    <div className="manga-mosaicui-row2">
                                        <Link to="/register" className='manga-mosaicui-btn' style={{ textDecoration: 'none' }}>
                                            <img src="https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/luffy_hat_fjp7ze" alt="Luffy Hat" style={{ background: 'transparent' }} />
                                            <span>Register Now</span>
                                            <i>&gt;</i>
                                        </Link>
                                    </div>

                                </div>
                            </div>

                            <div className="manga-mosaic-inner">
                                {/* Row 1 */}
                                <div className="manga-row">
                                    <div className="manga-track">
                                        {[...row1, ...row1, ...row1].map((src, i) => (
                                            <img key={`r1-${i}`} src={src} alt="" className="manga-panel" />
                                        ))}
                                    </div>
                                </div>

                                {/* Row 2 */}
                                <div className="manga-row">
                                    <div className="manga-track manga-track-fast">
                                        {[...row2, ...row2, ...row2].map((src, i) => (
                                            <img key={`r2-${i}`} src={src} alt="" className="manga-panel" />
                                        ))}
                                    </div>
                                </div>

                                {/* Row 3 */}
                                <div className="manga-row">
                                    <div className="manga-track manga-track-slow">
                                        {[...row3, ...row3, ...row3].map((src, i) => (
                                            <img key={`r3-${i}`} src={src} alt="" className="manga-panel" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                );
            })()}
        </>
    );
}

export default Home;
