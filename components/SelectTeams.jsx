import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import ShowProbs from './ShowProbs';

let index;

const SelectTeams = ({ teams }) => {
  const [home, setHome] = useState('');
  const [away, setAway] = useState('');
  const [showProbs, setShowProbs] = useState(false); 
  console.log(home, away);
  
  function handleSubmit(event) {
    event.preventDefault();
    setShowProbs(true);
  }

  return (
    <div>
      <form className={styles.formblock} onSubmit={handleSubmit}>
        <div className={styles.form}>
          <div>
            <label className={styles.label}> Home</label>
            <select className={styles.select} name="home" value={home} onChange={(e) => setHome(e.target.value)}>
              {teams.map(({ name }, index) => (
                <option key={index} value={index}>{name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={styles.label}> Away</label>
            <select className={styles.select} name="away" value={away} onChange={(e) => setAway(e.target.value)}>
              {teams.map(({ name }, index) => (
                <option key={index} value={index}>{name}</option>
              ))}
            </select>
          </div>
        </div>
        <input className={styles.btn} type="submit" value="Predict"/>
      </form>
      {showProbs && <ShowProbs home={home} away={away} />}
    </div>
  )
}

export default SelectTeams
