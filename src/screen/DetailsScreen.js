import React, { Component } from 'react';
import { StyleSheet, ScrollView, Animated } from 'react-native';
import styled from 'styled-components';
// STORE
import { ArticoliMercatoController, ArticoliCreditoController, ArticoliCuriositaController } from '../store/controller'
import { ArticoliMercatoModel, ArticoliCreditoModel, ArticoliCuriositaModel } from '../store/models';
// UTILS
import { width, height } from '../utils/constants';
// COMPONENTS
import Details from '../components/Details';
import BaseText from '../components/BaseText';
import BaseImage from '../components/BaseImage';
import Spinner from '../components/Spinner';

// STYLED COMPONENTS
const CategoryImage = styled(BaseText)`
  position: absolute;
  top: 45;
  left: 20;
`;

const TitleImage = styled(BaseText)`
  position: absolute;
  top: 65;
  left: 20;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  margin-bottom: 30;
`;

const ContainerDescription = styled.View`
  padding-left: 15;
  padding-right: 15;
  padding-top: 20;
`;

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
      dettaglioArticolo: [],
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
      dettaglioArticolo: service.findDettaglio(id),
      image2: service.findImage2ByID(id),
      titolo: service.findTitoloByID(id),
      categoriaMer: categoria,
    });
  }

  render() {
    const headerHeight = this.scrollYAnimatedValue.interpolate({
      inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    });

    const {loading, image2, titolo, categoriaMer, dettaglioArticolo} = this.state;
    if(loading){
      return <Spinner />
    }
    return (
      <Container> 
        <ScrollView contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }]
        )} > 
          <ContainerDescription>
            <Details data={dettaglioArticolo} />
          </ContainerDescription>
        </ScrollView>

        <Animated.View style={[styles.animatedHeaderContainer, { height: headerHeight }]}>
          <BaseImage width={width} height={HEADER_MAX_HEIGHT} radius={8} source={{uri: `${image2}`}}/>
          <CategoryImage weight={'bold'} color={'red'}>{categoriaMer}</CategoryImage>
          <TitleImage weight={'bold'} size={18} color={'white'} paddingRight={30}>{titolo}</TitleImage>
        </Animated.View>      

      </Container>
    );
  }
}
 
const styles = StyleSheet.create({
  animatedHeaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  }
});