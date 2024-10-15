import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function WebtoonDetailPage() {
  const [webtoon, setWebtoon] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchWebtoonDetails();
    fetchComments();
    checkIfFavorite();
  }, [id]);

  const fetchWebtoonDetails = async () => {
    try {
      const response = await fetch(`/api/webtoons/${id}`, {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      });
      const data = await response.json();
      setWebtoon(data);
    } catch (error) {
      console.error('Error fetching webtoon details:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/webtoons/${id}/comments`, {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      });
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/webtoons/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({ content: newComment }),
      });
      const data = await response.json();
      setComments([...comments, data]);
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const checkIfFavorite = async () => {
    try {
      const response = await fetch(`/api/favorites/check/${id}`, {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      });
      const data = await response.json();
      setIsFavorite(data.isFavorite);
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({ webtoonId: id }),
      });
      if (response.ok) {
        setIsFavorite(!isFavorite);
        alert(isFavorite ? 'Removed from favorites' : 'Added to favorites');
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (!webtoon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="webtoon-detail">
      <h2>{webtoon.title}</h2>
      <img src={webtoon.image} alt={webtoon.title} className="webtoon-image" />
      <p className="webtoon-description">{webtoon.description}</p>
      <button onClick={toggleFavorite}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      <div className="comments-section">
        <h3>Comments</h3>
        <ul className="comment-list">
          {comments.map((comment) => (
            <li key={comment.id} className="comment-item">
              <p>{comment.content}</p>
            </li>
          ))}
        </ul>
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            required
          ></textarea>
          <button type="submit">Submit Comment</button>
        </form>
      </div>
    </div>
  );
}

export default WebtoonDetailPage;
