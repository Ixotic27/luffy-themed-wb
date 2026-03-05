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
            width: '100%',
            minHeight: '100vh',
            position: 'relative',
            overflow: 'hidden',
            boxSizing: 'border-box'
        }}>
            {/* Full-page dark overlay */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(2px)', zIndex: 0 }}></div>

            <div style={{
                position: 'relative',
                zIndex: 2,
                width: '100%',
                minHeight: '100vh',
                maxWidth: '1200px',
                margin: '100px auto 20px', // Center the container and push under navbar
                padding: '2rem 1.5rem', // Local padding inside the glass box
                paddingBottom: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxSizing: 'border-box',
                background: 'rgba(10, 10, 15, 0.85)', // Darker glass effect around the leaderboard itself
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 12px 40px 0 rgba(0, 0, 0, 0.7)'
            }}>

                <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
                    <div className="text-center" style={{ marginBottom: '1rem', width: '100%', textAlign: 'center', flexShrink: 0 }}>
                        <h1 className="ap-title" style={{ color: '#ffb300', textShadow: '3px 3px 6px rgba(0,0,0,0.8)', margin: '0 auto', fontSize: '4rem' }}>
                            SELECTED <span className="op-font">C</span>REWS
                        </h1>
                    </div>

                    {/* Search Bar */}
                    <div style={{ display: 'flex', gap: '15px', width: '100%', marginBottom: '1.5rem' }}>
                        <input
                            type="text"
                            placeholder="Search by crew name, member, or tech stack..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                flex: 1, padding: '12px 20px', fontSize: '1.1rem',
                                borderRadius: '30px', border: 'none', outline: 'none',
                                background: 'rgba(255, 255, 255, 0.15)', color: 'white',
                                backdropFilter: 'blur(10px)',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.3)', textAlign: 'left',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    {/* Teams Layout */}
                    <div style={{
                        width: '100%',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '15px',
                        overflowY: 'auto',
                        paddingRight: '10px',
                        paddingBottom: '1rem',
                        flexShrink: 0
                    }} className="team-scroll-container">
                        <AnimatePresence>
                            {filteredTeams.length > 0 ? (
                                filteredTeams.map((team, index) => (
                                    <motion.div
                                        key={team.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        style={{
                                            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                                            padding: '15px 25px', borderRadius: '15px',
                                            background: 'rgba(0, 0, 0, 0.4)', // Darker inner glass matching Leaderboard
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
                                            minHeight: '160px'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                                            <div>
                                                <h3 style={{ margin: 0, color: 'white', fontSize: '1.4rem' }}>{team.name}</h3>
                                                <span style={{
                                                    display: 'inline-block',
                                                    background: 'rgba(40, 167, 69, 0.15)',
                                                    color: '#28a745',
                                                    border: '1px solid rgba(40, 167, 69, 0.3)',
                                                    padding: '2px 8px',
                                                    borderRadius: '12px',
                                                    fontSize: '0.7rem',
                                                    fontWeight: 'bold',
                                                    textTransform: 'uppercase',
                                                    marginTop: '5px'
                                                }}>
                                                    {team.status}
                                                </span>
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: '10px' }}>
                                            <p style={{ margin: 0, color: '#ffb300', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Project Idea</p>
                                            <p style={{ margin: 0, color: '#d1d5db', fontSize: '0.95rem', lineHeight: '1.4' }}>{team.projectIdea}</p>
                                        </div>

                                        <div>
                                            <p style={{ margin: 0, color: '#ffb300', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Crew Members ({team.members.length})</p>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                                {team.members.map((member, i) => (
                                                    <span key={i} style={{
                                                        background: 'rgba(255, 255, 255, 0.05)',
                                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                                        color: '#e9ecef',
                                                        padding: '3px 8px',
                                                        borderRadius: '6px',
                                                        fontSize: '0.8rem'
                                                    }}>
                                                        {member}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 0', width: '100%' }}>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5 }}>🧭</div>
                                        <h3 style={{ color: '#ffb300', fontFamily: "'Cinzel', serif" }}>No crews found</h3>
                                        <p style={{ color: '#d1d5db' }}>Your compass might be broken. Try another search term!</p>
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
        </div >
    );
};

export default TeamsSelected;
