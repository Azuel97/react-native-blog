import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// COMPONENTS
import BaseText from './BaseText';


const Details = ({ data }) => {
  return data.map((struttura) => {
    const {id, abstract, TitleBlocks1, DescriptionBlocks1, TitleBlocks2, DescriptionBlocks2 } = struttura;
    return(
        <View key={id}>
            <BaseText weight={'bold'} size={20} paddingTop={5}>{abstract}</BaseText>
            <BaseText weight={'bold'} paddingTop={20}>{TitleBlocks1}</BaseText>
            <BaseText paddingTop={15}>{DescriptionBlocks1}</BaseText>
            <BaseText weight={'bold'} size={18} paddingTop={15}>{TitleBlocks2}</BaseText>
            <BaseText paddingTop={15}>{DescriptionBlocks2}</BaseText>
        </View>
    );
  });
};

Details.propTypes = {
  data: PropTypes.array,
}
 
Details.defaultProps = {
  data: [],
}

export default (Details);