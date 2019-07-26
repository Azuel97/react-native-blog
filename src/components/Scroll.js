import React, { Component } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withNavigation } from 'react-navigation';
// COMPONENTS
import BaseText from './BaseText';
import BaseImage from './BaseImage';

// STYLED COMPONENTS
const ContainerCard = styled.View`
  margin-left: 20;
  margin-top: 15;
`;

const ContainerDescription = styled.View`
  width: 160; 
  padding-top: 7;
`;

class Scroll extends Component {

  cardArticoli() {
    const {data, navigation : { navigate }} = this.props;
    return data.map((struttura) => {
      const {id, image, categoria, title, abstract} = struttura;
      return(
        <TouchableOpacity key={id} onPress={() => navigate('DetailsScreen',{id,categoria})}>
          <ContainerCard>
            <BaseImage width={160} height={160} radius={3} source={{uri: `${image}`}} />
            <ContainerDescription>
              <BaseText color={'red'} weight={'bold'}>{categoria}</BaseText>
              <BaseText weight={'bold'} paddingTop={3} numberOfLines={2}>{title}</BaseText>
              <BaseText size={14} numberOfLines={3} >{abstract}</BaseText>
            </ContainerDescription>
          </ContainerCard>
        </TouchableOpacity>
      );
    });
  }

  render() {
    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {this.cardArticoli()}
      </ScrollView>
    );  
  }
}

Scroll.propTypes = {
  data: PropTypes.array
}
 
Scroll.defaultProps = {
  data: []
}

export default withNavigation(Scroll);