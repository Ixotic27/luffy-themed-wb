import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Telescope, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import Home from './pages/Home';
import About from './pages/About';
import Leaderboard from './pages/Leaderboard';
import Events from './pages/Events';
import Developers from './pages/Developers';
import Register from './pages/Register';
import Admin from './pages/Admin';
import TeamsSelected from './pages/TeamsSelected';
import './index.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const ContentWrapper = ({ children }) => {
  const location = useLocation();
  const isAbout = location.pathname === '/about';
  const isLeaderboard = location.pathname === '/leaderboard';
  const isEvents = location.pathname === '/events';
  const isDevelopers = location.pathname === '/developers';
  const isRegister = location.pathname === '/register';
  const isTeamsSelected = location.pathname === '/teams-selected';

  let bgClass = 'bg-home';
  if (isAbout) bgClass = 'bg-about';
  if (isLeaderboard) bgClass = 'bg-leaderboard';
  if (isEvents) bgClass = 'bg-events';
  if (isDevelopers) bgClass = 'bg-developers';
  if (isRegister) bgClass = 'bg-home'; // Reuse home background
  if (isTeamsSelected) bgClass = 'bg-leaderboard'; // Matched with Leaderboard request

  return (
    <div className={`main-content ${bgClass}`}>
      {children}
    </div>
  );
};

function App() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [showNavbar, setShowNavbar] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Show navbar shortly after video ends or immediately on skip
    if (!isVideoPlaying) {
      setTimeout(() => setShowNavbar(true), 500);
    }
  }, [isVideoPlaying]);

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
  };

  const skipVideo = () => {
    setIsVideoPlaying(false);
  };

  return (
    <Router>
      <ScrollToTop />
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
                <source src="/assets/op intro.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button className="skip-btn" onClick={skipVideo}>Skip Intro</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Website Content */}
        <ContentWrapper>

          {/* Navbar */}
          <AnimatePresence>
            {showNavbar && (
              <motion.nav
                className="navbar"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Mobile Hamburger Icon */}
                <div
                  className="hamburger-icon"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <div className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
                  <div className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
                  <div className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
                </div>

                <div className="nav-left">
                  <Link to="/">
                    <img src="/assets/logo.png" alt="Hack-O-Holic Logo" className="logo" />
                  </Link>
                </div>

                <div className={`nav-right ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                  <ul className="nav-links">
                    <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
                    <li><Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link></li>
                    <li><Link to="/events" onClick={() => setIsMobileMenuOpen(false)}>Events</Link></li>
                    <li><Link to="/#gallery" onClick={() => setIsMobileMenuOpen(false)}>Gallery</Link></li>
                    <li><Link to="/leaderboard" onClick={() => setIsMobileMenuOpen(false)}>Leaderboard</Link></li>
                    <li><Link to="/teams-selected" onClick={() => setIsMobileMenuOpen(false)}>Selected Crews</Link></li>
                  </ul>
                  <Link to="/register" className="register-btn" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>

          {/* Content visible after video */}
          <AnimatePresence>
            {!isVideoPlaying && (
              <motion.div
                style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >

                {/* Routes Layer */}
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/developers" element={<Developers />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/teams-selected" element={<TeamsSelected />} />
                </Routes>

                {/* Footer */}
                <footer className="footer">
                  <div className="footer-content">
                    {/* Left Column: Logo & Description */}
                    <div className="footer-col left">
                      <div className="footer-logo">Hack-O-Holic <span>4.0</span></div>
                      <p className="footer-desc">
                        Join us for the most innovative hackathon of the year. Build, collaborate, and transform your ideas into reality.
                      </p>

                      <div className="subscribe-row">
                        <span>Don't Forget to Subscribe:</span>
                        <div className="social-icons">
                          <a href="https://www.instagram.com/codev.gehu" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                            <Instagram size={20} />
                          </a>
                          <a href="https://www.linkedin.com/company/co-dev-club/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                            <Linkedin size={20} />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Center Column: Flag & Link */}
                    <div className="footer-col center">
                      <img src="/assets/flag.png" alt="Pirate Flag" className="footer-flag" />
                      <div className="footer-links">
                        <Link to="/developers">Know Your Developers</Link>
                      </div>
                    </div>

                    {/* Right Column: Contact Info — left-aligned */}
                    <div className="footer-col contact-col">
                      <h3 className="contact-title">Contact Us</h3>

                      <div className="contact-item">
                        <Mail size={20} />
                        <span>Hackaholic4.0.codev@gmail.com</span>
                      </div>

                      <div className="contact-item phones">
                        <Phone size={20} />
                        <span>+91 7464959260 &nbsp; +91 7818874934<br />+91 8191013531</span>
                      </div>

                      <div className="contact-item">
                        <MapPin size={20} />
                        <span>Graphic Era Hill University, Dehradun</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom copyright bar */}
                  <div className="footer-copyright">
                    © 2026 Hack-O-Holic 4.0 | All rights reserved. &nbsp;·&nbsp; A One Piece Themed Hackathon.
                  </div>
                </footer>

              </motion.div>
            )}
          </AnimatePresence>

        </ContentWrapper>
      </div>
    </Router>
  );
}

export default App;
