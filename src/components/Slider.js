import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
// Importo il componente per lo slider
import Swiper from 'react-native-swiper'

// Recupero le dimensioni dello schermo
var {width} = Dimensions.get('window');

export default class Slider extends Component {    

    sliderArticoli() {
      return this.props.data.map((struttura) => {
        return(
          <View style={styles.slide1} key={struttura.id}>
            <Image style={{width:width , height: 250}}
                  source={{uri: `${struttura.image}`}} />
            <Text style={styles.cat}>{struttura.categoria}</Text>
            <Text style={styles.text}>{struttura.titolo}</Text>
          </View>
        );
      });
    }

    render() {
        return (
          // Slider
          <View style={styles.containerSlider}>
            <Swiper horizontal={true} showsPagination={true}> 
              {this.sliderArticoli()}
            </Swiper>
          </View>
        );
    }
}

Slider.propTypes = {
  data: PropTypes.array
}
 
Slider.defaultProps = {
  data: []
}

const styles = StyleSheet.create({
    containerSlider:{
      height:250,
      width: width
    },
    slide1: {
      flex:1,
      backgroundColor: '#9DD6EB'
    },
    text: {
      position: 'absolute',
      top: 130,
      left: 10,
      right: 15,
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    cat: {
      position: 'absolute',
      top: 110,
      left: 10,
      right: 15,
      color: 'red',
      fontSize: 18,
      fontWeight: 'bold',
      },
  });