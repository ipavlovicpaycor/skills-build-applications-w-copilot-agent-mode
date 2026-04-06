import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import octofitLogo from './octofitapp-small.png';

function App() {
  console.log('App component mounted');
  console.log('REACT_APP_CODESPACE_NAME:', process.env.REACT_APP_CODESPACE_NAME);

  return (
    <Router>
      <div className="App">
        {/* Navigation Menu */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src={octofitLogo} alt="OctoFit Logo" className="navbar-logo" />
              OctoFit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    👥 Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    🏆 Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    📊 Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    💪 Workouts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    🥇 Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="main-content">
          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <>
                  <div className="home-hero">
                    <div className="container">
                      <h1>Welcome to OctoFit Tracker</h1>
                      <p>Your fitness tracking and team management application</p>
                    </div>
                  </div>
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="alert alert-info">
                          <h5 className="alert-heading">API Configuration</h5>
                          <p className="mb-0">
                            <strong>Base URL:</strong>{' '}
                            <code>
                              {process.env.REACT_APP_CODESPACE_NAME
                                ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
                                : 'http://localhost:8000'}
                            </code>
                          </p>
                          <p className="mt-2 mb-0">
                            Open the browser console (F12) to see API endpoint debug logs.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-4 mb-3">
                        <div className="card text-center">
                          <div className="card-body">
                            <h5 className="card-title">👥 Users</h5>
                            <p className="card-text">
                              Manage user profiles and account information
                            </p>
                            <Link to="/users" className="btn btn-primary">
                              View Users
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="card text-center">
                          <div className="card-body">
                            <h5 className="card-title">🏆 Teams</h5>
                            <p className="card-text">
                              Create and manage fitness teams
                            </p>
                            <Link to="/teams" className="btn btn-primary">
                              View Teams
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="card text-center">
                          <div className="card-body">
                            <h5 className="card-title">📊 Activities</h5>
                            <p className="card-text">
                              Track your fitness activities and logs
                            </p>
                            <Link to="/activities" className="btn btn-primary">
                              View Activities
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-4 mb-3">
                        <div className="card text-center">
                          <div className="card-body">
                            <h5 className="card-title">💪 Workouts</h5>
                            <p className="card-text">
                              Browse personalized workout suggestions
                            </p>
                            <Link to="/workouts" className="btn btn-primary">
                              View Workouts
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="card text-center">
                          <div className="card-body">
                            <h5 className="card-title">🥇 Leaderboard</h5>
                            <p className="card-text">
                              Compete with others on the leaderboard
                            </p>
                            <Link to="/leaderboard" className="btn btn-primary">
                              View Leaderboard
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              }
            />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="bg-dark text-white text-center py-4 mt-5">
          <div className="container">
            <p className="mb-0">
              &copy; 2024 OctoFit Tracker. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
