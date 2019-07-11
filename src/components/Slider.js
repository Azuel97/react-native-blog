import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
// Importo il componente per lo slider
import Swiper from 'react-native-swiper'

// Recupero le dimensioni dello schermo
var {height, width} = Dimensions.get('window');

export default class Slider extends Component {    

    render() {
        return (
              // Slider che contiene al suo intero tre immagini
              <View style={styles.containerSlider}>
                <Swiper horizontal={true} showsPagination={true}>
                  <View style={styles.slide1}>
                    <Image style={{width:width , height: 250}}
                        source={{uri: `${this.props.image1}`}} />
                      <Text style={styles.cat}>{this.props.categoria1}</Text>
                      <Text style={styles.text}>{this.props.titolo1}</Text>
                  </View>
                  <View style={styles.slide2}>
                    <Image style={{width:width , height: 250}}
                        source={{uri: `${this.props.image2}`}} />
                      <Text style={styles.cat}>{this.props.categoria2}</Text>
                      <Text style={styles.text}>{this.props.titolo2}</Text>
                  </View>
                  <View style={styles.slide3}>
                    <Image style={{width:width , height: 250}}
                        source={{uri: `${this.props.image3}`}} />
                      <Text style={styles.cat}>{this.props.categoria3}</Text>
                      <Text style={styles.text}>{this.props.titolo3}</Text>
                    </View>
                </Swiper>
              </View>
        );
    }
}


Slider.propTypes =
{
  image1: PropTypes.string,
  titolo1: PropTypes.string,
  categoria1: PropTypes.string,
  image2: PropTypes.string,
  titolo2: PropTypes.string,
  categoria2: PropTypes.string,
  image3: PropTypes.string,
  titolo3: PropTypes.string,
  categoria3: PropTypes.string,
}
 
Slider.defaultProps =
{
  image1: '',
  titolo1: '',
  categoria1: '',
  image2: '',
  titolo2: '',
  categoria2: '',
  image3: '',
  titolo3: '',
  categoria3: '',
}

 
const styles = StyleSheet.create({
    containerSlider:{
      height:250,
      width: width
    },
    wrapper: {
    },
    slide1: {
      flex:1,
      backgroundColor: '#9DD6EB'
    },
    slide2: {
      flex:1,
      backgroundColor: '#97CAE5'
    },
    slide3: {
      flex:1,
      backgroundColor: '#92BBD9'
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