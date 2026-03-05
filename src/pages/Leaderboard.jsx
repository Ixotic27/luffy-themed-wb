import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, List, Pin } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const Leaderboard = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
    const [visibility, setVisibility] = useState(true);
    const [teams, setTeams] = useState([]);
    const [search, setSearch] = useState('');
    const [pinnedTeamId, setPinnedTeamId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
    const [isLoading, setIsLoading] = useState(true);
    const itemsPerPage = 10;

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 900);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchInitialData = async () => {
            setIsLoading(true);
            await Promise.all([fetchVisibility(), fetchTeams()]);
            setIsLoading(false);
        };
        fetchInitialData();

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

    if (isLoading) {
        return (
            <div style={{
                position: 'fixed', top: 0, left: 0, width: '100%', minHeight: '100vh',
                zIndex: 99, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                backgroundColor: '#0a0a0f', backgroundImage: 'radial-gradient(circle at center, rgba(200, 42, 42, 0.1) 0%, transparent 60%)'
            }}>
                <div style={{
                    width: '60px', height: '60px', border: '5px solid rgba(255,179,0,0.2)',
                    borderTopColor: '#ffb300', borderRadius: '50%', animation: 'spin 1s linear infinite',
                    boxShadow: '0 0 15px rgba(255,179,0,0.3)'
                }}></div>
                <h2 style={{ marginTop: '20px', color: '#ffb300', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '4px', textShadow: '0 0 10px rgba(255,179,0,0.5)' }}>
                    FETCHING BOUNTIES...
                </h2>
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    if (!visibility) {
        return (
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                minHeight: '100vh',
                zIndex: 99,
                backgroundImage: `url('${isMobile ? "https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/chopper_mobile_xmfbph" : "https://res.cloudinary.com/dmajc7wkx/image/upload/q_auto,f_auto/chopper_desktop_nwc9or"}')`,
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
            overflow: 'hidden',
            boxSizing: 'border-box'
        }}>
            {/* Full-page dark overlay (Very little glass effect for the whole page) */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(2px)', zIndex: 0 }}></div>

            <div style={{
                position: 'relative',
                zIndex: 2,
                width: '100%',
                minHeight: '100vh',
                maxWidth: viewMode === 'grid' ? '1200px' : '900px',
                transition: 'max-width 0.3s ease', // Smoothly animate the expansion
                margin: '100px auto 20px', // Center the container and push under navbar
                padding: '2rem 1.5rem', // Local padding inside the glass box
                paddingBottom: pinnedTeam ? '150px' : '2rem', // Reserve huge space for the absolute sticky footer + pagination combined
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
                <div className="text-center" style={{ marginBottom: '1rem', width: '100%', textAlign: 'center', flexShrink: 0 }}>
                    <h1 className="ap-title" style={{ color: '#ffb300', textShadow: '3px 3px 6px rgba(0,0,0,0.8)', margin: '0 auto' }}>
                        B<span className="op-font">O</span>UNTY B<span className="op-font">O</span>ARD
                    </h1>
                </div>

                <div style={{ display: 'flex', gap: '15px', width: '100%', marginBottom: '1rem' }}>
                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Search by Team or Leader Name..."
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                        style={{
                            flex: 1, padding: '12px 20px', fontSize: '1.1rem',
                            borderRadius: '30px', border: 'none', outline: 'none',
                            background: 'rgba(255, 255, 255, 0.15)', color: 'white',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.3)', textAlign: 'left',
                            boxSizing: 'border-box'
                        }}
                    />

                    {/* View Toggle (Desktop Only) */}
                    {!isMobile && (
                        <div style={{
                            display: 'flex', background: 'rgba(255,255,255,0.1)', padding: '5px',
                            borderRadius: '30px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)',
                            flexShrink: 0
                        }}>
                            <button
                                onClick={() => setViewMode('list')}
                                style={{
                                    padding: '8px 12px', borderRadius: '25px', border: 'none', cursor: 'pointer',
                                    background: viewMode === 'list' ? '#ffb300' : 'transparent',
                                    color: viewMode === 'list' ? '#000' : '#fff', transition: 'all 0.2s',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}
                                title="List View"
                            >
                                <List size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                style={{
                                    padding: '8px 12px', borderRadius: '25px', border: 'none', cursor: 'pointer',
                                    background: viewMode === 'grid' ? '#ffb300' : 'transparent',
                                    color: viewMode === 'grid' ? '#000' : '#fff', transition: 'all 0.2s',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}
                                title="Grid View"
                            >
                                <LayoutGrid size={20} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Team List with Scroll */}
                <div style={{
                    width: '100%',
                    height: viewMode === 'grid' && !isMobile ? '600px' : '950px', // Exact mathematical padding for cards layout
                    transition: 'height 0.3s ease', // Smoothly animate the container shrinking
                    display: viewMode === 'grid' && !isMobile ? 'grid' : 'flex',
                    gridTemplateColumns: viewMode === 'grid' && !isMobile ? '1fr 1fr' : 'none',
                    flexDirection: viewMode === 'grid' && !isMobile ? 'unset' : 'column',
                    alignContent: 'start',
                    gap: '15px',
                    overflowY: 'auto',
                    paddingRight: '10px', // Prevent scrollbar overlap
                    paddingBottom: '1rem',
                    flexShrink: 0
                }} className="team-scroll-container">
                    {currentTeams.filter(team => team._id !== pinnedTeamId).map((team, index) => {
                        // Calculate actual rank based on overall array
                        const rank = teams.findIndex(t => t._id === team._id) + 1;
                        const isPinned = pinnedTeamId === team._id;

                        return (
                            <motion.div
                                key={team._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}

                                style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    padding: '15px 25px', borderRadius: '15px',
                                    background: isPinned ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.4)', // Darker inner glass
                                    backdropFilter: 'blur(10px)',
                                    border: isPinned ? '2px solid #ffb300' : '1px solid rgba(255, 255, 255, 0.1)',
                                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)' // Removed purple tint
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
                                            color: isPinned ? '#ffb300' : '#fff',
                                            opacity: isPinned ? 1 : 0.4,
                                            filter: isPinned ? 'drop-shadow(0 0 5px #ffb300)' : 'none',
                                            padding: '4px', display: 'flex', alignItems: 'center'
                                        }}
                                        title={isPinned ? "Unpin this team" : "Pin this team"}
                                    >
                                        <Pin size={22} strokeWidth={isPinned ? 3 : 2} fill={isPinned ? '#ffb300' : 'none'} />
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Always-visible Appended Pinned Slot (Sticky Footer containing Pagination) */}
                {pinnedTeam && (
                    <div style={{
                        width: '100%', position: 'absolute', bottom: '0', left: '0',
                        padding: '15px 1.5rem', zIndex: 10, display: 'flex', flexDirection: 'column',
                        gap: '15px', pointerEvents: 'none'
                    }}>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                padding: '15px 25px', borderRadius: '15px',
                                background: 'rgba(0, 0, 0, 0.9)',
                                backdropFilter: 'blur(16px)',
                                border: '2px solid #ffb300',
                                boxShadow: '0 12px 32px 0 rgba(0, 0, 0, 0.9)',
                                pointerEvents: 'auto'
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
                                        color: '#ffb300', opacity: 1,
                                        filter: 'drop-shadow(0 0 5px #ffb300)',
                                        padding: '4px', display: 'flex', alignItems: 'center'
                                    }}
                                    title="Unpin this team"
                                >
                                    <Pin size={22} strokeWidth={3} fill="#ffb300" />
                                </button>
                            </div>
                        </motion.div>

                        {/* Pagination under pinned team layer */}
                        {totalPages > 1 && (
                            <div style={{
                                display: 'flex', gap: '15px', justifyContent: 'center', alignItems: 'center', flexShrink: 0,
                                background: 'rgba(15, 15, 20, 0.95)', padding: '12px 20px', borderRadius: '20px',
                                border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(16px)',
                                pointerEvents: 'auto', alignSelf: 'center'
                            }}>
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
                )}

                {/* Normal Pagination when no team is pinned */}
                {!pinnedTeam && totalPages > 1 && (
                    <div style={{
                        display: 'flex', gap: '15px', marginTop: '1rem', justifyContent: 'center', alignItems: 'center', flexShrink: 0,
                        background: 'rgba(15, 15, 20, 0.5)', padding: '12px 20px', borderRadius: '20px',
                        border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)'
                    }}>
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
