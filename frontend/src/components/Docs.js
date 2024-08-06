import React from 'react';
import '../styles/Docs.css';

const Docs = () => {
  return (
    <div className="docs">
      <h2>Documentation</h2>
      <p>Welcome to the documentation section. Here you will find all the necessary information about using our platform.</p>
      <ul>
        <li><a href="#">Getting Started</a></li>
        <li><a href="#">API Reference</a></li>
        <li><a href="#">User Guide</a></li>
        <li><a href="#">FAQ</a></li>
      </ul>
    </div>
  );
};

export default Docs;