import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// STYLED COMPONENTS
const StyledSpinner = styled.ActivityIndicator`
  flex: 1;
  justify-content: center;
  alignItems: center;
  height: 80;
`;

const Spinner = ({ size, color }) => (
  <StyledSpinner
    size={size}
    color={color}
  />
);

Spinner.defaultProps = {
  size: 'large',
  color: 'red',
};

Spinner.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

export default Spinner;