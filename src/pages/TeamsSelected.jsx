import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

// Mock data for teams - replace with real data when available
const mockTeams = [
    { id: 1, name: 'Straw Hat Pirates', members: ['Luffy', 'Zoro', 'Nami', 'Usopp', 'Sanji'], projectIdea: 'AI-powered navigation system for the Grand Line', status: 'Selected' },
    { id: 2, name: 'Red Hair Pirates', members: ['Shanks', 'Beckman', 'Roux'], projectIdea: 'Decentralized bounty hunting platform', status: 'Selected' },
    { id: 3, name: 'Heart Pirates', members: ['Law', 'Bepo', 'Penguin', 'Shachi'], projectIdea: 'Medical tech for instant localized healing', status: 'Selected' },
    { id: 4, name: 'Kid Pirates', members: ['Kid', 'Killer', 'Heat'], projectIdea: 'Magnetic waste recycling robotics', status: 'Selected' },
    { id: 5, name: 'Whitebeard Pirates', members: ['Newgate', 'Marco', 'Ace', 'Jozu'], projectIdea: 'Global earthquake prediction API', status: 'Selected' },
    { id: 6, name: 'Blackbeard Pirates', members: ['Teach', 'Burgess', 'Augur'], projectIdea: 'Dark web marketplace for devil fruits', status: 'Selected' },
    { id: 7, name: 'Buggy Delivery', members: ['Buggy', 'Alvida', 'Cabaji', 'Mohji'], projectIdea: 'Automated drone delivery network', status: 'Selected' },
    { id: 8, name: 'Sun Pirates', members: ['Jinbe', 'Arlong', 'Hatchan'], projectIdea: 'Underwater data centers cooling solutions', status: 'Selected' },
];

