import React from 'react';
import '../Styles/team.css';
import fran from '../sources/Fran.png';
import santi from '../sources/Santi.png';
import sofia from '../sources/Sofia.png';

const Team = () => {
  return (
    <div className="team-page">
      <h1 className="team-title">TEAM</h1>
      <div className="team-container">
        <div className="team-member">
          <img className="team-image" src={fran} alt="Francisco Arana" />
          <div className="team-name">Francisco Arana</div>
        </div>
        <div className="team-member">
          <img className="team-image" src={santi} alt="Santiago Freille" />
          <div className="team-name">Santiago Freille</div>
        </div>
        <div className="team-member">
          <img className="team-image" src={sofia} alt="Sofia Freille" />
          <div className="team-name">Sofia Freille</div>
        </div>
      </div>
    </div>
  );
}

export default Team;
