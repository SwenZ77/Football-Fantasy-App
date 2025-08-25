const Home = () => {
  return (
    <div>
      <h1 className="page-title">UEFA Champions League Fantasy</h1>
      
      <div className="stats-cards">
        <div className="stat-card">
          <h3>🏆 Champions League</h3>
          <p>
            Track your favorite teams and players in Europe's premier club competition.
            Build your fantasy team with the best players from the continent's top clubs.
          </p>
        </div>
        
        <div className="stat-card">
          <h3>👥 Players Database</h3>
          <p>
            Search and filter players by team, position, and nationality.
            Find the perfect players to complete your fantasy squad.
          </p>
        </div>
        
        <div className="stat-card">
          <h3>🏟️ Team Standings</h3>
          <p>
            View team rankings, points, and performance statistics.
            Stay updated with the latest standings and team form.
          </p>
        </div>
      </div>
      
      <div className="stat-card" style={{ marginTop: '2rem', textAlign: 'left' }}>
        <h3>🚀 How to Use</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '1rem' }}>
          <div>
            <h4 style={{ color: '#ffd700', marginBottom: '0.5rem' }}>Teams Standings</h4>
            <p>Browse all participating teams, view their current rankings, points, and search for specific teams.</p>
          </div>
          <div>
            <h4 style={{ color: '#ffd700', marginBottom: '0.5rem' }}>Player Search</h4>
            <p>Find players by name, team, position, or nationality. Filter combinations to find exactly who you're looking for.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
