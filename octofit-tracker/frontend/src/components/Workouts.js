import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const endpoint = process.env.REACT_APP_CODESPACE_NAME
          ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
          : 'http://localhost:8000/api/workouts/';
        console.log('Fetching Workouts from:', endpoint);

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Workouts data received:', data);

        // Handle both paginated and plain array responses
        const workoutsList = data.results || data;
        setWorkouts(Array.isArray(workoutsList) ? workoutsList : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="loading-state">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading workouts...</p>
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
      <h2>💪 Workouts</h2>
      {workouts.length === 0 ? (
        <div className="alert alert-info">
          <p className="mb-0">No workouts found. The data may still be loading or no workouts exist yet.</p>
        </div>
      ) : (
        <div className="table-container">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">ID</th>
                  <th scope="col">Workout Name</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Calories Burned</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout, index) => (
                  <tr key={workout._id || workout.id}>
                    <td>{index + 1}</td>
                    <td>
                      <code>{workout._id || workout.id}</code>
                    </td>
                    <td>
                      <strong>{workout.name}</strong>
                    </td>
                    <td>
                      <span className="badge bg-success">{workout.duration || 'N/A'}</span>
                    </td>
                    <td>{workout.calories_burned || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3">
            <small className="text-muted">
              Total Workouts: <strong>{workouts.length}</strong>
            </small>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workouts;
