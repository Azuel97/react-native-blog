import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledText = styled.Text`
  font-size: ${props => `${props.size}px`};
  color: ${props => props.color};
  font-weight: ${props => props.weight};
  padding-Top: ${props => props.paddingTop};;
`;

class BaseText extends React.Component {
  render() {
    return <StyledText {...this.props} />;
  }
}

BaseText.defaultProps = {
  size: 16,
  color: 'black',
  weight: 'normal',
  paddingTop: 0
};

BaseText.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  weight: PropTypes.string,
  paddingTop: PropTypes.number
};

export default BaseText;
