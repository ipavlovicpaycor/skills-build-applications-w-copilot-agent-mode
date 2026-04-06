import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const endpoint = process.env.REACT_APP_CODESPACE_NAME
          ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
          : 'http://localhost:8000/api/leaderboard/';
        console.log('Fetching Leaderboard from:', endpoint);

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Leaderboard data received:', data);

        // Handle both paginated and plain array responses
        const leaderboardList = data.results || data;
        setLeaderboard(Array.isArray(leaderboardList) ? leaderboardList : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getMedalIcon = (rank) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return '•';
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="loading-state">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <h4 className="alert-heading">Error</h4>
          <p>{error}</p>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      <h2>🥇 Leaderboard</h2>
      {leaderboard.length === 0 ? (
        <div className="alert alert-info">
          <p className="mb-0">No leaderboard data found. The data may still be loading or no entries exist yet.</p>
        </div>
      ) : (
        <div className="table-container">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">User/Team</th>
                  <th scope="col">Points</th>
                  <th scope="col">Achievements</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => {
                  const rank = index + 1;
                  return (
                    <tr key={entry._id || entry.id} className={rank <= 3 ? 'table-warning' : ''}>
                      <td>
                        <strong>
                          {getMedalIcon(rank)} {rank}
                        </strong>
                      </td>
                      <td>
                        <strong>{entry.user || entry.team || entry.name}</strong>
                      </td>
                      <td>
                        <span className="badge bg-primary">
                          {entry.points || entry.score || 0}
                        </span>
                      </td>
                      <td>{entry.achievements || 'N/A'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-3">
            <small className="text-muted">
              Total Entries: <strong>{leaderboard.length}</strong>
            </small>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
