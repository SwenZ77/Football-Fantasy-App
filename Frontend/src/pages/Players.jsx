import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ApiService from '../services/api';

// Common positions
const POSITIONS = ['GK', 'DF', 'MF', 'FW'];

const Players = () => {
  const [searchParams] = useSearchParams();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  
  // Initialize filters with URL params immediately
  const [filters, setFilters] = useState({
    team: searchParams.get('team') || '',
    position: ''
  });
  
  const [availableTeams, setAvailableTeams] = useState([]);
  const [teamsLoading, setTeamsLoading] = useState(true);

  // Fetch available teams from backend
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setTeamsLoading(true);
        const teamsData = await ApiService.getAllTeams();
        
        // Extract team names directly (data is now cleaned)
        const teamNames = teamsData.map(team => team.name).filter(name => name).sort();
        
        // Remove duplicates
        const uniqueTeams = [...new Set(teamNames)];
        setAvailableTeams(uniqueTeams);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setAvailableTeams([]); // Fallback to empty array
      } finally {
        setTeamsLoading(false);
      }
    };

    fetchTeams();
  }, []);

  // Initialize filters from URL parameters and update when URL changes
  useEffect(() => {
    const teamFromQuery = searchParams.get('team');
    
    // Only update if there's a team in URL and it's different from current filter
    if (teamFromQuery) {
      setFilters(prev => {
        if (prev.team !== teamFromQuery) {
          return {
            ...prev,
            team: teamFromQuery
          };
        }
        return prev;
      });
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Prepare search parameters - only include non-empty values
        const searchFilters = {};
        if (filters.team) searchFilters.team = filters.team;
        if (filters.position) searchFilters.position = filters.position;
        if (search.trim()) searchFilters.name = search.trim();
        
        // Call searchPlayers with current filters
        const data = await ApiService.searchPlayers(searchFilters);
        
        setPlayers(Array.isArray(data) ? data : []);
        setError(null);
      } catch (error) {
        console.error('Error fetching players:', error);
        setError('Failed to fetch players. Make sure your backend server is running on localhost:8080');
        setPlayers([]);
      } finally {
        setLoading(false);
      }
    };

    // Always fetch data, even if no filters are set (will get all players)
    fetchData();
  }, [filters.team, filters.position, search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // The search will automatically trigger via the useEffect dependency on search
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      team: '',
      position: ''
    });
    setSearch('');
    // Clear URL params as well
    window.history.pushState({}, '', '/players');
  };

  const getPositionFullName = (pos) => {
    const positions = {
      'GK': 'Goalkeeper',
      'DF': 'Defender', 
      'MF': 'Midfielder',
      'FW': 'Forward',
      'gk': 'Goalkeeper',
      'df': 'Defender',
      'mf': 'Midfielder',
      'fw': 'Forward'
    };
    return positions[pos] || pos;
  };

  const formatMinutes = (minutes) => {
    if (!minutes || minutes === 0) return '0';
    if (minutes >= 1000) return `${(minutes / 1000).toFixed(1)}k`;
    return minutes.toString();
  };

  if (loading) {
    return <LoadingSpinner message="Loading players..." />;
  }

  if (error) {
    return (
      <div>
        <h2 className="page-title">Player Search</h2>
        <div className="error">
          {error}
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="btn-primary"
          style={{ marginTop: '1rem' }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="page-title">Player Search</h2>
      
      {searchParams.get('team') && (
        <div style={{
          backgroundColor: '#1e3a8a15',
          border: '1px solid #3b82f6',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1.5rem',
          textAlign: 'center',
          color: '#3b82f6'
        }}>
          <span style={{ fontSize: '1.2rem' }}>⚽</span> Showing players from: <strong>{searchParams.get('team')}</strong>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#ccc' }}>
            You can still use other filters to narrow down the results further.
          </p>
        </div>
      )}
      
      <div style={{ marginBottom: '2rem' }}>
        <form onSubmit={handleSearchSubmit} style={{ marginBottom: '1rem', textAlign: 'center' }}>
          <input
            type="text"
            className="search-input"
            placeholder="Search players by name (e.g., 'Erling', 'Messi')..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div style={{ marginTop: '1rem' }}>
            <button 
              type="submit"
              className="btn-primary"
              style={{ marginRight: '1rem' }}
            >
              Search by Name
            </button>
            <button 
              type="button"
              onClick={clearFilters}
              className="btn-secondary"
            >
              Clear All
            </button>
          </div>
        </form>

        <div className="filter-controls">
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffd700' }}>Team:</label>
            <select
              className="filter-select"
              value={filters.team}
              onChange={(e) => handleFilterChange('team', e.target.value)}
              disabled={teamsLoading}
            >
              <option value="">{teamsLoading ? 'Loading teams...' : 'All Teams'}</option>
              {availableTeams.map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ffd700' }}>Position:</label>
            <select
              className="filter-select"
              value={filters.position}
              onChange={(e) => handleFilterChange('position', e.target.value)}
            >
              <option value="">All Positions</option>
              {POSITIONS.map(pos => (
                <option key={pos} value={pos}>{getPositionFullName(pos)}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ textAlign: 'center', fontSize: '0.9rem', color: '#ccc' }}>
          <p>💡 Tip: You can combine filters (e.g., Position: Defender + Team: Arsenal) or search by name</p>
        </div>
      </div>

      {players.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No players found with current filters.</p>
          <p style={{ fontSize: '0.9rem', color: '#ccc', marginTop: '1rem' }}>
            Try adjusting your search criteria or check if your backend server is running.
          </p>
        </div>
      ) : (
        <>
          <div className="players-table-container" style={{ overflowX: 'auto' }}>
            <table className="players-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Team</th>
                  <th>Nation</th>
                  <th>Age</th>
                  <th>Matches</th>
                  <th>Goals</th>
                  <th>Assists</th>
                  <th>G+A</th>
                  <th>Minutes</th>
                  <th>Yellow Cards</th>
                  <th>Red Cards</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, index) => (
                  <tr key={player.index || index}>
                    <td style={{ fontWeight: 'bold' }}>{player.name || 'N/A'}</td>
                    <td>
                      <span style={{ 
                        background: player.position === 'GK' ? '#ff6b6b' : 
                                   player.position === 'DF' ? '#4ecdc4' : 
                                   player.position === 'MF' ? '#45b7d1' : '#96ceb4',
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '0.8rem'
                      }}>
                        {player.position || 'N/A'}
                      </span>
                    </td>
                    <td style={{ fontWeight: '500' }}>{player.team || 'N/A'}</td>
                    <td>{player.nation || 'N/A'}</td>
                    <td>{player.age || '-'}</td>
                    <td>{player.mp || 0}</td>
                    <td style={{ fontWeight: 'bold', color: player.goals > 0 ? '#00ff00' : 'inherit' }}>
                      {player.goals || 0}
                    </td>
                    <td style={{ fontWeight: 'bold', color: player.assists > 0 ? '#00ff00' : 'inherit' }}>
                      {player.assists || 0}
                    </td>
                    <td style={{ fontWeight: 'bold', color: player.gPlusA > 0 ? '#00ff00' : 'inherit' }}>
                      {player.gPlusA || 0}
                    </td>
                    <td>{formatMinutes(player.min)}</td>
                    <td style={{ color: player.crdY > 0 ? '#ffff00' : 'inherit', fontWeight: player.crdY > 0 ? 'bold' : 'normal' }}>
                      {player.crdY || 0}
                    </td>
                    <td style={{ color: player.crdR > 0 ? '#ff0000' : 'inherit', fontWeight: player.crdR > 0 ? 'bold' : 'normal' }}>
                      {player.crdR || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center', color: '#ccc', fontSize: '0.9rem' }}>
            Found {players.length} player{players.length !== 1 ? 's' : ''}
            {(filters.team || filters.position || search) && 
              <span> matching your criteria</span>
            }
          </div>
        </>
      )}
    </div>
  );
};

export default Players;
