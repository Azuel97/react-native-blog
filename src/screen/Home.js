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

// Recupero le dimensioni dello schermo
var {height, width} = Dimensions.get('window');

// Disabilito l'uscita dei messaggi di warning
console.disableYellowBox = true;

export default class Home extends Component {

  componentWillMount(){
      articoliTrovati = ArticoliService.findAllArticle()
      if(articoliTrovati.length === 0){
          console.log('Eseguo il FETCH')
          return fetch('https://blog.remax.sdch.develondigital.com/api/v1/pages')
          .then((response) => response.json())
          .then((responseJson) => {
            // Destrutturazione
            const {highlighted_articles, featured_categories, featured_article, last_articles} = responseJson.page;
            // Salvo i dati recuperati della API
            highlightedaArticles = highlighted_articles;
            featured_categories0 = featured_categories[0].articles;
            featured_categories1 = featured_categories[1].articles;
            featured_categories2 = featured_categories[2].articles;
            featuredArticle = featured_article;
            lastArticles = last_articles;
            // Salvo gli articoli per lo Slider
            highlightedaArticles.forEach(element => {
              ArticoliService.saveArticoliSlider(new ArticoliModel(element.id,element.title,element.image_complete_url,element.category.name));
            });
            // Salvo gli articoli per la categoria ' Mercato Immobiliare '
            featured_categories0.forEach(element => {
              ArticoliMercatoService.saveArticoliMercato(new ArticoliMercatoModel(element.id,element.title,element.abstract,element.thumbnail_complete_url,element.publish_date));
            });
            // Salvo gli articoli per la categoria ' Credito '
            featured_categories1.forEach(element => {
              ArticoliCreditoService.saveArticoliCredito(new ArticoliCreditoModel(element.id,element.title,element.abstract,element.thumbnail_complete_url,element.publish_date));
            });
            // Salvo gli articoli per la categoria ' Curiosità '
            featured_categories2.forEach(element => {
              ArticoliCuriositaService.saveArticoliCuriosita(new ArticoliCuriositaModel(element.id,element.title,element.abstract,element.thumbnail_complete_url,element.publish_date));
            });
            // Salvo l'articolo in evidenza
            ArticoloEvidenzaService.saveArticoliEvidenza(new ArticoloEvidenzaModel(featuredArticle.id,featuredArticle.title,featuredArticle.abstract,featuredArticle.thumbnail_complete_url,featuredArticle.category.name))
            // Salvo gli articoli per la sezione ' Ultimi Articoli '
            lastArticles.forEach(element => {
              UltimiArticoliService.saveUltimiArticoli(new UltimiArticoliModel(element.id,element.title,element.abstract,element.thumbnail_complete_url,element.publish_date,element.category.name));
            });
          })
          .catch((error) => {
              console.error(error);
          });
      }else{
          console.log('No FETCH')
      }
      // Articoli Slider
      articoliSlider = ArticoliService.findLastTreArticoli()
      // Mercato Immobiliare
      articoliMercato = ArticoliMercatoService.findArticoli()
      categoriaM = 'Mercato Immobiliare'
      // Credito
      articoliCredito = ArticoliCreditoService.findArticoli()
      categoriaC = 'Credito'
      // Curiosità
      articoliCuriosita = ArticoliCuriositaService.findArticoli()
      categoriaCu = 'Curiosità'
      // Articolo in Evidenza
      articoloEvidenza = ArticoloEvidenzaService.findArticoli()
      // Ultimi Articoli
      ultimiArticoli = UltimiArticoliService.findArticoli()
  }


    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.containerSlider}>
                <Slider data={articoliSlider} />
              </View>
              <View style={styles.mercatoImmobiliare}>
                <Text style={{fontSize:20,fontWeight:'bold',marginLeft:10}}>Mercato Immobiliare</Text>
                <Scroll data={articoliMercato} />
              </View>
              <View style={styles.credito}>
                <Text style={{fontSize:20,fontWeight:'bold',marginLeft:10}}>Credito</Text>
                <Scroll data={articoliCredito} />
              </View>
              <View style={styles.curiosità}>
                <Text style={{fontSize:20,fontWeight:'bold',marginLeft:10}}>Curiosità</Text>
                <Scroll data={articoliCuriosita} />
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
                <Scroll data={ultimiArticoli}  />
              </View>
            </ScrollView>
        );
    }
}
 
const styles = StyleSheet.create({
    containerSlider:{
      height:250,
      width: width,
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