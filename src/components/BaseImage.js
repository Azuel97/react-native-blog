import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// STYLED COMPONENTS
const StyledImage = styled.Image`
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: ${props => props.radius};
  background-color: ${props => props.color};
`;

class BaseImage extends Component {
  render() {
    return <StyledImage {...this.props} />;
  }
}

BaseImage.defaultProps = {
  width: 0,
  height: 0,
  radius: 0,
  color: 'lightblue'
};

BaseImage.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  radius: PropTypes.number,
  color: PropTypes.string,
};

export default BaseImage;