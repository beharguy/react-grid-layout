import React from 'react';
import PropTypes from 'prop-types';

export const Header = ({ match: { params } }) => {
  return <h2>Configure view {params.id}</h2>;
};

Header.propTypes = {
  match: PropTypes.object.isRequired
};

export default Header;