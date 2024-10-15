import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [webtoons, setWebtoons] = useState([]);

  useEffect(() => {
    fetchWebtoons();
  }, []);

  const fetchWebtoons = async () => {
    try {
      const response = await fetch('/api/webtoons', {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      });
      const data = await response.json();
      setWebtoons(data);
    } catch (error) {
      console.error('Error fetching webtoons:', error);
    }
  };

  return (
    <div className="home-page">
      <h2>Top 10 Popular Webtoons</h2>
      <div className="webtoon-list">
        {webtoons.map((webtoon) => (
          <Link to={`/webtoon/${webtoon.id}`} key={webtoon.id} className="webtoon-item">
            <img src={webtoon.thumbnail} alt={webtoon.title} />
            <h3>{webtoon.title}</h3>
            <p>{webtoon.brief_description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
