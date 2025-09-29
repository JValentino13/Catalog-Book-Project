import React from 'react';

const RecommendationCard = ({ recommendation }) => {
  return (
    <div className="recommendation-card" data-id={recommendation.id}>
      <div className="recommendation-name">{recommendation.name}</div>
      <div className="recommendation-desc">{recommendation.desc}</div>
      <div className="recommendation-price">{recommendation.rating}</div>
    </div>
  );
};

export default RecommendationCard;