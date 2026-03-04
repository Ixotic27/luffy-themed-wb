import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Telescope } from 'lucide-react';
import './index.css';

function App() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [showNavbar, setShowNavbar] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({
    days: '00', hours: '00', minutes: '00', seconds: '00'
  });

  // Carousel State
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const carouselImages = [
    '/assets/Image1.JPG',
    '/assets/Image2.JPG',
    '/assets/Image3.JPG',
    '/assets/Image4.JPG'
  ];

  // Auto-advance Carousel
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000); // 4 seconds per slide
    return () => clearInterval(slideInterval);
  }, [carouselImages.length]);

  useEffect(() => {
    // Show navbar shortly after video ends or immediately on skip
    if (!isVideoPlaying) {
      setTimeout(() => setShowNavbar(true), 500);
    }
  }, [isVideoPlaying]);

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

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
  };

  const skipVideo = () => {
    setIsVideoPlaying(false);
  };

  return (
    <div className="app-container">
      {/* Video Overlay Section */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            className="video-container"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5 } }}
          >
            <video
              autoPlay
              muted
              className="hero-video"
              onEnded={handleVideoEnd}
            >
              <source src="/assets/Water_7_Arc_One_Piece_Manga_Animation_720P.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button className="skip-btn" onClick={skipVideo}>Skip Intro</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Website Content */}
      <div className="main-content">

        {/* Navbar */}
        <AnimatePresence>
          {showNavbar && (
            <motion.nav
              className="navbar"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="nav-left">
                <img src="/assets/logo.png" alt="Hack-O-Holic Logo" className="logo" />
              </div>

              {/* Mobile Hamburger Icon */}
              <div
                className="hamburger-icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <div className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
                <div className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
                <div className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
              </div>

              <div className={`nav-right ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                <ul className="nav-links">
                  <li><a href="#home" className="active" onClick={() => setIsMobileMenuOpen(false)}>Home</a></li>
                  <li><a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a></li>
                  <li><a href="#mission" onClick={() => setIsMobileMenuOpen(false)}>Mission</a></li>
                  <li><a href="#prizes" onClick={() => setIsMobileMenuOpen(false)}>Prizes</a></li>
                  <li><a href="#schedule" onClick={() => setIsMobileMenuOpen(false)}>Schedule</a></li>
                </ul>
                <button className="register-btn" onClick={() => setIsMobileMenuOpen(false)}>Register</button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Content visible after video */}
        <AnimatePresence>
          {!isVideoPlaying && (
            <motion.div
              style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {/* Intro Section */}
              <section id="home" className="about-section slide-up" style={{ marginTop: '2rem' }}>
                <div className="about-text" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
                  <h1 className="about-title" style={{ fontSize: '5rem', color: '#ffffff', marginBottom: '0' }}>HACK-<span className="op-font">O</span>-HOLIC 4.0:</h1>
                  <h2 className="about-title-secondary" style={{ fontSize: '4rem', color: '#ffffff', borderBottom: 'none', paddingBottom: 0 }}>P<span className="op-font">I</span>RATE K<span className="op-font">I</span>NG'S CHALLENGE</h2>

                  <p className="about-desc" style={{ fontSize: '1.5rem', color: '#e2e8f0', marginTop: '1.5rem' }}>
                    Set Sail for the Ultimate One Piece Themed Hackathon!<br />
                    Code, Create, and Conquer!
                  </p>
                </div>

                <div className="about-image">
                  <div className="pirate-manga-panel">
                    <img src="/assets/luffy second.png" alt="Pirate Ship Manga Panel" style={{ filter: 'grayscale(100%)', mixBlendMode: 'multiply' }} />
                    <div className="panel-caption">Setting sail on the digital Grand Line</div>
                  </div>
                </div>
              </section>


              {/* Countdown & Description Section */}
              <section id="mission" className="countdown-section">

                <h2 className="about-title" style={{ fontSize: '4rem', color: '#ffffff', marginBottom: '2rem', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>CHALLENGE BEGINS IN:</h2>

                <div className="custom-countdown-container">
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

                <div className="description-container" style={{ maxWidth: '800px', marginTop: '4rem' }}>
                  <img src="/assets/description png.png" alt="Hackathon Description Details" className="description-img" />
                </div>
              </section>

              {/* 2.jpg Page Layout Section */}
              <section style={{ width: '100%', backgroundColor: '#0f172a', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <div className="thematic-bg-container" style={{ width: '100%', position: 'relative' }}>
                  <img src="/assets/2.jpg" alt="One Piece Artwork" className="thematic-bg-img" />
                  {/* Top Fade Transition */}
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '200px', background: 'linear-gradient(180deg, rgba(31,34,40,1) 0%, rgba(31,34,40,0) 100%)' }}></div>
                  {/* Subtle Red Thematic Overlay */}
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(139, 0, 0, 0.2)', mixBlendMode: 'multiply', pointerEvents: 'none' }}></div>
                  {/* Bottom Fade out to Footer */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100px', background: 'linear-gradient(0deg, rgba(21,24,28,1) 0%, rgba(21,24,28,0) 100%)' }}></div>

                  {/* Thematic positioning for the text & carousel content over the 2.jpg background image */}
                  <div className="thematic-overlay">

                    {/* Left Column: Description & Stats */}
                    <div className="thematic-text-col">
                      <h2 className="mobile-only-heading">AB<span className="op-font">O</span>UT HACK-<span className="op-font">O</span>-HOLIC 4.0</h2>
                      <div style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#cbd5e1', marginBottom: '2rem', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
                        <p style={{ marginBottom: '1.5rem' }}>
                          Hack-O-Holic 4.0 is the ultimate One Piece-themed hackathon, bringing together developers, designers, and innovators to build incredible projects in a 36-hour voyage.
                        </p>
                        <p>
                          Inspired by the spirit of adventure, camaraderie, and creativity, we challenge participants to push their boundaries and create solutions that could change the Grand Line of technology. Join us for an unforgettable experience filled with coding, challenges, and pirate spirit.
                        </p>
                      </div>
                      <p style={{ fontSize: '1.2rem', color: '#fbbf24', fontWeight: 'bold', marginBottom: '4rem', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
                        Only for Graphic Era Hill University and Deemed University!
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
                            transition={{ duration: 1.5, ease: "easeInOut" }}
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
                  <img src="/assets/3.jpeg" alt="Going Merry Ship" className="event-details-ship event-ship-desktop" />
                  <img src="/assets/mobile3.png" alt="Going Merry Ship Mobile" className="event-details-ship event-ship-mobile" />
                </div>
                <div className="event-details-content">
                  <h2 className="event-details-title"><span className="op-font">E</span>vent <span className="op-font">D</span>etails</h2>
                  {/* Desktop Cards - PNG images with text */}
                  <div className="event-cards-grid desktop-cards">
                    <div className="event-card-wrapper card-luffy">
                      <img src="/assets/cards/luffy.png" alt="Format Card" className="event-card-img" />
                      <div className="event-card-text">
                        <span className="event-card-label">FORMAT</span>
                        <span className="event-card-value">24 Hours ┬╖ Offline ΓÇö On Campus</span>
                      </div>
                    </div>
                    <div className="event-card-wrapper card-zoro">
                      <img src="/assets/cards/zoro.png" alt="Team Size Card" className="event-card-img" />
                      <div className="event-card-text">
                        <span className="event-card-label">TEAM SIZE</span>
                        <span className="event-card-value">2 ΓÇô 4 Members</span>
                      </div>
                    </div>
                    <div className="event-card-wrapper card-nami">
                      <img src="/assets/cards/nami.png" alt="Eligibility Card" className="event-card-img" />
                      <div className="event-card-text">
                        <span className="event-card-label">ELIGIBILITY</span>
                        <span className="event-card-value">University Students</span>
                      </div>
                    </div>
                    <div className="event-card-wrapper card-sanji">
                      <img src="/assets/cards/sanji.png" alt="Venue Card" className="event-card-img" />
                      <div className="event-card-text">
                        <span className="event-card-label">VENUE</span>
                        <span className="event-card-value">Graphic Era Hill University<br />Dehradun</span>
                      </div>
                    </div>
                    <div className="event-card-wrapper card-ussop">
                      <img src="/assets/cards/ussop.png" alt="Max Registrations Card" className="event-card-img" />
                      <div className="event-card-text">
                        <span className="event-card-label">MAX REGISTRATIONS</span>
                        <span className="event-card-value">250 Teams</span>
                      </div>
                    </div>
                    <div className="event-card-wrapper card-chopper">
                      <img src="/assets/cards/chopper (2).png" alt="Finale Entries Card" className="event-card-img" />
                      <div className="event-card-text">
                        <span className="event-card-label">FINALE ENTRIES</span>
                        <span className="event-card-value">110 / 250</span>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Cards - Text based */}
                  <div className="event-cards-grid mobile-cards">
                    <div className="event-card cyan">
                      <span className="event-card-icon">≡ƒÅ┤ΓÇìΓÿá∩╕Å</span>
                      <span className="event-card-label">FORMAT</span>
                      <span className="event-card-value">24 Hours ┬╖ Offline ΓÇö On Campus</span>
                    </div>
                    <div className="event-card cyan">
                      <span className="event-card-icon">≡ƒæÑ</span>
                      <span className="event-card-label">TEAM SIZE</span>
                      <span className="event-card-value">2 ΓÇô 4 Members</span>
                    </div>
                    <div className="event-card cyan">
                      <span className="event-card-icon">≡ƒÄô</span>
                      <span className="event-card-label">ELIGIBILITY</span>
                      <span className="event-card-value">University Students</span>
                    </div>
                    <div className="event-card gold">
                      <span className="event-card-icon">≡ƒôì</span>
                      <span className="event-card-label">VENUE</span>
                      <span className="event-card-value">Graphic Era Hill University, Dehradun</span>
                    </div>
                    <div className="event-card gold">
                      <span className="event-card-icon">ΓÜô</span>
                      <span className="event-card-label">MAX REGISTRATIONS</span>
                      <span className="event-card-value">250 Teams</span>
                    </div>
                    <div className="event-card gold">
                      <span className="event-card-icon">≡ƒöÑ</span>
                      <span className="event-card-label">FINALE ENTRIES</span>
                      <span className="event-card-value">110 / 250</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <footer className="footer" style={{ width: '100%' }}>
                {/* Register Button */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                  <a
                    href="https://github.com/Ixotic27?tab=overview&from=2026-03-01&to=2026-03-03"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'inline-block', transition: 'transform 0.3s ease', cursor: 'pointer', backgroundColor: '#ffffff', padding: '0.4rem', borderRadius: '8px', textDecoration: 'none' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <div style={{ border: '2px solid #1e40af', padding: '0.2rem', borderRadius: '4px', backgroundColor: '#ffffff' }}>
                      <img src="/assets/register.png" alt="Register Now" style={{ width: '100%', maxWidth: '350px', height: 'auto', display: 'block' }} />
                    </div>
                  </a>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <img src="/assets/flag.png" alt="Pirate Flag" style={{ height: '80px', objectFit: 'contain' }} />
                </div>
                <div className="footer-links">
                  <a href="#faqs">FAQs</a>
                  <a href="#code-of-conduct">Code of Conduct</a>
                  <a href="#contact">Contact</a>
                </div>
                <div className="footer-copy">
                  ┬⌐ 2024 Hack-O-Holic 4.0 | All rights reserved. A One Piece Themed Hackathon.
                </div>
              </footer>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div >
  );
}

export default App;
