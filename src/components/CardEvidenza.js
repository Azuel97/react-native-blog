import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// COMPONENTS
import BaseText from './BaseText';

const CardImage = styled.Image`
  width: 340px;
  height: 180px;
  margin-top: 20;
  border-radius: 3;
`;

const Container = styled.View`
  width: 340;
`;

const CardEvidenza = ({ data, onPress }) => {
  return data.map((struttura) => {
    const {id, image, category, title, abstract} = struttura;
    return(
      <TouchableOpacity key={id} onPress={onPress}>
        <CardImage source={{uri: `${image}`}}/>
        <Container>
          <BaseText color={'red'} weight={'bold'} paddingTop={5}>{category}</BaseText>
          <BaseText size={18} weight={'bold'} paddingTop={5} numberOfLines={2}>{title}</BaseText>
          <BaseText paddingTop={5} numberOfLines={3}>{abstract}</BaseText>
        </Container>
      </TouchableOpacity>
    );
  });
};

CardEvidenza.propTypes = {
  data: PropTypes.array,
  onPress : PropTypes.func,
}
 
CardEvidenza.defaultProps = {
  data: [],
  onPress: () => {},
}

export default (CardEvidenza);