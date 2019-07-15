import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export default class CardGrandi extends Component {

  render() {
    return (
      <View style={styles.mercatImmo}>
        <TouchableOpacity>
        <Image style={{width:340 , height: 180}} source={{uri: `${this.props.image}`}}/>
        <View style={{width:340}}>
          <View style={{justifyContent: 'space-between',flex: 1,flexDirection: 'row',}}>
            <View>
              <Text style={{color:'red',fontSize:16,fontWeight:'bold',paddingTop:5}}>{this.props.categoria}</Text>
             </View>
            <View>
              <Text style={{color:'grey',fontSize:16, fontWeight:'bold',paddingTop:5}}>{this.props.publish_date}</Text>
            </View>
            </View>
              <Text style={{fontWeight:'bold',fontSize:20,paddingTop:5}} numberOfLines={2}>{this.props.title}</Text>
              <Text style={{fontSize:16,paddingTop:5}} numberOfLines={3}>{this.props.abstract}</Text>
            </View>
        </TouchableOpacity>
      </View>
    );  
  }
}

CardGrandi.propTypes = {
  categoria: PropTypes.string,
  publish_date: PropTypes.string,
  title: PropTypes.string,
  abstract: PropTypes.string,
  image: PropTypes.image
}
 
CardGrandi.defaultProps = {
    categoria: '',
    publish_date: '',
    title: '',
    abstract: '',
    image: ''
}
    
const styles = StyleSheet.create({
    mercatImmo: {
        marginLeft: 17,
        marginTop:15,  
        paddingBottom:15 
      }
});