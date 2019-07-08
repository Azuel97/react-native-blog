import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
// Import DB
import Database from '../store/index'
import ArticoliModel from '../store/models/ArticoliModel'
import ArticoliService from '../store/controller/ArticoliController'
import ArticoliMercatoModel from '../store/models/ArticoliMercatoModel'
import ArticoliMercatoService from '../store/controller/ArticoliMercatoController'
import ArticoliCreditoModel from '../store/models/ArticoliCreditoModel'
import ArticoliCreditoService from '../store/controller/ArticoliCreditoController'
import ArticoliCuriositaModel from '../store/models/ArticoliCuriositaModel'
import ArticoliCuriositaService from '../store/controller/ArticoliCuriositaController'
// Importo i miei componenti
import Slider from '../components/Slider'
import Scroll from '../components/Scroll'

// Disabilito l'uscita dei messaggi di warning
console.disableYellowBox = true;

export default class Home extends Component {

    // Setto lo state che conterrà i dati da visualizzare nella lista
    constructor(props) {
        super(props);
        this.state = {
          sliderArticles: [],
          articoliMercato: [],
          articoliCredito: [],
          articoliCuriosita: []
        };
    }

    componentDidMount(){
        articoliTrovati = ArticoliService.findAllArticle().toString()
        if(articoliTrovati === ''){
            console.log('Eseguo il FETCH')
            return fetch('https://blog.remax.sdch.develondigital.com/api/v1/pages')
            .then((response) => response.json())
            .then((responseJson) => {
                this.state.sliderArticles = responseJson.page.highlighted_articles
                this.state.articoliMercato = responseJson.page.featured_categories[0].articles
                this.state.articoliCredito = responseJson.page.featured_categories[1].articles
                this.state.articoliCuriosita = responseJson.page.featured_categories[2].articles
                count = this.state.sliderArticles.length
                countMer = this.state.articoliMercato.length
                countCre = this.state.articoliCredito.length
                countCur = this.state.articoliCuriosita.length
                for(let i=0; i<count; i++){
                    ArticoliService.saveArticoliSlider(new ArticoliModel(this.state.sliderArticles[i].id,this.state.sliderArticles[i].title,this.state.sliderArticles[i].image_complete_url,this.state.sliderArticles[i].category.name));
                }
                for(let i=0; i<countMer; i++){
                    ArticoliMercatoService.saveArticoliMercato(new ArticoliMercatoModel(this.state.articoliMercato[i].id,this.state.articoliMercato[i].title,this.state.articoliMercato[i].abstract,this.state.articoliMercato[i].thumbnail_complete_url,this.state.articoliMercato[i].publish_date))
                }
                for(let i=0; i<countCre; i++){
                    ArticoliCreditoService.saveArticoliCredito(new ArticoliCreditoModel(this.state.articoliCredito[i].id,this.state.articoliCredito[i].title,this.state.articoliCredito[i].abstract,this.state.articoliCredito[i].thumbnail_complete_url,this.state.articoliCredito[i].publish_date))
                }
                for(let i=0; i<countCur; i++){
                    ArticoliCuriositaService.saveArticoliCuriosita(new ArticoliCuriositaModel(this.state.articoliCuriosita[i].id,this.state.articoliCuriosita[i].title,this.state.articoliCuriosita[i].abstract,this.state.articoliCuriosita[i].thumbnail_complete_url,this.state.articoliCuriosita[i].publish_date))
                }
            })
            .catch((error) => {
                console.error(error);
            });
        }else{
            console.log('No FETCH')
        }
    }