const TeamsSelected = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter teams based on search term (checks team name, members, and project idea)
    const filteredTeams = useMemo(() => {
        const term = searchTerm.toLowerCase();
        return mockTeams.filter(team =>
            team.name.toLowerCase().includes(term) ||
            team.projectIdea.toLowerCase().includes(term) ||
            team.members.some(m => m.toLowerCase().includes(term))
        );
    }, [searchTerm]);

    return (
        <div style={{
            minHeight: '100vh',
            paddingTop: '100px',
            paddingBottom: '50px',
            backgroundColor: '#0a0a0a',
            color: '#fff',
            backgroundImage: `url('https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/gallery-bg_zxkxho')`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            {/* Dark overlay for readability */}
            <div style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(5, 5, 5, 0.85)',
                zIndex: 0
            }}></div>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px', position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-5"
                >
                    <h1 style={{
                        fontFamily: "'Pirata One', cursive",
                        fontSize: '4rem',
                        color: '#c92a2a',
                        textShadow: '0 0 20px rgba(201, 42, 42, 0.5)',
                        marginBottom: '1rem'
                    }}>
                        Selected Crews
                    </h1>
                    <p style={{
                        color: '#d1d1d1',
                        fontSize: '1.2rem',
                        maxWidth: '600px',
                        margin: '0 auto',
                        fontFamily: "'Cinzel', serif"
                    }}>
                        The Grand Line awaits these extraordinary teams. Behold the crews chosen to embark on the Hack-O-Holic 4.0 journey!
                    </p>
                </motion.div>

                {/* Search Bar */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
                    <div style={{ width: '100%', maxWidth: '600px' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(201, 42, 42, 0.3)',
                                borderRadius: '50px',
                                padding: '5px 15px',
                                backdropFilter: 'blur(10px)',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                            }}>
                                <Search size={22} color="#c92a2a" style={{ marginRight: '10px' }} />
                                <input
                                    type="text"
                                    placeholder="Search by crew name, member, or tech stack..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{
                                        width: '100%',
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#fff',
                                        outline: 'none',
                                        padding: '12px 10px',
                                        fontSize: '1.1rem'
                                    }}
                                    className="placeholder-white"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Teams Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '1.5rem',
                }}>
                    <AnimatePresence>
                        {filteredTeams.length > 0 ? (
                            filteredTeams.map((team, index) => (
                                <div key={team.id} style={{ display: 'flex' }}>
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                        style={{ height: '100%' }}
                                    >
                                        <div style={{
                                            background: 'rgba(20, 20, 25, 0.7)',
                                            backdropFilter: 'blur(12px)',
                                            border: '1px solid rgba(201, 42, 42, 0.2)',
                                            borderRadius: '16px',
                                            padding: '24px',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                                            cursor: 'pointer',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}
                                            className="team-card-hover"
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = 'translateY(-8px)';
                                                e.currentTarget.style.boxShadow = '0 15px 30px rgba(201, 42, 42, 0.15)';
                                                e.currentTarget.style.borderColor = 'rgba(201, 42, 42, 0.5)';
                                                e.currentTarget.querySelector('.card-glow').style.opacity = '1';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = 'none';
                                                e.currentTarget.style.borderColor = 'rgba(201, 42, 42, 0.2)';
                                                e.currentTarget.querySelector('.card-glow').style.opacity = '0';
                                            }}
                                        >
                                            {/* Hover Glow Effect */}
                                            <div className="card-glow" style={{
                                                position: 'absolute',
                                                top: '-50%',
                                                left: '-50%',
                                                width: '200%',
                                                height: '200%',
                                                background: 'radial-gradient(circle, rgba(201,42,42,0.1) 0%, rgba(0,0,0,0) 70%)',
                                                opacity: 0,
                                                transition: 'opacity 0.4s ease',
                                                pointerEvents: 'none',
                                                zIndex: 0
                                            }} />

                                            <div style={{ position: 'relative', zIndex: 1 }}>
                                                <div className="d-flex justify-content-between align-items-start mb-3">
                                                    <h3 style={{
                                                        color: '#f8f9fa',
                                                        fontFamily: "'Cinzel', serif",
                                                        fontWeight: 700,
                                                        margin: 0,
                                                        fontSize: '1.5rem',
                                                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                                                    }}>
                                                        {team.name}
                                                    </h3>
                                                    <span style={{
                                                        background: 'rgba(40, 167, 69, 0.15)',
                                                        color: '#28a745',
                                                        border: '1px solid rgba(40, 167, 69, 0.3)',
                                                        padding: '4px 12px',
                                                        borderRadius: '20px',
                                                        fontSize: '0.8rem',
                                                        fontWeight: 'bold',
                                                        letterSpacing: '1px',
                                                        textTransform: 'uppercase'
                                                    }}>
                                                        {team.status}
                                                    </span>
                                                </div>

                                                <div className="mb-4">
                                                    <h5 style={{ color: '#c92a2a', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Project Idea</h5>
                                                    <p style={{ color: '#adb5bd', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
                                                        {team.projectIdea}
                                                    </p>
                                                </div>

                                                <div className="mt-auto">
                                                    <h5 style={{ color: '#c92a2a', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>Crew Members ({team.members.length})</h5>
                                                    <div className="d-flex flex-wrap gap-2">
                                                        {team.members.map((member, i) => (
                                                            <span key={i} style={{
                                                                background: 'rgba(255, 255, 255, 0.05)',
                                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                                color: '#e9ecef',
                                                                padding: '6px 12px',
                                                                borderRadius: '8px',
                                                                fontSize: '0.85rem'
                                                            }}>
                                                                {member}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            ))
                        ) : (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 0' }}>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-5"
                                >
                                    <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5 }}>🧭</div>
                                    <h3 style={{ color: '#c92a2a', fontFamily: "'Cinzel', serif" }}>No crews found</h3>
                                    <p style={{ color: '#6c757d' }}>Your compass might be broken. Try another search term!</p>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <style>
                {`
                .placeholder-white::placeholder {
                    color: rgba(255,255,255,0.5) !important;
                }
                `}
            </style>
        </div>
    );
};

export default TeamsSelected;
