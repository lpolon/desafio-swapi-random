import React from 'react';
import PropTypes from 'prop-types';

import './PlanetCard.css';

export default function PlanetCard({
  films,
  name,
  climate,
  terrain,
  population,
}) {
  let numberOfFilmsString;
  if (films.length === 0) {
    numberOfFilmsString = `not featured in any films`;
  } else {
    numberOfFilmsString = `featured in ${films.length} films`;
  }
  const renderRows = (props) => {
    return Object.keys(props).map((key, i) => {
      return (
        <tr key={i} className>
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
      <div className="card-content">
        <div className="content">
          <table className="table is-hoverable is-fullwidth">
            <tbody className="table-body">
              {renderRows({ climate, terrain, population })}
            </tbody>
          </table>
          <br />
          <span className="is-italic">
          {numberOfFilmsString}
          </span>
        </div>
      </div>
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
