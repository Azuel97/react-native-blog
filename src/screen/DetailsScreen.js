import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Animated } from 'react-native';

const HEADER_MIN_HEIGHT = 40;
const HEADER_MAX_HEIGHT = 250;


export default class DetailsScreen extends Component {

  constructor() {
    super();
    this.scrollYAnimatedValue = new Animated.Value(0);
  }

  render() {

    const headerHeight = this.scrollYAnimatedValue.interpolate(
      {
        inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp'
      });

    // const headerBackgroundColor = this.scrollYAnimatedValue.interpolate(
    //   {
    //     inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
    //     outputRange: ['#e91e63', '#1DA1F2'],
    //     extrapolate: 'clamp'
    //   });



    const { navigation } = this.props;
    const image = navigation.getParam('image', '');
    const title = navigation.getParam('title', '');
    const pubblicazione = navigation.getParam('pubblicazione', '');
    const desc = navigation.getParam('desc', '');
    const desc1 = navigation.getParam('desc1', '');
    const categoria = navigation.getParam('categoria', '');
    const titoloBlocco1 = navigation.getParam('titoloBlock1', '');
    const descrizioneBlocco1 = navigation.getParam('descrizioneBlock1', '');
    const titoloBlocco2 = navigation.getParam('titoloBlock2', '');
    const descrizioneBlocco2 = navigation.getParam('descrizioneBlock2', '');

    return (
      <View style={styles.container}> 
        <ScrollView contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }]
        )} > 
          {/* <Image style={{width:375 , height: 250,borderRadius:10}} source={{uri: `${image}`}}/>
          <Text style={{fontWeight:'bold',fontSize:16,color:'red',position:'absolute',top:70,left:20}} >{categoria}</Text>
          <Text style={{fontWeight:'bold',fontSize:18,color:'white',position:'absolute',top:90,left:20,paddingRight:30}} >{title}</Text> */}
          <View style={{paddingLeft:15,paddingRight:15,paddingTop:20}}>
            <Text style={{fontWeight:'bold',fontSize:20,paddingTop:5}} >{desc1}</Text>
            <Text style={{fontWeight:'bold',fontSize:16,paddingTop:20}} >{titoloBlocco1}</Text>
            <Text style={{fontSize:16,paddingTop:15}} >{descrizioneBlocco1}</Text>
            <Text style={{fontWeight:'bold',fontSize:18,paddingTop:15}} >{titoloBlocco2}</Text>
            <Text style={{fontSize:16,paddingTop:15}} >{descrizioneBlocco2}</Text>
          </View>
        </ScrollView>

        {/* backgroundColor: headerBackgroundColor */}
        <Animated.View style={[styles.animatedHeaderContainer, { height: headerHeight }]}>
            {/* <Text style={styles.headerText}>Animated Header</Text> */}
            <Image style={{width:375 , height: HEADER_MAX_HEIGHT,borderRadius:8}} source={{uri: `${image}`}}/>
            <Text style={{fontWeight:'bold',fontSize:16,color:'red',position:'absolute',top:45,left:20}} >{categoria}</Text>
            <Text style={{fontWeight:'bold',fontSize:18,color:'white',position:'absolute',top:65,left:20,paddingRight:30}} >{title}</Text>
        </Animated.View>      

      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom:30
  },
  animatedHeaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    paddingTop:20
  },
});