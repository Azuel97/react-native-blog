import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Dimensions } from 'react-native';
// Importo DB
import Database from '../store/index'
import ArticoliModel from '../store/models/ArticoliModel'
import ArticoliService from '../store/controller/ArticoliController'
import ArticoliMercatoModel from '../store/models/ArticoliMercatoModel'
import ArticoliMercatoService from '../store/controller/ArticoliMercatoController'
import ArticoliCreditoModel from '../store/models/ArticoliCreditoModel'
import ArticoliCreditoService from '../store/controller/ArticoliCreditoController'
import ArticoliCuriositaModel from '../store/models/ArticoliCuriositaModel'
import ArticoliCuriositaService from '../store/controller/ArticoliCuriositaController'
import ArticoloEvidenzaModel from '../store/models/ArticoloEvidenzaModel'
import ArticoloEvidenzaService from '../store/controller/ArticoloEvidenzaController'
import UltimiArticoliModel from '../store/models/UltimiArticoliModel'
import UltimiArticoliService from '../store/controller/UltimiArticoliController'
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
          articoliCuriosita: [],
          articoloEvidenza: [],
          ultimiArticoli: []
        };
    }

    componentDidMount(){
        articoliTrovati = ArticoliService.findAllArticle().toString()
        if(articoliTrovati === ''){
            console.log('Eseguo il FETCH')
            return fetch('https://blog.remax.sdch.develondigital.com/api/v1/pages')
            .then((response) => response.json())
            .then((responseJson) => {
                // Salvo negli state i data recuperati dall'API
                this.state.sliderArticles = responseJson.page.highlighted_articles
                this.state.articoliMercato = responseJson.page.featured_categories[0].articles
                this.state.articoliCredito = responseJson.page.featured_categories[1].articles
                this.state.articoliCuriosita = responseJson.page.featured_categories[2].articles
                this.state.articoloEvidenza = responseJson.page.featured_article
                this.state.ultimiArticoli = responseJson.page.last_articles
                count = this.state.sliderArticles.length
                countMer = this.state.articoliMercato.length
                countCre = this.state.articoliCredito.length
                countCur = this.state.articoliCuriosita.length
                countUlt = this.state.ultimiArticoli.length
                // Recupero gli articoli per lo slider
                for(let i=0; i<count; i++){
                    ArticoliService.saveArticoliSlider(new ArticoliModel(this.state.sliderArticles[i].id,this.state.sliderArticles[i].title,this.state.sliderArticles[i].image_complete_url,this.state.sliderArticles[i].category.name));
                }
                // Recupero gli articoli per la categoria ' Mercato Immobiliare '
                for(let i=0; i<countMer; i++){
                    ArticoliMercatoService.saveArticoliMercato(new ArticoliMercatoModel(this.state.articoliMercato[i].id,this.state.articoliMercato[i].title,this.state.articoliMercato[i].abstract,this.state.articoliMercato[i].thumbnail_complete_url,this.state.articoliMercato[i].publish_date))
                }
                // Recupero gli articoli per la categoria ' Credito '
                for(let i=0; i<countCre; i++){
                    ArticoliCreditoService.saveArticoliCredito(new ArticoliCreditoModel(this.state.articoliCredito[i].id,this.state.articoliCredito[i].title,this.state.articoliCredito[i].abstract,this.state.articoliCredito[i].thumbnail_complete_url,this.state.articoliCredito[i].publish_date))
                }
                // Recupero gli articoli per la categoria ' Curiosità '
                for(let i=0; i<countCur; i++){
                    ArticoliCuriositaService.saveArticoliCuriosita(new ArticoliCuriositaModel(this.state.articoliCuriosita[i].id,this.state.articoliCuriosita[i].title,this.state.articoliCuriosita[i].abstract,this.state.articoliCuriosita[i].thumbnail_complete_url,this.state.articoliCuriosita[i].publish_date))
                }
                // Recupero l'articolo in evidenza
                ArticoloEvidenzaService.saveArticoliEvidenza(new ArticoloEvidenzaModel(this.state.articoloEvidenza.id,this.state.articoloEvidenza.title,this.state.articoloEvidenza.abstract,this.state.articoloEvidenza.thumbnail_complete_url,this.state.articoloEvidenza.category.name))
                // Recupero gli articoli per la sezione ' Ultimi Articoli '
                for(let i=0; i<countUlt; i++){
                    UltimiArticoliService.saveUltimiArticoli(new UltimiArticoliModel(this.state.ultimiArticoli[i].id,this.state.ultimiArticoli[i].title,this.state.ultimiArticoli[i].thumbnail_complete_url,this.state.ultimiArticoli[i].publish_date,this.state.ultimiArticoli[i].category.name))
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
      categoriaM = 'Mercato Immobiliare'

      // Credito
      articoliCredito = []
      articoliCredito = ArticoliCreditoService.findLastTreArticoli()
      categoriaC = 'Credito'

      // Curiosità
      articoliCuriosita = []
      articoliCuriosita = ArticoliCuriositaService.findLastTreArticoli()
      categoriaCu = 'Curiosità'

      // Articolo in Evidenza
      articoloEvidenza = []
      articoloEvidenza = ArticoloEvidenzaService.findArticoli()

      // Ultimi Articoli
      ultimiArticoli = []
      ultimiArticoli = UltimiArticoliService.findArticoli()

        return (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.containerSlider}>
                <Slider image1={articoliSlider[0].image} titolo1={articoliSlider[0].titolo} categoria1={articoliSlider[0].categoria} image2={articoliSlider[1].image} titolo2={articoliSlider[1].titolo} categoria2={articoliSlider[1].categoria} image3={articoliSlider[2].image} titolo3={articoliSlider[2].titolo} categoria3={articoliSlider[2].categoria} />
              </View>
              <View style={styles.mercatoImmobiliare}>
                <Text style={{fontSize:20,fontWeight:'bold',marginLeft:10}}>Mercato Immobiliare</Text>
                <Scroll categoria={categoriaM} categoria1={categoriaM} categoria2={categoriaM} image1={articoliMercato[0].image} titolo1={articoliMercato[0].title} abstract1={articoliMercato[0].abstract} image2={articoliMercato[1].image} titolo2={articoliMercato[1].title} abstract2={articoliMercato[1].abstract} image3={articoliMercato[2].image} titolo3={articoliMercato[2].title} abstract3={articoliMercato[2].abstract} onPress={ () => this.props.navigation.navigate('DetailsScreen', { categoria: 'Mercato Immobiliare',title: articoliMercato[0].title ,desc1: articoliMercato[0].abstract, image: articoliMercato[0].image2,  titoloBlock1: articoliMercato[0].TitleBlocks1,descrizioneBlock1: articoliMercato[0].DescriptionBlocks1, titoloBlock2: articoliMercato[0].TitleBlocks2,descrizioneBlock2: articoliMercato[0].DescriptionBlocks2 }) } onPress1={ () => this.props.navigation.navigate('DetailsScreen', { categoria: 'Mercato Immobiliare',title: articoliMercato[1].title ,desc1: articoliMercato[1].abstract, image: articoliMercato[1].image2,  titoloBlock1: articoliMercato[1].TitleBlocks1,descrizioneBlock1: articoliMercato[1].DescriptionBlocks1, titoloBlock2: articoliMercato[1].TitleBlocks2,descrizioneBlock2: articoliMercato[1].DescriptionBlocks2 }) } onPress2={ () => this.props.navigation.navigate('DetailsScreen', { categoria: 'Mercato Immobiliare',title: articoliMercato[2].title ,desc1: articoliMercato[2].abstract, image: articoliMercato[2].image2,  titoloBlock1: articoliMercato[2].TitleBlocks1,descrizioneBlock1: articoliMercato[2].DescriptionBlocks1, titoloBlock2: articoliMercato[2].TitleBlocks2,descrizioneBlock2: articoliMercato[2].DescriptionBlocks2 }) }  />
              </View>
              <View style={styles.credito}>
                <Text style={{fontSize:20,fontWeight:'bold',marginLeft:10}}>Credito</Text>
                <Scroll categoria={categoriaC} categoria1={categoriaC} categoria2={categoriaC} image1={articoliCredito[0].image} titolo1={articoliCredito[0].title} abstract1={articoliCredito[0].abstract} image2={articoliCredito[1].image} titolo2={articoliCredito[1].title} abstract2={articoliCredito[1].abstract} image3={articoliCredito[0].image} titolo3={articoliCredito[0].title} abstract3={articoliCredito[0].abstract} onPress={ () => this.props.navigation.navigate('DetailsScreen', { categoria: 'Credito',title: articoliCredito[0].title ,desc1: articoliCredito[0].abstract, image: articoliCredito[0].image2,  titoloBlock1: articoliCredito[0].TitleBlocks1,descrizioneBlock1: articoliCredito[0].DescriptionBlocks1, titoloBlock2: articoliCredito[0].TitleBlocks2,descrizioneBlock2: articoliCredito[0].DescriptionBlocks2 }) } onPress1={ () => this.props.navigation.navigate('DetailsScreen', { categoria: 'Credito',title: articoliCredito[1].title ,desc1: articoliCredito[1].abstract, image: articoliCredito[1].image2,  titoloBlock1: articoliCredito[1].TitleBlocks1,descrizioneBlock1: articoliCredito[1].DescriptionBlocks1, titoloBlock2: articoliCredito[1].TitleBlocks2,descrizioneBlock2: articoliCredito[1].DescriptionBlocks2 }) } onPress2={ () => this.props.navigation.navigate('DetailsScreen', { categoria: 'Credito',title: articoliCredito[0].title ,desc1: articoliCredito[0].abstract, image: articoliCredito[0].image2,  titoloBlock1: articoliCredito[0].TitleBlocks1,descrizioneBlock1: articoliCredito[0].DescriptionBlocks1, titoloBlock2: articoliCredito[0].TitleBlocks2,descrizioneBlock2: articoliCredito[0].DescriptionBlocks2 }) }  />
              </View>
              <View style={styles.curiosità}>
                <Text style={{fontSize:20,fontWeight:'bold',marginLeft:10}}>Curiosità</Text>
                <Scroll categoria={categoriaCu} categoria1={categoriaCu} categoria2={categoriaCu} image1={articoliCuriosita[0].image} titolo1={articoliCuriosita[0].title} abstract1={articoliCuriosita[0].abstract} image2={articoliCuriosita[1].image} titolo2={articoliCuriosita[1].title} abstract2={articoliCuriosita[1].abstract} image3={articoliCuriosita[0].image} titolo3={articoliCuriosita[0].title} abstract3={articoliCuriosita[0].abstract} onPress={ () => this.props.navigation.navigate('DetailsScreen', { categoria: 'Curiosità',title: articoliCuriosita[0].title ,desc1: articoliCuriosita[0].abstract, image: articoliCuriosita[0].image2,  titoloBlock1: articoliCuriosita[0].TitleBlocks1,descrizioneBlock1: articoliCuriosita[0].DescriptionBlocks1, titoloBlock2: articoliCuriosita[0].TitleBlocks2,descrizioneBlock2: articoliCuriosita[0].DescriptionBlocks2 }) } onPress1={ () => this.props.navigation.navigate('DetailsScreen', { categoria: 'Curiosità',title: articoliCuriosita[1].title ,desc1: articoliCuriosita[1].abstract, image: articoliCuriosita[1].image2,  titoloBlock1: articoliCuriosita[1].TitleBlocks1,descrizioneBlock1: articoliCuriosita[1].DescriptionBlocks1, titoloBlock2: articoliCuriosita[1].TitleBlocks2,descrizioneBlock2: articoliCuriosita[1].DescriptionBlocks2 }) } onPress2={ () => this.props.navigation.navigate('DetailsScreen', { categoria: 'Curiosità',title: articoliCuriosita[0].title ,desc1: articoliCuriosita[0].abstract, image: articoliCuriosita[0].image2,  titoloBlock1: articoliCuriosita[0].TitleBlocks1,descrizioneBlock1: articoliCuriosita[0].DescriptionBlocks1, titoloBlock2: articoliCuriosita[0].TitleBlocks2,descrizioneBlock2: articoliCuriosita[0].DescriptionBlocks2 }) }  />
              </View>
              <View style={styles.evidenza}>
                <Text style={{fontSize:20,fontWeight:'bold',marginLeft:10}}>Articolo In Evidenza</Text>
                <View style={{marginLeft:17}}>
                  <Image style={{width:340 , height: 180, marginTop:20,borderRadius:3}}
                      source={{uri: `${articoloEvidenza[0].image}`}}/>
                  <View style={{width:340}}>
                    <Text style={{color:'red',fontSize:16,fontWeight:'bold',paddingTop:5}}>{articoloEvidenza[0].category}</Text>
                    <Text style={{fontWeight:'bold',fontSize:18,paddingTop:5}} numberOfLines={2}>{articoloEvidenza[0].title}</Text>
                    <Text style={{fontSize:16,paddingTop:5}} numberOfLines={3}>{articoloEvidenza[0].abstract}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.ultimiArticoli}>
                <Text style={{fontSize:20,fontWeight:'bold',marginLeft:10}}>Gli Ultimi Articoli</Text>
                <Scroll categoria={ultimiArticoli[0].category} categoria1={ultimiArticoli[1].category} categoria2={ultimiArticoli[2].category} image1={ultimiArticoli[0].image} titolo1={ultimiArticoli[0].title} abstract1={ultimiArticoli[0].abstract} image2={ultimiArticoli[1].image} titolo2={ultimiArticoli[1].title} abstract2={ultimiArticoli[1].abstract} image3={ultimiArticoli[2].image} titolo3={ultimiArticoli[2].title} abstract3={ultimiArticoli[2].abstract} onPress={ () => this.props.navigation.navigate('DetailsScreen', { categoria: 'Credito',title: articoliCredito[0].title ,desc1: articoliCredito[0].abstract, image: articoliCredito[0].image2,  titoloBlock1: articoliCredito[0].TitleBlocks1,descrizioneBlock1: articoliCredito[0].DescriptionBlocks1, titoloBlock2: articoliCredito[0].TitleBlocks2,descrizioneBlock2: articoliCredito[0].DescriptionBlocks2 }) } onPress1={ () => this.props.navigation.navigate('DetailsScreen', { categoria: 'Credito',title: ultimiArticoli[1].title ,desc1: ultimiArticoli[1].abstract, image: ultimiArticoli[1].image2,  titoloBlock1: ultimiArticoli[1].TitleBlocks1,descrizioneBlock1: ultimiArticoli[1].DescriptionBlocks1, titoloBlock2: ultimiArticoli[1].TitleBlocks2,descrizioneBlock2: ultimiArticoli[1].DescriptionBlocks2 }) } onPress2={ () => this.props.navigation.navigate('DetailsScreen', { categoria: 'Credito',title: articoliCredito[1].title ,desc1: articoliCredito[1].abstract, image: articoliCredito[1].image2,  titoloBlock1: articoliCredito[1].TitleBlocks1,descrizioneBlock1: articoliCredito[1].DescriptionBlocks1, titoloBlock2: articoliCredito[1].TitleBlocks2,descrizioneBlock2: articoliCredito[1].DescriptionBlocks2 }) }  />
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
    },
    evidenza: {
      paddingTop: 25,
    },
    ultimiArticoli: {
      paddingTop: 40,
      paddingBottom: 55
    }
  });