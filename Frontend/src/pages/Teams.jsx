import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import '../table-fix.css';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const tableRef = useRef(null);
  const navigate = useNavigate();

  const handleTeamClick = (team) => {
    // Use query parameters as a more reliable method for team filtering
    navigate(`/players?team=${encodeURIComponent(team.name)}`);
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  // Effect to ensure table rows are properly displayed
  useEffect(() => {
    if (tableRef.current && teams.length > 0) {
      // Force proper table layout after component mounts/updates
      const tableElement = tableRef.current;
      const tbody = tableElement.querySelector('tbody');
      if (tbody) {
        // Reset any potential layout issues
        tbody.style.transform = 'none';
        tbody.style.position = 'static';
        tbody.style.top = 'auto';
        tbody.style.left = 'auto';
        tbody.style.marginTop = '0';
        tbody.style.paddingTop = '0';
        
        // Ensure all rows are visible
        const rows = tbody.querySelectorAll('tr');
        rows.forEach((row) => {
          row.style.display = 'table-row';
          row.style.visibility = 'visible';
          row.style.position = 'static';
          row.style.transform = 'none';
          row.style.top = 'auto';
          row.style.left = 'auto';
        });
      }
    }
  }, [teams, search]); // Re-run when teams or search changes

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/v1/teams');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Teams API response:', data);
      setTeams(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching teams:', error);
      setError('Failed to fetch teams. Make sure your backend server is running on localhost:8080');
    } finally {
      setLoading(false);
    }
  };

  const filteredTeams = teams.filter(team => {
    if (!team.name) return false;
    
    const searchTerm = search.toLowerCase();
    const teamParts = team.name.split(' ');
    const countryCode = teamParts.length > 1 ? teamParts[0] : '';
    const teamName = teamParts.length > 1 ? teamParts.slice(1).join(' ') : team.name;
    
    return teamName.toLowerCase().includes(searchTerm) ||
           countryCode.toLowerCase().includes(searchTerm) ||
           team.name.toLowerCase().includes(searchTerm);
  }).sort((a, b) => (a.rk || 999) - (b.rk || 999)); // Ensure teams are sorted by rank, with fallback for missing ranks

  // Function to get team status based on rank
  const getTeamStatus = (rank) => {
    if (rank <= 8) {
      return {
        status: 'Champions League',
        color: '#ffd700', // Gold/Yellow
        marker: '●'
      };
    } else if (rank <= 16) {
      return {
        status: 'Round of 16',
        color: '#00ff00', // Green
        marker: '●'
      };
    } else if (rank <= 24) {
      return {
        status: 'Europa League',
        color: '#ff8800', // Orange
        marker: '●'
      };
    } else {
      return {
        status: 'Eliminated',
        color: '#ff0000', // Red
        marker: '●'
      };
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading teams..." />;
  }

  if (error) {
    return (
      <div>
        <h2 className="page-title">UEFA Champions League Standings</h2>
        <div className="error">
          {error}
        </div>
        <button 
          onClick={fetchTeams}
          className="btn-primary"
          style={{ marginTop: '1rem' }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="teams-page">
      <h2 className="page-title">UEFA Champions League Standings</h2>
      
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <input
          type="text"
          className="search-input"
          placeholder="Search teams by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredTeams.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No teams found matching "{search}"</p>
        </div>
      ) : (
        <>
          <div style={{ 
            marginBottom: '1rem', 
            fontSize: '0.9rem',
            textAlign: 'center',
            padding: '1rem',
            backgroundColor: 'rgba(0, 20, 40, 0.3)',
            borderRadius: '8px'
          }}>
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#ffd700', fontSize: '1.2rem' }}>●</span>
                <span style={{ color: '#ffd700', fontWeight: '500' }}>Champions League</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#00ff00', fontSize: '1.2rem' }}>●</span>
                <span style={{ color: '#00ff00', fontWeight: '500' }}>Round of 16</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#ff8800', fontSize: '1.2rem' }}>●</span>
                <span style={{ color: '#ff8800', fontWeight: '500' }}>Europa League</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#ff0000', fontSize: '1.2rem' }}>●</span>
                <span style={{ color: '#ff0000', fontWeight: '500' }}>Eliminated</span>
              </div>
            </div>
          </div>

          <div className="table-container" style={{ 
            width: '100%', 
            overflowX: 'auto', 
            overflowY: 'visible',
            position: 'relative',
            top: 0,
            left: 0,
            margin: '1rem 0 2rem 0',
            borderRadius: '10px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
            minHeight: 'fit-content',
            height: 'auto',
            maxHeight: 'none'
          }}>
            <table ref={tableRef} className="standings-table" style={{
              width: '100%',
              borderCollapse: 'collapse',
              position: 'relative',
              top: 0,
              left: 0,
              margin: 0,
              transform: 'none',
              height: 'auto',
              minHeight: 'fit-content'
            }}>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Team</th>
                  <th>Points</th>
                  <th>Played</th>
                  <th>Won</th>
                  <th>Drawn</th>
                  <th>Lost</th>
                  <th>GF</th>
                  <th>GA</th>
                  <th>GD</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeams.map(team => {
                  // Get team status for visual marker
                  const teamStatus = getTeamStatus(team.rk || 999);
                  
                  return (
                    <tr 
                      key={team.name} 
                      onClick={() => handleTeamClick(team)}
                      style={{
                        borderLeft: `4px solid ${teamStatus.color}`,
                        backgroundColor: `${teamStatus.color}08`, // Very subtle background tint
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = `${teamStatus.color}15`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = `${teamStatus.color}08`;
                      }}
                    >
                      <td style={{ 
                        fontWeight: 'bold', 
                        fontSize: '1.1rem',
                        position: 'relative',
                        paddingLeft: '20px'
                      }}>
                        {/* Status marker */}
                        <span style={{
                          position: 'absolute',
                          left: '6px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: teamStatus.color,
                          fontSize: '1.2rem',
                          fontWeight: 'bold'
                        }}>
                          {teamStatus.marker}
                        </span>
                        {team.rk || '-'}
                      </td>
                      <td style={{ fontWeight: 'bold' }}>
                        {team.name || 'N/A'}
                      </td>
                      <td style={{ fontWeight: 'bold', color: '#ffd700' }}>
                        {team.pts || 0}
                      </td>
                      <td>
                        {team.mp || 0}
                      </td>
                      <td style={{ color: '#00ff00' }}>
                        {team.w || 0}
                      </td>
                      <td style={{ color: '#ffff00' }}>
                        {team.d || 0}
                      </td>
                      <td style={{ color: '#ff6666' }}>
                        {team.l || 0}
                      </td>
                      <td>
                        {team.gf || 0}
                      </td>
                      <td>
                        {team.ga || 0}
                      </td>
                      <td style={{ 
                        color: team.gd && team.gd.startsWith('+') ? '#00ff00' : 
                               team.gd && team.gd.startsWith('-') ? '#ff6666' : '#ffffff'
                      }}>
                        {team.gd || '0'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center', color: '#ccc', fontSize: '0.9rem' }}>
            Total teams: {filteredTeams.length}
          </div>
        </>
      )}
    </div>
  );
};

export default Teams;
