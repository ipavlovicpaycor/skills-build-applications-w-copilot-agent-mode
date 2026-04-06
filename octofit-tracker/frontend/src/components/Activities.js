import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const codespaceURL = process.env.REACT_APP_CODESPACE_NAME
          ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
          : 'http://localhost:8000';

        const endpoint = `${codespaceURL}/api/activities/`;
        console.log('Fetching Activities from:', endpoint);

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Activities data received:', data);

        // Handle both paginated and plain array responses
        const activitiesList = data.results || data;
        setActivities(Array.isArray(activitiesList) ? activitiesList : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="loading-state">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading activities...</p>
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
      <h2>📊 Activities</h2>
      {activities.length === 0 ? (
        <div className="alert alert-info">
          <p className="mb-0">No activities found. The data may still be loading or no activities exist yet.</p>
        </div>
      ) : (
        <div className="table-container">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">ID</th>
                  <th scope="col">Activity Type</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, index) => (
                  <tr key={activity._id || activity.id}>
                    <td>{index + 1}</td>
                    <td>
                      <code>{activity._id || activity.id}</code>
                    </td>
                    <td>
                      <span className="badge bg-info">{activity.activity_type}</span>
                    </td>
                    <td>{activity.duration || 'N/A'}</td>
                    <td>
                      {activity.date ? new Date(activity.date).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3">
            <small className="text-muted">
              Total Activities: <strong>{activities.length}</strong>
            </small>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;
