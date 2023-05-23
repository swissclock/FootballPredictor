import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import { calculateProbabilities } from 'soccer-predictor/lib/index.js';

const ShowProbs = ({ teams, home, away }) => {
  const [probs, setProbs] = useState([]);

  useEffect(() => {
    setProbs(calculateProbabilities[teams[home]],[teams[away]]);
  }, [home, away]);

  return (
    <div>
      <h2 className={styles.description}>
        Prediction for {home} vs. {away}
      </h2>
      <div className={styles.card}>
        <p>
          {probs.result &&
            probs.result.map((result, index) => <span key={index}>{result}</span>)}
        </p>
      </div>
    </div>
  );
};

export default ShowProbs;
