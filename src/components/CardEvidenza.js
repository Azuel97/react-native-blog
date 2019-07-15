import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export default class CardEvidenza extends Component {

    articoloEvidenza() {
      return this.props.data.map((struttura) => {
        return(
          <View>
            <Image style={{width:340 , height: 180, marginTop:20,borderRadius:3}}
                source={{uri: `${struttura.image}`}}/>
            <View style={{width:340}}>
                <Text style={{color:'red',fontSize:16,fontWeight:'bold',paddingTop:5}}>{struttura.category}</Text>
                <Text style={{fontWeight:'bold',fontSize:18,paddingTop:5}} numberOfLines={2}>{struttura.title}</Text>
                <Text style={{fontSize:16,paddingTop:5}} numberOfLines={3}>{struttura.abstract}</Text>
            </View>
          </View>
        );
      });
    }

  render() {
    return (
        <View style={{marginLeft:17}}>
            {this.articoloEvidenza()}
        </View>
    );  
  }
}

CardEvidenza.propTypes = {
  data: PropTypes.array
}
 
CardEvidenza.defaultProps = {
  data: []
}