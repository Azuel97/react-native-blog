import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

class CardEvidenza extends Component {

  articoloEvidenza() {
    const {data, navigation : {navigate} } = this.props;
    return data.map((struttura) => {
      const {id, image, category, title, abstract} = struttura;
      return(
        <TouchableOpacity key={id} onPress={() => navigate('DetailsScreen',{id,categoria:category})}>
          <Image style={{width:340 , height: 180, marginTop:20,borderRadius:3}} source={{uri: `${image}`}}/>
          <View style={{width:340}}>
            <Text style={{color:'red',fontSize:16,fontWeight:'bold',paddingTop:5}}>{category}</Text>
            <Text style={{fontWeight:'bold',fontSize:18,paddingTop:5}} numberOfLines={2}>{title}</Text>
            <Text style={{fontSize:16,paddingTop:5}} numberOfLines={3}>{abstract}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  }

  render() {
    return (
      this.articoloEvidenza()
    );  
  }
}

CardEvidenza.propTypes = {
  data: PropTypes.array
}
 
CardEvidenza.defaultProps = {
  data: []
}

export default withNavigation(CardEvidenza);