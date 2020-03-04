import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import 'bulma-pageloader';
import './App.css';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faRebel } from '@fortawesome/free-brands-svg-icons';
import Swapi from '../../Util/Swapi';
import { getOneRandomArrayElement } from '../../Util/helper';

import PlanetCard from '../PlanetCard/PlanetCard';
import GetRandomPlanet from '../GetRandomPlanetButton';
const planetsResource = new Swapi('planets');

// const fakeData = {
//   name: 'Alderaan',
//   rotation_period: '24',
//   orbital_period: '364',
//   diameter: '12500',
//   climate: 'temperate',
//   gravity: '1 standard',
//   terrain: 'grasslands, mountains',
//   surface_water: '40',
//   population: '2000000000',
//   residents: [
//     'https://swapi.co/api/people/5/',
//     'https://swapi.co/api/people/68/',
//     'https://swapi.co/api/people/81/',
//   ],
//   films: ['https://swapi.co/api/films/6/', 'https://swapi.co/api/films/1/'],
//   created: '2014-12-10T11:35:48.479000Z',
//   edited: '2014-12-20T20:58:18.420000Z',
//   url: 'https://swapi.co/api/planets/2/',
// };

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

  const handleInput = () => {
    console.log('oi')
    const planet = getOneRandomArrayElement(planets);
    setRandomPlanet(planet);
  };

  useEffect(() => {
    fetchAllPlanets();
    // eslint-disable-next-line
  }, []);

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
    <div className="App has-background-light">
      <PlanetCard {...randomPlanet} />
      <GetRandomPlanet onInput={handleInput} />
    </div>
  );
}
