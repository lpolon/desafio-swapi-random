import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import 'bulma-pageloader';
import './App.css';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faRebel } from '@fortawesome/free-brands-svg-icons';

import Swapi from '../../Util/Swapi';
import { getOneRandomArrayElement } from '../../Util/helper';
const planetsResource = new Swapi('planets');

export default function App() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [planets, setPlanets] = useState([]);
  const [randomPlanet, setRandomPlanet] = useState({});

  const fetchAllPlanets = async () => {
    setIsLoading(true);
    const response = await planetsResource.getAllResources();
    if (typeof response === 'string') {
      setError(response);
      setIsLoading(false);
    } else {
      const planet = getOneRandomArrayElement(response);
      setPlanets(response);
      setRandomPlanet(planet);
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    const planet = getOneRandomArrayElement(planets);
    setRandomPlanet(planet);
  };

  useEffect(() => {
    fetchAllPlanets();
    // eslint-disable-next-line
  }, []);

  console.log('oi!', randomPlanet);

  return isLoading ? (
    <div className="pageloader is-active has-background-dark">
      <div className="loader-text-flex">
        <div className="is-size-3 has-text-light">
          Restoring freedom to the galaxy...
        </div>
        <div className="icon-container">
          <FA icon={faRebel} size="4x" color="hsl(0, 0%, 96%)" />
        </div>
      </div>
    </div>
  ) : error !== null ? (
    <h1
      className="content title is-size-1 is-white has-text-danger"
      style={{ textAlign: 'center' }}
    >
      {error}
    </h1>
  ) : (
    <div className="App">
      <h1>oi!</h1>
    </div>
  );
}
