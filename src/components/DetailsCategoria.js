import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// COMPONENTS
import BaseText from './BaseText';
import BaseImage from './BaseImage';
// UTILS
import { width } from '../utils/constants';

// STYLED COMPONENTS
const TextCategory = styled(BaseText)`
  position: absolute;
  top: 95;
  left: 10;
  right: 15;
`;

const TextTitle = styled(BaseText)`
  position: absolute;
  top: 130;
  left: 10;
  right: 15;
`;


const DetailsCategoria = ({ data }) => {
  return data.map((struttura) => {
    const {id, title, abstract, image  } = struttura;
    return(
        <View key={id}>
          <BaseImage  width={width} height={200} source={{uri: `${image}`}} />
          <TextCategory size={26} weight={'bold'} color={'#fff'}>{title}</TextCategory>
          <TextTitle color={'#fff'} weight={'bold'} >{abstract}</TextTitle>
        </View>
    );
  });
};

DetailsCategoria.propTypes = {
  data: PropTypes.array,
}
 
DetailsCategoria.defaultProps = {
  data: [],
}

export default DetailsCategoria;