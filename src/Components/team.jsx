import React from 'react';
import '../Styles/team.css';

const Team = () => {
  return (
    <div className="team-page">
      <h1 className="team-title">TEAM</h1>
      <div className="team-container">
        <div className="team-member">
          <img className="team-image" src="https://via.placeholder.com/150" alt="Francisco Arana" />
          <div className="team-name">Francisco Arana</div>
        </div>
        <div className="team-member">
          <img className="team-image" src="https://via.placeholder.com/150" alt="Santiago Freille" />
          <div className="team-name">Santiago F</div>
        </div>
        <div className="team-member">
          <img className="team-image" src="https://via.placeholder.com/150" alt="Sofia Freille" />
          <div className="team-name">Sofia Freille</div>
        </div>
      </div>
    </div>
  );
}

export default Team;
