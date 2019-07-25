import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// COMPONENTS
import BaseText from './BaseText';

const Container = styled.View`
  margin-left: 17;
  margin-top: 15;
  padding-bottom: 15;
`;

const CardImage = styled.Image`
  width: 340;
  height: 180;
`;

const ContainerDescrizione = styled.View`
  width: 340;
`;

const ContainerInterno = styled.View`
  justify-content: space-between;
  flex: 1;
  flex-direction: row;
`;

const CardGrandi = ({ onPress, image, categoria, publish_date, title, abstract }) => {
  return (
    <Container>
      <TouchableOpacity onPress={onPress}>
        <CardImage source={{uri: `${image}`}}/>
        <ContainerDescrizione>
          <ContainerInterno>   
            <BaseText color={'red'} weight={'bold'} paddingTop={5}>{categoria}</BaseText>
            <BaseText color={'grey'} weight={'bold'} paddingTop={5}>{publish_date}</BaseText>
          </ContainerInterno>
          <BaseText weight={'bold'} size={20} paddingTop={5} numberOfLines={2}>{title}</BaseText>
          <BaseText paddingTop={5} numberOfLines={3}>{abstract}</BaseText>
        </ContainerDescrizione>
      </TouchableOpacity>
    </Container>
  ); 
}

CardGrandi.propTypes = {
  categoria: PropTypes.string,
  publish_date: PropTypes.string,
  title: PropTypes.string,
  abstract: PropTypes.string,
  image: PropTypes.image,
  onPress: PropTypes.func
}
 
CardGrandi.defaultProps = {
  categoria: '',
  publish_date: '',
  title: '',
  abstract: '',
  image: '',
  onPress: () => {},
}

export default (CardGrandi);