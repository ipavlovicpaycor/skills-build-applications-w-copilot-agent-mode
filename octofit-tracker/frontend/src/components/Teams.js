import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const endpoint = process.env.REACT_APP_CODESPACE_NAME
          ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
          : 'http://localhost:8000/api/teams/';
        console.log('Fetching Teams from:', endpoint);

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Teams data received:', data);

        // Handle both paginated and plain array responses
        const teamsList = data.results || data;
        setTeams(Array.isArray(teamsList) ? teamsList : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="loading-state">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading teams...</p>
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
      <h2>🏆 Teams</h2>
      {teams.length === 0 ? (
        <div className="alert alert-info">
          <p className="mb-0">No teams found. The data may still be loading or no teams exist yet.</p>
        </div>
      ) : (
        <div className="table-container">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">ID</th>
                  <th scope="col">Team Name</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, index) => (
                  <tr key={team._id || team.id}>
                    <td>{index + 1}</td>
                    <td>
                      <code>{team._id || team.id}</code>
                    </td>
                    <td>
                      <strong>{team.name}</strong>
                    </td>
                    <td>{team.description || <em className="text-muted">No description</em>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3">
            <small className="text-muted">
              Total Teams: <strong>{teams.length}</strong>
            </small>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;
