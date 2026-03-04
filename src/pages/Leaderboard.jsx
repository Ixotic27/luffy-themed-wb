import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const API_URL = 'http://localhost:5001/api';

const Leaderboard = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
    const [visibility, setVisibility] = useState(true);
    const [teams, setTeams] = useState([]);
    const [search, setSearch] = useState('');
    const [pinnedTeamId, setPinnedTeamId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 900);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        fetchVisibility();
        fetchTeams();

        // Auto-poll visibility and teams every 5 seconds
        const interval = setInterval(() => {
            fetchVisibility();
            fetchTeams();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const fetchVisibility = async () => {
        try {
            const res = await fetch(`${API_URL}/settings/visibility`);
            const data = await res.json();
            setVisibility(data.visibility);
        } catch (err) {
            console.error('Failed to fetch visibility:', err);
        }
    };

    const fetchTeams = async () => {
        try {
            const res = await fetch(`${API_URL}/leaderboard`);
            const data = await res.json();
            setTeams(data);
        } catch (err) {
            console.error('Failed to fetch teams:', err);
        }
    };

    // Filter by search
    const filteredTeams = teams.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.leader.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination
    const totalPages = Math.ceil(filteredTeams.length / itemsPerPage);
    const currentTeams = filteredTeams.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const pinnedTeam = teams.find(t => t._id === pinnedTeamId);

    // UI Helpers
    const togglePin = (id) => {
        setPinnedTeamId(prev => prev === id ? null : id);
    };

    if (!visibility) {
        return (
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                minHeight: '100vh',
                zIndex: 99,
                backgroundImage: `url('${isMobile ? "/assets/chopper mobile.png" : "/assets/chopper desktop.png"}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 0 }}></div>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 2,
                    textAlign: 'center',
                    padding: '3rem 2rem',
                    background: 'rgba(20, 20, 30, 0.45)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderRadius: '24px',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
                    maxWidth: '600px',
                    width: '90%',
                    boxSizing: 'border-box'
                }}>
                    <h1 style={{ color: '#ffb300', fontSize: isMobile ? '2.5rem' : '4rem', textShadow: '3px 3px 6px rgba(0,0,0,0.9)', margin: '0 0 1rem 0', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '4px' }}>
                        <span className="op-font">L</span>EADERBOARD
                    </h1>
                    <p style={{ color: '#f3f4f6', fontSize: '1.2rem', margin: 0, fontWeight: '500', lineHeight: '1.6', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                        The Bounty Board is currently hidden by the Admins.<br />Please check back later!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            width: '100%',
            minHeight: '100vh',
            position: 'relative',
            paddingBottom: '4rem',
            paddingTop: 0,
            overflowX: 'hidden',
            boxSizing: 'border-box'
        }}>
            {/* Full-page dark overlay */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(3px)', zIndex: 0 }}></div>

            <div style={{
                position: 'relative',
                zIndex: 2,
                width: '100%',
                height: '100vh',
                maxWidth: '900px',
                margin: '0 auto',
                padding: '90px 1rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxSizing: 'border-box'
            }}>
                <div className="text-center" style={{ marginBottom: '1rem', width: '100%', textAlign: 'center' }}>
                    <h1 className="ap-title" style={{ color: '#ffb300', textShadow: '3px 3px 6px rgba(0,0,0,0.8)', margin: '0 auto' }}>
                        B<span className="op-font">O</span>UNTY B<span className="op-font">O</span>ARD
                    </h1>
                </div>

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search by Team or Leader Name..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                    style={{
                        width: '100%', padding: '12px 20px', fontSize: '1.1rem',
                        borderRadius: '30px', border: 'none', outline: 'none',
                        background: 'rgba(255, 255, 255, 0.15)', color: 'white',
                        backdropFilter: 'blur(10px)', marginBottom: '1rem',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.3)', textAlign: 'center',
                        boxSizing: 'border-box', margin: '0 auto 1rem', display: 'block'
                    }}
                />

                {/* Team List with Scroll */}
                <div style={{
                    width: '100%',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    overflowY: 'auto',
                    paddingRight: '10px', // Prevent scrollbar overlap
                    paddingBottom: '2rem'
                }} className="team-scroll-container">
                    {currentTeams.map((team, index) => {
                        // Calculate actual rank based on overall array
                        const rank = teams.findIndex(t => t._id === team._id) + 1;
                        const isPinned = pinnedTeamId === team._id;

                        return (
                            <motion.div
                                key={team._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    padding: '15px 25px', borderRadius: '15px',
                                    background: isPinned ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.1)',
                                    backdropFilter: 'blur(10px)',
                                    border: isPinned ? '2px solid #ffb300' : '1px solid rgba(255, 255, 255, 0.2)',
                                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffb300', width: '30px' }}>
                                        #{rank}
                                    </span>
                                    <div>
                                        <h3 style={{ margin: 0, color: 'white', fontSize: isMobile ? '1.1rem' : '1.3rem' }}>{team.name}</h3>
                                        <p style={{ margin: 0, color: '#d1d5db', fontSize: '0.9rem' }}>Leader: {team.leader}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fff' }}>
                                            {team.points.toLocaleString()} <span style={{ fontSize: '1.5rem' }}>🫐</span>
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => togglePin(team._id)}
                                        style={{
                                            background: 'transparent', border: 'none', cursor: 'pointer',
                                            fontSize: '1.5rem', opacity: isPinned ? 1 : 0.4,
                                            filter: isPinned ? 'drop-shadow(0 0 5px #ffb300)' : 'none'
                                        }}
                                        title="Pin this team"
                                    >
                                        📌
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}

                    {/* Appended 11th Pinned Slot */}
                    {pinnedTeam && !currentTeams.find(t => t._id === pinnedTeamId) && (
                        <>
                            <div style={{ width: '100%', height: '2px', background: 'rgba(255,255,255,0.2)', margin: '10px 0' }} />
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    padding: '15px 25px', borderRadius: '15px',
                                    background: 'rgba(0, 0, 0, 0.8)',
                                    backdropFilter: 'blur(10px)',
                                    border: '2px solid #ffb300',
                                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.8)'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffb300', width: '30px' }}>
                                        #{teams.findIndex(t => t._id === pinnedTeam._id) + 1}
                                    </span>
                                    <div>
                                        <h3 style={{ margin: 0, color: 'white', fontSize: isMobile ? '1.1rem' : '1.3rem' }}>{pinnedTeam.name} <span style={{ fontSize: '0.8em', color: '#ffb300' }}>(Pinned)</span></h3>
                                        <p style={{ margin: 0, color: '#d1d5db', fontSize: '0.9rem' }}>Leader: {pinnedTeam.leader}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fff' }}>
                                            {pinnedTeam.points.toLocaleString()} <span style={{ fontSize: '1.5rem' }}>🫐</span>
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => togglePin(pinnedTeam._id)}
                                        style={{
                                            background: 'transparent', border: 'none', cursor: 'pointer',
                                            fontSize: '1.5rem', opacity: 1,
                                            filter: 'drop-shadow(0 0 5px #ffb300)'
                                        }}
                                        title="Unpin this team"
                                    >
                                        📌
                                    </button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div style={{ display: 'flex', gap: '15px', marginTop: '2rem', alignItems: 'center' }}>
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            style={{
                                padding: '8px 20px', borderRadius: '20px', border: 'none',
                                background: currentPage === 1 ? 'rgba(255,255,255,0.1)' : '#ffb300',
                                color: currentPage === 1 ? 'rgba(255,255,255,0.3)' : '#000',
                                fontWeight: 'bold', cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                            }}
                        >
                            Prev
                        </button>
                        <span style={{ color: 'white', fontWeight: 'bold' }}>Page {currentPage} of {totalPages}</span>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            style={{
                                padding: '8px 20px', borderRadius: '20px', border: 'none',
                                background: currentPage === totalPages ? 'rgba(255,255,255,0.1)' : '#ffb300',
                                color: currentPage === totalPages ? 'rgba(255,255,255,0.3)' : '#000',
                                fontWeight: 'bold', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                            }}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
