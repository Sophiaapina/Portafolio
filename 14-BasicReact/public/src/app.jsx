
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';

const MovieCard = ({ movie, onLike, onDislike }) => {
  const [affiliationColor, setAffiliationColor] = useState('blue');

  const handleMouseEnter = () => {
    setAffiliationColor(movie.best_character.affiliation === 'Jedi' ? 'blue' : 'red');
  };

  const handleMouseLeave = () => {
    setAffiliationColor('blue'); // Default color
  };

  return (
    <Card
      style={{ width: '18rem', margin: '10px' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Card.Img variant="top" src={require(`./public/${movie.poster}`).default} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.year}</Card.Text>
        <Link to={`/movie/${movie.title}`}>
          <Button variant="primary">More...</Button>
        </Link>
        <Button onClick={onLike} variant="success">
          Like
        </Button>
        <Button onClick={onDislike} variant="danger">
          Dislike
        </Button>
      </Card.Body>
    </Card>
  );
};

const MovieDetail = ({ match }) => {
  const [character, setCharacter] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', comment: '' });

  useEffect(() => {
    // Fetch character data
    axios.get(`/movies/${match.params.title}`).then((response) => {
      setCharacter(response.data.best_character);
    });

    // Fetch comments
    axios.get(`/comments/${match.params.title}`).then((response) => {
      setComments(response.data);
    });
  }, [match.params.title]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    axios.post(`/comments/${match.params.title}`, newComment).then(() => {
      setComments([...comments, newComment]);
      setNewComment({ name: '', comment: '' });
    });
  };

  return (
    <div>
      <h1>Movie Detail</h1>
      {character && (
        <div>
          <img
            src={require(`./public/${character.image}`).default}
            alt={character.name}
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
          <div>{character.name}</div>
          <div>{character.bio}</div>
        </div>
      )}
      <div>
        <form onSubmit={handleCommentSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={newComment.name}
            onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
            required
          />
          <br />
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={newComment.comment}
            onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
            required
          />
          <br />
          <button type="submit">Add Comment</button>
        </form>
        <div>
          {comments.map((c, index) => (
            <div key={index}>
              <strong>{c.name}:</strong> {c.comment}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [likes, setLikes] = useState({});
  const [dislikes, setDislikes] = useState({});

  const handleLike = (title) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [title]: (prevLikes[title] || 0) + 1,
    }));
  };

  const handleDislike = (title) => {
    setDislikes((prevDislikes) => ({
      ...prevDislikes,
      [title]: (prevDislikes[title] || 0) + 1,
    }));
  };

  return (
    <Router>
      <div>
        <h1>Movies</h1>
        <Route
          exact
          path="/"
          render={() => (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {moviesData.map((movie) => (
                <MovieCard
                  key={movie.title}
                  movie={movie}
                  onLike={() => handleLike(movie.title)}
                  onDislike={() => handleDislike(movie.title)}
                />
              ))}
            </div>
          )}
        />
        <Route path="/movie/:title" component={MovieDetail} />
      </div>
    </Router>
  );
};

export default App;
