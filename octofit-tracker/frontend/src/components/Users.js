import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const endpoint = process.env.REACT_APP_CODESPACE_NAME
          ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`
          : 'http://localhost:8000/api/users/';
        console.log('Fetching Users from:', endpoint);

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Users data received:', data);

        // Handle both paginated and plain array responses
        const usersList = data.results || data;
        setUsers(Array.isArray(usersList) ? usersList : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="loading-state">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading users...</p>
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
      <h2>👥 Users</h2>
      {users.length === 0 ? (
        <div className="alert alert-info">
          <p className="mb-0">No users found. The data may still be loading or no users exist yet.</p>
        </div>
      ) : (
        <div className="table-container">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">ID</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id || user.id}>
                    <td>{index + 1}</td>
                    <td>
                      <code>{user._id || user.id}</code>
                    </td>
                    <td>
                      <strong>{user.username}</strong>
                    </td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3">
            <small className="text-muted">
              Total Users: <strong>{users.length}</strong>
            </small>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
