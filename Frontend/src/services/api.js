// Use a single env var for the backend base URL; supports values with or without "/api/v1"
// Note: BACKEND_API_URL is injected via Vite define() in vite.config.js
const __rawBase = (import.meta.env?.BACKEND_API_URL || 'http://localhost:8080').replace(/\/+$/, '');
const API_BASE_URL = /\/api\/v\d+$/i.test(__rawBase) ? __rawBase : `${__rawBase}/api/v1`;

class ApiService {
  static async makeRequest(url, options = {}) {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Players API endpoints
  static async getAllPlayers() {
    return this.makeRequest(`${API_BASE_URL}/players`);
  }

  static async getPlayersByName(name) {
    return this.makeRequest(`${API_BASE_URL}/players?name=${encodeURIComponent(name)}`);
  }

  static async getPlayersByTeam(team) {
    return this.makeRequest(`${API_BASE_URL}/players?team=${encodeURIComponent(team)}`);
  }

  static async getPlayersByNation(nation) {
    return this.makeRequest(`${API_BASE_URL}/players?nation=${encodeURIComponent(nation)}`);
  }

  static async getPlayersByPosition(position) {
    return this.makeRequest(`${API_BASE_URL}/players?position=${encodeURIComponent(position)}`);
  }

  static async getPlayersByTeamAndPosition(team, position) {
    return this.makeRequest(
      `${API_BASE_URL}/players?team=${encodeURIComponent(team)}&position=${encodeURIComponent(position)}`
    );
  }

  static async getPlayersByNationAndPosition(nation, position) {
    return this.makeRequest(
      `${API_BASE_URL}/players?nation=${encodeURIComponent(nation)}&position=${encodeURIComponent(position)}`
    );
  }

  // Teams API endpoints
  static async getAllTeams() {
    return this.makeRequest(`${API_BASE_URL}/teams`);
  }

  static async getTeamByName(teamName) {
    return this.makeRequest(`${API_BASE_URL}/teams/team/${encodeURIComponent(teamName)}`);
  }

  static async getTeamByRank(rank) {
    return this.makeRequest(`${API_BASE_URL}/teams/rank/${rank}`);
  }

  static async getTeamByPoints(points) {
    return this.makeRequest(`${API_BASE_URL}/teams/pts/${points}`);
  }

  // Generic method for custom queries
  static async getPlayers(params = {}) {
    const searchParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key]) {
        searchParams.append(key, params[key]);
      }
    });

    const url = searchParams.toString() ? 
      `${API_BASE_URL}/players?${searchParams.toString()}` : 
      `${API_BASE_URL}/players`;
    
    return this.makeRequest(url);
  }

  // Enhanced search method that handles all filter combinations
  static async searchPlayers({ name, team, position, nation } = {}) {
    const searchParams = new URLSearchParams();
    
    if (name) searchParams.append('name', name);
    if (team) searchParams.append('team', team);
    if (position) searchParams.append('position', position);
    if (nation) searchParams.append('nation', nation);

    const url = searchParams.toString() ? 
      `${API_BASE_URL}/players?${searchParams.toString()}` : 
      `${API_BASE_URL}/players`;
    
    return this.makeRequest(url);
  }
}

export default ApiService;