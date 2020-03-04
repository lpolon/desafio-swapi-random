import React from 'react';
import PropTypes from 'prop-types';

export default function GetRandomPlanet({ onInput }) {
  return (
    <button
      className="button is-large is-warning is-centered"
      onClick={onInput}
    >
      Next
    </button>
  );
}

GetRandomPlanet.propTypes = {
  onInput: PropTypes.func.isRequired,
};
