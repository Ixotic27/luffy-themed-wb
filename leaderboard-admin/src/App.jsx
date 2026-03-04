import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, Download, Search, Edit2, Play, Pause, Save } from 'lucide-react';

const API_URL = 'http://localhost:5001/api';

function App() {
  const [teams, setTeams] = useState([]);
  const [visibility, setVisibility] = useState(true);
  const [search, setSearch] = useState('');
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editPoints, setEditPoints] = useState(0);

  useEffect(() => {
    fetchTeams();
    fetchVisibility();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await axios.get(`${API_URL}/leaderboard`);
      setTeams(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchVisibility = async () => {
    try {
      const res = await axios.get(`${API_URL}/settings/visibility`);
      setVisibility(res.data.visibility);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleVisibility = async () => {
    try {
      const newVisibility = !visibility;
      await axios.post(`${API_URL}/settings/visibility`, { visibility: newVisibility });
      setVisibility(newVisibility);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file');

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`${API_URL}/csv/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('CSV Uploaded Successfully');
      fetchTeams();
    } catch (err) {
      console.error(err);
      alert('Failed to upload CSV');
    }
  };

  const handleExport = () => {
    window.location.href = `${API_URL}/csv/export`;
  };

  const savePoints = async (id) => {
    try {
      await axios.put(`${API_URL}/teams/${id}`, { points: Number(editPoints) });
      setEditingId(null);
      fetchTeams();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTeams = teams.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.leader.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 20, fontFamily: 'sans-serif', color: '#e5e7eb' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #374151', paddingBottom: 20, marginBottom: 20 }}>
        <h2>Leaderboard Admin Control</h2>

        <button
          onClick={toggleVisibility}
          style={{
            padding: '10px 20px',
            borderRadius: 8,
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            display: 'flex', alignItems: 'center', gap: 8,
            backgroundColor: visibility ? '#10b981' : '#ef4444', color: 'white'
          }}
        >
          {visibility ? <Play size={18} /> : <Pause size={18} />}
          LEADERBOARD IS: {visibility ? 'ON' : 'OFF'}
        </button>
      </header>

      <section style={{ display: 'flex', gap: 20, marginBottom: 30, background: '#1f2937', padding: 20, borderRadius: 12, border: '1px solid #374151', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, color: '#f9fafb' }}>Import CSV</h3>
          <p style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Requires headers: "Team Name", "Leader Name", "Participant Names"</p>
          <form onSubmit={handleFileUpload} style={{ display: 'flex', gap: 10, marginTop: 10 }}>
            <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />
            <button type="submit" style={{ padding: '8px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
              <Upload size={16} style={{ verticalAlign: 'middle', marginRight: 5 }} /> Upload
            </button>
          </form>
        </div>

        <div style={{ paddingLeft: 20, borderLeft: '1px solid #374151', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 style={{ margin: 0, color: '#f9fafb' }}>Export Data</h3>
          <button onClick={handleExport} style={{ marginTop: 10, padding: '8px 16px', background: '#374151', color: 'white', border: '1px solid #4b5563', borderRadius: 6, cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={e => e.target.style.background = '#4b5563'} onMouseOut={e => e.target.style.background = '#374151'}>
            <Download size={16} style={{ verticalAlign: 'middle', marginRight: 5 }} /> Download Current DB as CSV
          </button>
        </div>
      </section>

      <section style={{ background: '#1f2937', padding: 20, borderRadius: 12, border: '1px solid #374151', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
          <h3 style={{ margin: 0, color: '#f9fafb' }}>Team Management ({teams.length})</h3>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: 10, top: 10, color: '#9ca3af' }} />
            <input
              type="text"
              placeholder="Search teams..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: '8px 8px 8px 35px', width: 300, borderRadius: 6, border: '1px solid #4b5563', background: '#111827', color: 'white' }}
            />
          </div>
        </div>

        <div style={{ height: '400px', overflowY: 'auto', border: '1px solid #374151', borderRadius: '8px', background: '#111827' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ position: 'sticky', top: 0, background: '#1f2937', zIndex: 1, boxShadow: '0 2px 5px rgba(0,0,0,0.5)' }}>
              <tr style={{ borderBottom: '2px solid #374151' }}>
                <th style={{ padding: 12 }}>Team Name</th>
                <th style={{ padding: 12 }}>Leader</th>
                <th style={{ padding: 12 }}>Members</th>
                <th style={{ padding: 12 }}>Points</th>
                <th style={{ padding: 12 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeams.length > 0 ? (
                filteredTeams.map((team) => (
                  <tr key={team._id} style={{ borderBottom: '1px solid #374151', background: '#1f2937' }}>
                    <td style={{ padding: 12, fontWeight: 'bold', color: '#f3f4f6' }}>{team.name}</td>
                    <td style={{ padding: 12, color: '#d1d5db' }}>{team.leader}</td>
                    <td style={{ padding: 12, fontSize: '0.85rem', color: '#9ca3af' }}>{team.members.length} members</td>
                    <td style={{ padding: 12 }}>
                      {editingId === team._id ? (
                        <input
                          type="number"
                          value={editPoints}
                          onChange={(e) => setEditPoints(e.target.value)}
                          style={{ width: 80, padding: 6, borderRadius: 4, border: '1px solid #4b5563', background: '#111827', color: 'white' }}
                        />
                      ) : (
                        <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#60a5fa' }}>{team.points}</span>
                      )}
                    </td>
                    <td style={{ padding: 12 }}>
                      {editingId === team._id ? (
                        <button onClick={() => savePoints(team._id)} style={{ padding: '6px 12px', background: '#10b981', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
                          <Save size={16} /> Save
                        </button>
                      ) : (
                        <button
                          onClick={() => { setEditingId(team._id); setEditPoints(team.points); }}
                          style={{ padding: '6px 12px', background: 'transparent', color: '#d1d5db', border: '1px solid #4b5563', borderRadius: 6, cursor: 'pointer', transition: 'background 0.2s' }}
                          onMouseOver={e => { e.target.style.background = '#374151'; e.target.style.color = 'white' }}
                          onMouseOut={e => { e.target.style.background = 'transparent'; e.target.style.color = '#d1d5db' }}
                        >
                          <Edit2 size={16} /> Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ padding: 40, textAlign: 'center', color: '#9ca3af', fontStyle: 'italic' }}>
                    {teams.length === 0 ? "No teams have been uploaded yet. Please import a CSV." : "No teams matching your search."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default App;
