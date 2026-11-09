import React, { useState, useEffect } from 'react';

function App() {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(true);

  // Function to fetch a single programming joke from the API
  const fetchJoke = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://v2.jokeapi.dev/joke/Programming?type=single'
      );

      if (response && response.ok === false) {
        throw new Error('Failed to fetch joke');
      }

      const data = await response.json();

      if (!data || typeof data.joke !== 'string' || !data.joke.trim()) {
        throw new Error('Invalid joke response');
      }

      setJoke(data.joke);
    } catch (error) {
      console.error('Error fetching joke:', error);
      setJoke('Failed to load joke. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch joke when the component mounts
  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Programming Joke Generator</h1>

      <p>{loading ? 'Loading...' : joke}</p>

      <button onClick={fetchJoke} disabled={loading}>
        Get a New Joke
      </button>
    </div>
  );
}

export default App;