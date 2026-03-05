import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LayoutGrid, List } from 'lucide-react';

// Mock data for teams - keep empty to show "no teams" state when CSV missing
const mockTeams = []; // e.g. CSV not uploaded yet

const TeamsSelected = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
    // Hardcode visibility to true or manage it statically if we are not fetching
    // For now we assume visibility is true if we aren't fetching API data
    const [visibility, setVisibility] = useState(true);

    // We replace the fetched "teams" with the static array
    const teams = mockTeams;

    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

    // Items per page to match the Leaderboard
    const itemsPerPage = 10;

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 900);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Filter teams based on search term
    const filteredTeams = useMemo(() => {
        const term = searchTerm.toLowerCase();
        return teams.filter(team =>
            team.name.toLowerCase().includes(term) ||
            team.leader?.toLowerCase().includes(term) ||
            (team.members && team.members.some(m => m.toLowerCase().includes(term)))
        );
    }, [searchTerm, teams]);

    // Pagination
    const totalPages = Math.ceil(filteredTeams.length / itemsPerPage);
    const currentTeams = filteredTeams.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
                    <h1 className="ap-title" style={{ color: '#ffb300', fontSize: isMobile ? '2.5rem' : '4rem', textShadow: '3px 3px 6px rgba(0,0,0,0.9)', margin: '0 0 1rem 0', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '4px' }}>
                        SELECTED <span className="op-font">C</span>REWS
                    </h1>
                    <p style={{ color: '#f3f4f6', fontSize: '1.2rem', margin: 0, fontWeight: '500', lineHeight: '1.6', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                        The Crews list is currently hidden by the Admins.<br />Please check back later!
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
            {/* Full-page dark overlay */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(2px)', zIndex: 0 }}></div>

            <div style={{
                position: 'relative',
                zIndex: 2,
                width: '100%',
                minHeight: '100vh',
                maxWidth: viewMode === 'grid' ? '1200px' : '900px',
                transition: 'max-width 0.3s ease',
                margin: '100px auto 20px', // Center the container and push under navbar
                padding: '2rem 1.5rem', // Local padding inside the glass box
                paddingBottom: '100px', // Leave room for pagination
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

                    {/* Controls Row: Search + View Toggles */}
                    <div style={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        justifyContent: 'space-between',
                        alignItems: isMobile ? 'stretch' : 'center',
                        width: '100%',
                        gap: '15px',
                        marginBottom: '1.5rem'
                    }}>
                        {/* Search Bar */}
                        <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
                            <div style={{
                                position: 'absolute',
                                left: '15px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'rgba(255,255,255,0.5)',
                                display: 'flex',
                                alignItems: 'center',
                                pointerEvents: 'none'
                            }}>
                                <Search size={18} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search crews by name or leader..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1); // Reset page on search
                                }}
                                style={{
                                    flex: 1,
                                    padding: '12px 20px 12px 45px',
                                    fontSize: '1rem',
                                    borderRadius: '30px',
                                    border: '1px solid rgba(255, 255, 255, 0.15)',
                                    outline: 'none',
                                    background: 'rgba(0, 0, 0, 0.4)',
                                    color: 'white',
                                    backdropFilter: 'blur(10px)',
                                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)',
                                    transition: 'border-color 0.3s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'rgba(255, 179, 0, 0.5)'}
                                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)'}
                            />
                        </div>

                        {/* View Toggles */}
                        <div style={{
                            display: 'flex',
                            gap: '10px',
                            justifyContent: isMobile ? 'center' : 'flex-end'
                        }}>
                            <button
                                onClick={() => setViewMode('list')}
                                style={{
                                    background: viewMode === 'list' ? 'rgba(255, 179, 0, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                                    border: `1px solid ${viewMode === 'list' ? '#ffb300' : 'rgba(255, 255, 255, 0.1)'}`,
                                    color: viewMode === 'list' ? '#ffb300' : '#888',
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <List size={16} /> List
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                style={{
                                    background: viewMode === 'grid' ? 'rgba(255, 179, 0, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                                    border: `1px solid ${viewMode === 'grid' ? '#ffb300' : 'rgba(255, 255, 255, 0.1)'}`,
                                    color: viewMode === 'grid' ? '#ffb300' : '#888',
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <LayoutGrid size={16} /> Grid
                            </button>
                        </div>
                    </div>

                    {/* Teams Layout */}
                    <AnimatePresence mode="wait">
                        {teams.length === 0 ? (
                            <motion.div
                                key="no-data"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{ width: '100%', textAlign: 'center', padding: '4rem 0' }}
                            >
                                <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5 }}>🧭</div>
                                <h3 style={{ color: '#ffb300', fontFamily: "'Cinzel', serif", fontSize: '2rem' }}>No crews to display right now</h3>
                                <p style={{ color: '#d1d5db', fontSize: '1.1rem' }}>The admin has not uploaded the crews list yet.</p>
                            </motion.div>
                        ) : currentTeams.length > 0 ? (
                            <motion.div
                                key={`layout-${viewMode}`} // Force re-render on layout change
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    width: '100%',
                                    display: viewMode === 'grid' || isMobile ? 'grid' : 'flex',
                                    gridTemplateColumns: viewMode === 'grid'
                                        ? 'repeat(auto-fill, minmax(280px, 1fr))'
                                        : (isMobile ? '1fr' : 'none'),
                                    flexDirection: viewMode === 'list' && !isMobile ? 'column' : 'unset',
                                    gap: '15px',
                                    flexShrink: 0
                                }}
                            >
                                {currentTeams.map((team, index) => (
                                    <motion.div
                                        key={team._id || team.name}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        layout
                                        style={{
                                            display: 'flex',
                                            flexDirection: viewMode === 'list' && !isMobile ? 'row' : 'column',
                                            alignItems: viewMode === 'list' && !isMobile ? 'center' : 'flex-start',
                                            justifyContent: 'space-between',
                                            padding: '20px',
                                            borderRadius: '16px',
                                            background: 'rgba(0, 0, 0, 0.4)', // Darker inner glass matching Leaderboard
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255, 255, 255, 0.08)',
                                            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
                                            transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-4px)';
                                            e.currentTarget.style.boxShadow = '0 12px 40px 0 rgba(0, 0, 0, 0.6)';
                                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.3)';
                                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                                        }}
                                    >
                                        <div style={{ flex: viewMode === 'list' && !isMobile ? '1' : 'none', minWidth: '0' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: viewMode === 'list' && !isMobile ? '0' : '10px' }}>
                                                <h3 style={{ margin: 0, color: 'white', fontSize: isMobile ? '1.2rem' : '1.4rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    {team.name}
                                                </h3>
                                                <span style={{
                                                    display: 'inline-block',
                                                    background: 'rgba(40, 167, 69, 0.15)',
                                                    color: '#28a745',
                                                    border: '1px solid rgba(40, 167, 69, 0.3)',
                                                    padding: '2px 8px',
                                                    borderRadius: '12px',
                                                    fontSize: '0.7rem',
                                                    fontWeight: 'bold',
                                                    textTransform: 'uppercase'
                                                }}>
                                                    Selected
                                                </span>
                                            </div>
                                            {(viewMode === 'grid' || isMobile) && (
                                                <div style={{ marginTop: '5px' }}>
                                                    <p style={{ margin: 0, color: '#ffb300', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Leader</p>
                                                    <p style={{ margin: 0, color: '#d1d5db', fontSize: '0.9rem' }}>{team.leader}</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* List View Columns */}
                                        {viewMode === 'list' && !isMobile && (
                                            <>
                                                <div style={{ flex: '1', minWidth: '0', padding: '0 15px' }}>
                                                    <p style={{ margin: 0, color: '#ffb300', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Leader</p>
                                                    <p style={{ margin: 0, color: '#d1d5db', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{team.leader}</p>
                                                </div>
                                                <div style={{ flex: '2', minWidth: '0', padding: '0 15px' }}>
                                                    <p style={{ margin: 0, color: '#ffb300', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Members</p>
                                                    <div style={{ display: 'flex', gap: '5px', overflow: 'hidden' }}>
                                                        {team.members && team.members.slice(0, 3).map((m, i) => (
                                                            <span key={i} style={{ color: '#aaa', fontSize: '0.85rem' }}>{m}{i < 2 && i < team.members.length - 1 ? ',' : ''}</span>
                                                        ))}
                                                        {team.members && team.members.length > 3 && <span style={{ color: '#888', fontSize: '0.85rem' }}>+{team.members.length - 3}</span>}
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {/* Grid View Extra Info */}
                                        {(viewMode === 'grid' || isMobile) && team.members && team.members.length > 0 && (
                                            <div style={{ marginTop: '15px', width: '100%' }}>
                                                <p style={{ margin: 0, color: '#ffb300', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Crew Members ({team.members.length})</p>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                                    {team.members.map((member, i) => (
                                                        <span key={i} style={{
                                                            background: 'rgba(255, 255, 255, 0.05)',
                                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                                            color: '#e9ecef',
                                                            padding: '2px 8px',
                                                            borderRadius: '6px',
                                                            fontSize: '0.75rem'
                                                        }}>
                                                            {member}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="no-search-results"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{ width: '100%', textAlign: 'center', padding: '3rem 0' }}
                            >
                                <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5 }}>🧭</div>
                                <h3 style={{ color: '#ffb300', fontFamily: "'Cinzel', serif" }}>No crews found</h3>
                                <p style={{ color: '#d1d5db' }}>Your compass might be broken. Try another search term!</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Pagination Controls - Fixed at Bottom of Container */}
                {totalPages > 1 && (
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        padding: '20px',
                        background: 'linear-gradient(to top, rgba(10,10,15,1) 0%, rgba(10,10,15,0.9) 70%, transparent 100%)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '15px',
                        borderBottomLeftRadius: '24px',
                        borderBottomRightRadius: '24px',
                        zIndex: 10
                    }}>
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            style={{
                                background: currentPage === 1 ? 'rgba(255,255,255,0.05)' : 'rgba(255,179,0,0.2)',
                                color: currentPage === 1 ? '#555' : '#ffb300',
                                border: `1px solid ${currentPage === 1 ? 'transparent' : '#ffb300'}`,
                                padding: '8px 16px',
                                borderRadius: '8px',
                                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Previous
                        </button>
                        <span style={{ color: 'white', fontSize: '0.9rem' }}>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            style={{
                                background: currentPage === totalPages ? 'rgba(255,255,255,0.05)' : 'rgba(255,179,0,0.2)',
                                color: currentPage === totalPages ? '#555' : '#ffb300',
                                border: `1px solid ${currentPage === totalPages ? 'transparent' : '#ffb300'}`,
                                padding: '8px 16px',
                                borderRadius: '8px',
                                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Next
                        </button>
                    </div>
                )}
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
