import React, { useState, useEffect } from 'react';
import { Smile, Users, Star, Medal, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../about.css';

const guides = [
    {
        name: "Prof. (Dr.) Amit R. Bhatt",
        title: "Vice Chancellor, GEHU Dehradun",
        desc: "An inspiring academic visionary and seasoned leader, driving innovation and excellence at the helm of Graphic Era Hill University.",
        img: "https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/Prof-Dr-Amit-R-BhattVice-Chancellor-Graphic-Era-Hill-University_d4hme8"
    },
    {
        name: "Dr. Anupam Singh",
        title: "HOD, Department of Computer Science and Engineering, GEHU Dehradun",
        desc: "A dedicated academic and departmental leader, committed to fostering growth, learning, and innovation within the institution.",
        img: "https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/HOD_sir_ydutnv"
    },
    {
        name: "Mr. Sushant Chamoli",
        title: "Assistant Professor, GEHU",
        desc: "A supportive mentor and guiding force behind the club's growth, encouraging student innovation and teamwork.",
        img: "https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/Sushant_sir_gttxf7"
    }
];

const teamMemberPairs = [
    [
        { id: 1, name: "Deepali", role: "President", img: "https://res.cloudinary.com/dmajc7wkx/image/upload/v1772731229/Team/Deepali.png" },
        { id: 2, name: "Shivang", role: "Vice President", img: "https://res.cloudinary.com/dmajc7wkx/image/upload/v1772731242/Team/Shivang_jagwan.jpg" }
    ],
    [
        { id: 3, name: "Tushar", role: "General Secretary", img: "https://res.cloudinary.com/dmajc7wkx/image/upload/v1772731231/Team/Tushar.jpg" },
        { id: 4, name: "Sonali", role: "Finance Head", img: "https://res.cloudinary.com/dmajc7wkx/image/upload/v1772731230/Team/Sonali.jpg" }
    ],
    [
        { id: 5, name: "Ragini", role: "Social Media Head", img: "https://res.cloudinary.com/dmajc7wkx/image/upload/v1772731229/Team/Ragini_Gupta.jpg" },
        { id: 6, name: "Abhishek", role: "Spokesperson", img: "https://res.cloudinary.com/dmajc7wkx/image/upload/v1772731228/Team/Abhishek.jpg" }
    ],
    [
        { id: 7, name: "Shubhangi", role: "Designing Head", img: "https://res.cloudinary.com/dmajc7wkx/image/upload/v1772731231/Team/Shubhangi_Kumari.jpg" },
        { id: 8, name: "Shivani", role: "Management Head", img: "https://res.cloudinary.com/dmajc7wkx/image/upload/v1772731231/Team/Shivani_negi.jpg" }
    ],
    [
        { id: 9, name: "Akarshan", role: "Management Co-Head", img: "https://res.cloudinary.com/dmajc7wkx/image/upload/v1772731228/Team/Akarshan_BTech.jpg.jpg" },
        { id: 10, name: "Himanshu", role: "Technical Head", img: "https://res.cloudinary.com/dmajc7wkx/image/upload/v1772731228/Team/Himanshu_rawat.jpg.jpg" }
    ],
    [
        { id: 11, name: "Angad", role: "Technical Co-Head", img: "https://res.cloudinary.com/dmajc7wkx/image/upload/v1772731232/Team/Angad.jpg" }
    ]
];

function About() {
    const [teamIndex, setTeamIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setDirection(1);
            setTeamIndex((prev) => (prev + 1 >= teamMemberPairs.length ? 0 : prev + 1));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const nextTeam = () => {
        setDirection(1);
        setTeamIndex((prev) => (prev + 1 >= teamMemberPairs.length ? 0 : prev + 1));
    };

    const prevTeam = () => {
        setDirection(-1);
        setTeamIndex((prev) => {
            if (prev - 1 < 0) {
                return teamMemberPairs.length - 1;
            }
            return prev - 1;
        });
    };

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
            },
        },
        exit: (direction) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
            },
        }),
    };

    return (
        <div style={{
            width: '100%',
            minHeight: '100vh',
            position: 'relative',
            paddingBottom: '4rem'
        }}>
            {/* Dark overlay to match the screenshots layout against the bright bright-bg.png background */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(3px)', zIndex: 0 }}></div>

            <div className="about-page-wrapper">
                <div className="about-content-container">

                    {/* Header & Mission */}
                    <div className="ap-section text-center">
                        <h1 className="ap-title">AB<span className="op-font">O</span>UT HACK-<span className="op-font">O</span>-HOLIC 4.0</h1>
                        <h3 className="ap-subtitle">The Ultimate Hackathon Experience</h3>

                        <h2 className="ap-section-title mt-4">Our Mission</h2>
                        <div className="ap-mission-text">
                            <p>Hack-O-Holic 4.0 is dedicated to fostering innovation, collaboration, and technological advancement through an immersive hackathon experience. Our mission is to provide a platform where talented individuals can come together, share ideas, and create solutions that address real-world challenges.</p>
                            <p>We believe in the power of technology to transform lives and communities. By bringing together diverse perspectives and skill sets, we aim to catalyze the development of innovative solutions that have the potential to make a meaningful impact on society.</p>
                        </div>
                    </div>

                    {/* What Makes Us Different */}
                    <div className="ap-section">
                        <h2 className="ap-section-title text-center">What Makes Us Different</h2>
                        <div className="ap-diff-grid">
                            <div className="ap-diff-card">
                                <Smile className="ap-diff-icon" />
                                <h4>Inclusive Environment</h4>
                                <p>We welcome participants of all backgrounds and skill levels, creating a diverse and inclusive environment where everyone can learn, contribute, and grow.</p>
                            </div>
                            <div className="ap-diff-card">
                                <Users className="ap-diff-icon" />
                                <h4>Expert Mentorship</h4>
                                <p>Participants have access to mentors from leading tech companies who provide guidance, feedback, and support throughout the hackathon.</p>
                            </div>
                            <div className="ap-diff-card">
                                <Star className="ap-diff-icon" />
                                <h4>Real-World Impact</h4>
                                <p>We focus on challenges that have real-world applications, encouraging participants to develop solutions that can make a tangible difference.</p>
                            </div>
                            <div className="ap-diff-card">
                                <Medal className="ap-diff-icon" />
                                <h4>Valuable Prizes</h4>
                                <p>Beyond cash prizes, winners receive opportunities for incubation, mentorship, and potential investment to turn their projects into startups.</p>
                            </div>
                        </div>
                    </div>

                    {/* Our Story */}
                    <div className="ap-section">
                        <h2 className="ap-section-title text-center">Our Story</h2>
                        <div className="ap-story-container">
                            <div className="ap-story-image">
                                <img src="https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/winner_bvlfl8" alt="Our Story" loading="lazy" decoding="async" />
                            </div>
                            <div className="ap-story-text">
                                <p>Hack-O-Holic began in 2023 as a small, campus-based event with just 50 participants. The enthusiasm and innovation demonstrated during that first event inspired us to expand our vision and reach.</p>
                                <p>In 2025, Hack-O-Holic 3.0 happened where 500 participants participated from across the country, with projects that caught the attention of industry leaders and investors. Several projects from that event have since evolved into successful startups.</p>
                                <p>Now, in Hack-O-Holic 4.0, only 250 teams will be registered globally. It is set to be our biggest and most impactful event yet, offering a diverse range of challenges and unprecedented opportunities for networking and growth.</p>
                            </div>
                        </div>
                    </div>

                    {/* Our Guide */}
                    <div className="ap-section">
                        <h2 className="ap-section-title text-center">Our Guide</h2>
                        <div className="ap-guide-grid">
                            {guides.map((guide, idx) => (
                                <div key={idx} className="ap-guide-card">
                                    <img src={guide.img} alt={guide.name} className="ap-guide-img" loading="lazy" decoding="async" />
                                    <div className="ap-guide-info">
                                        <h4>{guide.name}</h4>
                                        <span className="ap-guide-title">{guide.title}</span>
                                        <p>{guide.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Team Carousel */}
                    <div className="ap-section" style={{ overflow: 'hidden' }}>
                        <h2 className="ap-section-title text-center">The Team Behind Hack-O-Holic</h2>
                        <div className="ap-team-carousel-container">
                            <button className="carousel-nav-btn" onClick={prevTeam} style={{ zIndex: 10 }}><ChevronLeft size={30} /></button>

                            <div className="ap-team-sliding-window" style={{ position: 'relative', height: 'auto', minHeight: '380px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                                    <motion.div
                                        key={teamIndex}
                                        custom={direction}
                                        variants={slideVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        style={{ display: 'flex', gap: '2rem', width: '100%', justifyContent: 'center' }}
                                    >
                                        {teamMemberPairs[teamIndex].map((member) => (
                                            <div key={member.id} className="ap-team-card" style={{ flex: 1, minWidth: 0, maxWidth: '400px' }}>
                                                <div className="ap-team-img-wrapper" style={{ margin: '0 auto 1.5rem auto' }}>
                                                    <img src={member.img} alt={member.name} />
                                                </div>
                                                <h4>{member.name}</h4>
                                                <span>{member.role}</span>
                                            </div>
                                        ))}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            <button className="carousel-nav-btn" onClick={nextTeam} style={{ zIndex: 10 }}><ChevronRight size={30} /></button>
                        </div>

                        <div className="carousel-dots">
                            {teamMemberPairs.map((_, idx) => (
                                <span
                                    key={idx}
                                    className={`dot ${teamIndex === idx ? 'active' : ''}`}
                                    onClick={() => {
                                        setDirection(idx > teamIndex ? 1 : -1);
                                        setTeamIndex(idx);
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default About;
