import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

class Scroll extends Component {

  cardArticoli() {
    return this.props.data.map((struttura) => {
      // Destrutturazione
      const {id, image, categoria, title, abstract} = struttura;
      const {navigation : { navigate }} = this.props;
      return(
        <TouchableOpacity key={id} onPress={() => navigate('DetailsScreen',{id:id,categoria:categoria})}>
          <View style={styles.mercatImmo}>
            <Image style={{width:160, height:160, backgroundColor:'lightblue',borderRadius:3}} source={{uri: `${image}`}} />
            <View style={{width:160, paddingTop:7}}>
              <Text style={{color:'red',fontWeight:'bold'}}>{categoria}</Text>
              <Text style={{fontWeight:'bold',paddingTop:3}} numberOfLines={2}>{title}</Text>
              <Text numberOfLines={3} >{abstract}</Text>
            </View>
          </View>
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

export default withNavigation(Scroll);

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