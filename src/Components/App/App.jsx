import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import 'bulma-pageloader';
import './App.css';

import Swapi from '../../Util/Swapi';
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

  const getOneRandomArrayElement = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const getRandomPlanet = () => {
    const planet = getOneRandomArrayElement(planets);
    setRandomPlanet(planet);
  };

  useEffect(() => {
    fetchAllPlanets();
    // eslint-disable-next-line
  }, []);

  console.log(randomPlanet);

  return isLoading ? (
    <div class="pageloader is-dark is-active">
      <span class="title is-size-1">Peraê! buscando os planetas ;)</span>
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
