import React from 'react';
import './Card.css';

const Card = ({ title, count, color, icon: Icon }) => {
  return (
    
    <div className="card" style={{ background: color }}>
      <div className="card-icon" >
        {Icon && <Icon />}
      </div>
      <div>
        <h3>{title}</h3>
        <p>{count}</p>
      </div>
    </div>
  );
};

export default Card;