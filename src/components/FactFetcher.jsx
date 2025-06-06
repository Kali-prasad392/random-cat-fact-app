import React, { useState } from 'react';
import styles from '../styles/FactFetcher.module.css';

const FactFetcher = () => {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getFact = async () => {
    try {
      setLoading(true);
      setError('');
      setFact('');
      const response = await fetch('https://catfact.ninja/fact');
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      setFact(data.fact);
    } catch (err) {
      setError('Oops! Could not fetch fact. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🐾 Random Cat Fact</h1>
      <button className={styles.button} onClick={getFact} disabled={loading}>
        {loading ? 'Fetching...' : 'Get Random Fact'}
      </button>
      {fact && <p className={styles.fact}>"{fact}"</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default FactFetcher;