    render() {

      // Articoli Slider
      articoliSlider = []
      articoliSlider = ArticoliService.findLastTreArticoli()

      // Mercato Immobiliare
      articoliMercato = []
      articoliMercato = ArticoliMercatoService.findLastTreArticoli()

      // Credito
      articoliCredito = []
      articoliCredito = ArticoliCreditoService.findLastTreArticoli()

      // Curiosità
      articoliCuriosita = []
      articoliCuriosita = ArticoliCuriositaService.findLastTreArticoli()

        return (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.containerSlider}>
                <Slider image1={articoliSlider[0].image} titolo1={articoliSlider[0].titolo} categoria1={articoliSlider[0].categoria} image2={articoliSlider[1].image} titolo2={articoliSlider[1].titolo} categoria2={articoliSlider[1].categoria} image3={articoliSlider[2].image} titolo3={articoliSlider[2].titolo} categoria3={articoliSlider[2].categoria} />
              </View>
              <View style={styles.mercatoImmobiliare}>
                <Text style={{fontSize:20,fontWeight:'bold',marginLeft:10}}>Mercato Immobiliare</Text>
                <Scroll image1={articoliMercato[0].image} titolo1={articoliMercato[0].title} abstract1={articoliMercato[0].abstract} image2={articoliMercato[1].image} titolo2={articoliMercato[1].title} abstract2={articoliMercato[1].abstract} image3={articoliMercato[2].image} titolo3={articoliMercato[2].title} abstract3={articoliMercato[2].abstract} onPress={ () => this.props.navigation.navigate('DetailsScreen', { categoria: 'Mercato Immobiliare',title: articoliMercato[0].title ,desc1: articoliMercato[0].abstract, image: articoliMercato[0].image2,  titoloBlock1: articoliMercato[0].TitleBlocks1,descrizioneBlock1: articoliMercato[0].DescriptionBlocks1, titoloBlock2: articoliMercato[0].TitleBlocks2,descrizioneBlock2: articoliMercato[0].DescriptionBlocks2 }) } onPress1={ () => this.props.navigation.navigate('DetailsScreen', { categoria: 'Mercato Immobiliare',title: articoliMercato[1].title ,desc1: articoliMercato[1].abstract, image: articoliMercato[1].image2,  titoloBlock1: articoliMercato[1].TitleBlocks1,descrizioneBlock1: articoliMercato[1].DescriptionBlocks1, titoloBlock2: articoliMercato[1].TitleBlocks2,descrizioneBlock2: articoliMercato[1].DescriptionBlocks2 }) } onPress2={ () => this.props.navigation.navigate('DetailsScreen', { categoria: 'Mercato Immobiliare',title: articoliMercato[2].title ,desc1: articoliMercato[2].abstract, image: articoliMercato[2].image2,  titoloBlock1: articoliMercato[2].TitleBlocks1,descrizioneBlock1: articoliMercato[2].DescriptionBlocks1, titoloBlock2: articoliMercato[2].TitleBlocks2,descrizioneBlock2: articoliMercato[2].DescriptionBlocks2 }) }  />
              </View>
              <View style={styles.credito}>
                <Text style={{fontSize:20,fontWeight:'bold',marginLeft:10}}>Credito</Text>
                <Scroll image1={articoliCredito[0].image} titolo1={articoliCredito[0].title} abstract1={articoliCredito[0].abstract} image2={articoliCredito[1].image} titolo2={articoliCredito[1].title} abstract2={articoliCredito[1].abstract} image3={articoliCredito[0].image} titolo3={articoliCredito[0].title} abstract3={articoliCredito[0].abstract} onPress={ () => this.props.navigation.navigate('DetailsScreen', { categoria: 'Credito',title: articoliCredito[0].title ,desc1: articoliCredito[0].abstract, image: articoliCredito[0].image2,  titoloBlock1: articoliCredito[0].TitleBlocks1,descrizioneBlock1: articoliCredito[0].DescriptionBlocks1, titoloBlock2: articoliCredito[0].TitleBlocks2,descrizioneBlock2: articoliCredito[0].DescriptionBlocks2 }) } onPress1={ () => this.props.navigation.navigate('DetailsScreen', { categoria: 'Credito',title: articoliCredito[1].title ,desc1: articoliCredito[1].abstract, image: articoliCredito[1].image2,  titoloBlock1: articoliCredito[1].TitleBlocks1,descrizioneBlock1: articoliCredito[1].DescriptionBlocks1, titoloBlock2: articoliCredito[1].TitleBlocks2,descrizioneBlock2: articoliCredito[1].DescriptionBlocks2 }) } onPress2={ () => this.props.navigation.navigate('DetailsScreen', { categoria: 'Credito',title: articoliCredito[0].title ,desc1: articoliCredito[0].abstract, image: articoliCredito[0].image2,  titoloBlock1: articoliCredito[0].TitleBlocks1,descrizioneBlock1: articoliCredito[0].DescriptionBlocks1, titoloBlock2: articoliCredito[0].TitleBlocks2,descrizioneBlock2: articoliCredito[0].DescriptionBlocks2 }) }  />
              </View>
              <View style={styles.curiosità}>
                <Text style={{fontSize:20,fontWeight:'bold',marginLeft:10}}>Curiosità</Text>
                <Scroll image1={articoliCuriosita[0].image} titolo1={articoliCuriosita[0].title} abstract1={articoliCuriosita[0].abstract} image2={articoliCuriosita[1].image} titolo2={articoliCuriosita[1].title} abstract2={articoliCuriosita[1].abstract} image3={articoliCuriosita[0].image} titolo3={articoliCuriosita[0].title} abstract3={articoliCuriosita[0].abstract} onPress={ () => this.props.navigation.navigate('DetailsScreen', { categoria: 'Curiosità',title: articoliCuriosita[0].title ,desc1: articoliCuriosita[0].abstract, image: articoliCuriosita[0].image2,  titoloBlock1: articoliCuriosita[0].TitleBlocks1,descrizioneBlock1: articoliCuriosita[0].DescriptionBlocks1, titoloBlock2: articoliCuriosita[0].TitleBlocks2,descrizioneBlock2: articoliCuriosita[0].DescriptionBlocks2 }) } onPress1={ () => this.props.navigation.navigate('DetailsScreen', { categoria: 'Curiosità',title: articoliCuriosita[1].title ,desc1: articoliCuriosita[1].abstract, image: articoliCuriosita[1].image2,  titoloBlock1: articoliCuriosita[1].TitleBlocks1,descrizioneBlock1: articoliCuriosita[1].DescriptionBlocks1, titoloBlock2: articoliCuriosita[1].TitleBlocks2,descrizioneBlock2: articoliCuriosita[1].DescriptionBlocks2 }) } onPress2={ () => this.props.navigation.navigate('DetailsScreen', { categoria: 'Curiosità',title: articoliCuriosita[0].title ,desc1: articoliCuriosita[0].abstract, image: articoliCuriosita[0].image2,  titoloBlock1: articoliCuriosita[0].TitleBlocks1,descrizioneBlock1: articoliCuriosita[0].DescriptionBlocks1, titoloBlock2: articoliCuriosita[0].TitleBlocks2,descrizioneBlock2: articoliCuriosita[0].DescriptionBlocks2 }) }  />
              </View>
            </ScrollView>
        );
    }
}
 
const styles = StyleSheet.create({
    containerSlider:{
      height:250,
      width: 375,
    },
    mercatoImmobiliare: {
        paddingTop: 25
    },
    credito: {
        paddingTop: 25
    },
    curiosità: {
        paddingTop: 25,
        paddingBottom: 55
      },
  });