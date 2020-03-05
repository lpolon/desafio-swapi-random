import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function GetRandomPlanet({ onInput }) {
  const handleArrowRightInput = ({ key }) => {
    if (key !== 'ArrowRight') return;
    onInput();
  };
  useEffect(() => {
    document.addEventListener('keydown', handleArrowRightInput);
    return () => {
      document.removeEventListener('keydown', handleArrowRightInput);
    };
  });
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
