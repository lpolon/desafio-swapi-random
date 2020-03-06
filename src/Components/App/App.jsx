import React, { useState, useEffect, useRef } from 'react';
import 'bulma/css/bulma.css';
import 'bulma-pageloader';
import './App.css';
import { useTransition, animated, config } from 'react-spring';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faRebel } from '@fortawesome/free-brands-svg-icons';

import Swapi from '../../Util/Swapi';
import { getOneRandomArrayElement } from '../../Util/helper';

import PlanetCard from '../PlanetCard/PlanetCard';
import GetRandomPlanet from '../GetRandomPlanetButton';
const planetsResource = new Swapi('planets');

export default function App() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [planets, setPlanets] = useState([]);
  const [randomPlanet, setRandomPlanet] = useState([]);

  const fetchAllPlanets = async () => {
    setIsLoading(true);
    const response = await planetsResource.getAllResources();
    if (typeof response === 'string') {
      setError(response);
      setIsLoading(false);
    } else {
      const planet = getOneRandomArrayElement(response);
      setRandomPlanet([planet]);
      setPlanets(response);
      setIsLoading(false);
    }
  };

  const handleInput = () => {
    const planet = getOneRandomArrayElement(planets);
    setRandomPlanet([planet]);
  };

  useEffect(() => {
    fetchAllPlanets();
    // eslint-disable-next-line
  }, []);

  const transitions = useTransition(randomPlanet, (planet) => planet.name, {
    from: {
      opacity: 0,
      transform: 'translate3d(100%,0,0)',
    },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: {
      opacity: 0,
      transform: 'translate3d(-100%,0,0)',
      position: 'absolute',
    },
    config: config.default,
  });

  return isLoading ? (
    <PageLoader />
  ) : error !== null ? (
    <h1
      className="content title is-size-1 is-white has-text-danger"
      style={{ textAlign: 'center' }}
    >
      {error}
    </h1>
  ) : (
    <div className="App has-background-light">
      <div>
        {transitions.map(({ item, props, key }) => {
          return (
            <animated.div key={key} style={props}>
              <PlanetCard {...item} />
            </animated.div>
          );
        })}
      </div>
      <div>
        <GetRandomPlanet onInput={handleInput} />
      </div>
    </div>
  );
}

function PageLoader() {
  return (
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
  );
}