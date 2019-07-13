import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export default class Scroll extends Component {

    cardArticoli() {
        return this.props.data.map((struttura) => {
          return(
            <TouchableOpacity key={struttura.id}>
              <View style={styles.mercatImmo}>
                <Image style={{width:160 , height: 160, backgroundColor: 'lightblue',borderRadius:3}}
                    source={{uri: `${struttura.image}`}} />
                <View style={{width:160, paddingTop:7}}>
                    <Text style={{color:'red',fontWeight:'bold'}}>{struttura.categoria}</Text>
                    <Text style={{fontWeight:'bold',paddingTop:3}} numberOfLines={2}>{struttura.title}</Text>
                    <Text numberOfLines={3} >{struttura.abstract}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        });
    }

  render() {
    return (
      // Scroll orizzontale degli articoli
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
    
const styles = StyleSheet.create({
    mercatImmo: {
        marginLeft: 20,
        marginTop:15
    }
});