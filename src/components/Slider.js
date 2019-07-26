import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// SLIDER DI REACT
import Swiper from 'react-native-swiper';
// COMPONENTS
import BaseText from './BaseText';
// UTILS
import { width } from '../utils/constants';

const Container = styled.View`
  height: 250;
  width: ${width};
`;

const ImageSlider = styled.Image`
  flex: 1;
  background-color: #9DD6EB;
`;

const TextCategory = styled(BaseText)`
  position: absolute;
  top: 110;
  left: 10;
  right: 15;
`;

const TextTitle = styled(BaseText)`
  position: absolute;
  top: 130;
  left: 10;
  right: 15;
`;


export default class Slider extends Component {    
  sliderArticoli() {
    const {data} = this.props;
    return data.map((struttura) => {
      const {id,image,categoria,titolo} = struttura;
      return(
        <Container key={id}>
          <ImageSlider source={{uri: `${image}`}} />
          <TextCategory color={'red'} size={18} weight={'bold'} >{categoria}</TextCategory>
          <TextTitle color={'#fff'} size={18} weight={'bold'} >{titolo}</TextTitle>
        </Container>
      );
    });
  }

  render() {
    return (
      <Container>
        <Swiper horizontal={true} showsPagination={true}> 
          {this.sliderArticoli()}
        </Swiper>
      </Container>
    );
  }
}

Slider.propTypes = {
  data: PropTypes.array
}
 
Slider.defaultProps = {
  data: []
}