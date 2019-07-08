import React, { Component } from 'react';
import { StyleSheet, Platform, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export default class Scroll extends Component {

  render() {
    return (
      // Scroll orizzontale di tre card
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity onPress={this.props.onPress}>
            <View style={styles.mercatImmo}>
                <Image style={{width:160 , height: 160, backgroundColor: 'lightblue'}}
                    source={{uri: `${this.props.image1}`}} />
                <View style={{width:160, paddingTop:7}}>
                    <Text style={{fontWeight:'bold'}} numberOfLines={2}>{this.props.titolo1}</Text>
                    <Text numberOfLines={3} >{this.props.abstract1}</Text>
                </View>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.onPress1}>
            <View style={styles.mercatImmo}>
                <Image style={{width:160 , height: 160, backgroundColor: 'lightblue'}}
                    source={{uri: `${this.props.image2}`}} />
                <View style={{width:160, paddingTop:7}}>
                    <Text style={{fontWeight:'bold'}} numberOfLines={2}>{this.props.titolo2}</Text>
                    <Text numberOfLines={3} >{this.props.abstract2}</Text>
                </View>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.onPress2}>
            <View style={styles.mercatImmo}>
                <Image style={{width:160 , height: 160, backgroundColor: 'lightblue'}}
                    source={{uri: `${this.props.image3}`}} />
                <View style={{width:160, paddingTop:7}}>
                    <Text style={{fontWeight:'bold'}} numberOfLines={2}>{this.props.titolo3}</Text>
                    <Text numberOfLines={3} >{this.props.abstract3}</Text>
                </View>
            </View>
        </TouchableOpacity>
      </ScrollView>
    );  
  }
}


Scroll.propTypes =
{
  image1: PropTypes.string,
  titolo1: PropTypes.string,
  abstract1: PropTypes.string,
  image2: PropTypes.string,
  titolo2: PropTypes.string,
  abstract2: PropTypes.string,
  image3: PropTypes.string,
  titolo3: PropTypes.string,
  abstract3: PropTypes.string,
}
 
Scroll.defaultProps =
{
  image1: '',
  titolo1: '',
  abstract1: '',
  image2: '',
  titolo2: '',
  abstract2: '',
  image3: '',
  titolo3: '',
  abstract3: ''
}
    
const styles = StyleSheet.create({
    mercatImmo: {
        marginLeft: 20,
        marginTop:15   
    }
});