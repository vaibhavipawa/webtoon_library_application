import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await fetch('/api/favorites', {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      });
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  return (
    <div className="favorites-page">
      <h2>My Favorites</h2>
      <div className="webtoon-list">
        {favorites.map((webtoon) => (
          <Link to={`/webtoon/${webtoon.id}`} key={webtoon.id} className="webtoon-item">
            <img src={webtoon.thumbnail} alt={webtoon.title} />
            <h3>{webtoon.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;
