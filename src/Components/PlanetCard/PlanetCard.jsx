import React from 'react';
import PropTypes from 'prop-types';

import './PlanetCard.css';

export default function PlanetCard({
  films = [],
  name,
  climate,
  terrain,
  population,
}) {
  let numberOfFilmsString;
  if (films.length === 0) {
    numberOfFilmsString = `not featured in any films`;
  } else if (films.length === 1) {
    numberOfFilmsString = `featured in ${films.length} film`;
  } else {
    numberOfFilmsString = `featured in ${films.length} films`;
  }
  const renderRows = (props) => {
    return Object.keys(props).map((key, i) => {
      return (
        <tr key={i}>
          <th className="has-text-right is-capitalized has-text-weight-bold">
            {key}:
          </th>
          <td>{props[key]}</td>
        </tr>
      );
    });
  };
  return (
    <div className="card PlanetCard">
      <header className="card-header">
        <p className="card-header-title title is-centered">{name}</p>
      </header>
      <div className="content">
        <div className="card-content">
          <table className="table is-hoverable is-fullwidth">
            <tbody className="table-body">
              {renderRows({ climate, terrain, population })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="is-italic films-container">{numberOfFilmsString}</div>
    </div>
  );
}

PlanetCard.propTypes = {
  name: PropTypes.string.isRequired,
  population: PropTypes.string.isRequired,
  climate: PropTypes.string.isRequired,
  terrain: PropTypes.string.isRequired,
  films: PropTypes.array.isRequired,
};
