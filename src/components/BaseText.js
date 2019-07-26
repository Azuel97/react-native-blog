import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// STYLED COMPONENTS
const StyledText = styled.Text`
  font-size: ${props => `${props.size}px`};
  color: ${props => props.color};
  font-weight: ${props => props.weight};
  padding-top: ${props => props.paddingTop};
  padding-bottom: ${props => props.paddingBottom};
  padding-left: ${props => props.paddingLeft};
  padding-right: ${props => props.paddingRight};;
`;

class BaseText extends Component {
  render() {
    return <StyledText {...this.props} />;
  }
}

BaseText.defaultProps = {
  size: 16,
  color: 'black',
  weight: 'normal',
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,
};

BaseText.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  weight: PropTypes.string,
  paddingTop: PropTypes.number,
  paddingBottom: PropTypes.number,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
};

export default BaseText;