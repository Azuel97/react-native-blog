import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Animated, ActivityIndicator } from 'react-native';
// STORE
import { ArticoliMercatoController, ArticoliCreditoController, ArticoliCuriositaController } from '../store/controller'
import { ArticoliMercatoModel, ArticoliCreditoModel, ArticoliCuriositaModel } from '../store/models';
// UTILS
import { width, height } from '../utils/constants';

const HEADER_MIN_HEIGHT = 40;
const HEADER_MAX_HEIGHT = 250;


export default class DetailsScreen extends Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      image2: '',
      titolo: '',
      categoriaMer: '',
      abstract: '',
      TitleBlocks1: '',
      TitleBlocks2: '',
      DescriptionBlocks1: '',
      DescriptionBlocks2: ''
    }
    this.scrollYAnimatedValue = new Animated.Value(0);
    this.recuperoStruttura = this.recuperoStruttura.bind(this);
  }

  async componentDidMount() {
    try {
      const { navigation : {getParam} } = this.props;
      const id =  getParam('id', '');
      const categoria =  getParam('categoria', '');
      if(categoria === 'Mercato Immobiliare'){
        this.recuperoStruttura(ArticoliMercatoController, id, categoria);
      }else if(categoria === 'Credito'){
        this.recuperoStruttura(ArticoliCreditoController, id, categoria);
      }else if(categoria === 'Curiosita'){
        this.recuperoStruttura(ArticoliCuriositaController, id, categoria);
      }
    }catch(error) {
      console.error(error);
    };
    this.setState({
      loading: false
    });
  }

  recuperoStruttura(service, id, categoria){
    this.setState({
      image2: service.findImage2ByID(id),
      titolo: service.findTitoloByID(id),
      TitleBlocks1: service.findTitleBlocks1ByID(id),
      TitleBlocks2: service.findTitleBlocks2ByID(id),
      DescriptionBlocks1: service.findDescriptionBlocks1ByID(id),
      DescriptionBlocks2: service.findDescriptionBlocks2ByID(id),
      abstract: service.findabstract2ByID(id),
      categoriaMer: categoria
    });
  }

  render() {
    const headerHeight = this.scrollYAnimatedValue.interpolate({
      inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    });

    const {loading, image2, titolo, categoriaMer, abstract, TitleBlocks1, TitleBlocks2, DescriptionBlocks1, DescriptionBlocks2} = this.state;
    if(loading){
      <ActivityIndicator style={styles.activityIndicator} color = 'red' size = 'large' />
    }
    return (
      <View style={styles.container}> 
        <ScrollView contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }]
        )} > 
          <View style={{paddingLeft:15,paddingRight:15,paddingTop:20}}>
            <Text style={{fontWeight:'bold',fontSize:20,paddingTop:5}} >{abstract}</Text>
            <Text style={{fontWeight:'bold',fontSize:16,paddingTop:20}} >{TitleBlocks1}</Text>
            <Text style={{fontSize:16,paddingTop:15}} >{DescriptionBlocks1}</Text>
            <Text style={{fontWeight:'bold',fontSize:18,paddingTop:15}} >{TitleBlocks2}</Text>
            <Text style={{fontSize:16,paddingTop:15}} >{DescriptionBlocks2}</Text>
          </View>
        </ScrollView>

        <Animated.View style={[styles.animatedHeaderContainer, { height: headerHeight }]}>
            <Image style={{width:width , height: HEADER_MAX_HEIGHT,borderRadius:8}} source={{uri: `${image2}`}}/>
            <Text style={{fontWeight:'bold',fontSize:16,color:'red',position:'absolute',top:45,left:20}} >{categoriaMer}</Text>
            <Text style={{fontWeight:'bold',fontSize:18,color:'white',position:'absolute',top:65,left:20,paddingRight:30}} >{titolo}</Text>
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
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
 }
});