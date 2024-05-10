import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1>Home</h1>
        <Link to="/" className="btn btn-danger">Logout</Link>
      </div>
    </div>
  );
}

export default Home;
