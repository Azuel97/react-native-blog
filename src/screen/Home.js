import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
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
import CardEvidenza from '../components/CardEvidenza'

// Recupero le dimensioni dello schermo
var {height, width} = Dimensions.get('window');

// Disabilito l'uscita dei messaggi di warning
console.disableYellowBox = true;

export default class Home extends Component {

  state = {
    loading: false
  }

  async componentWillMount(){
    // Abilito il caricamento
    this.setState({loading: true});

      articoliTrovati = ArticoliService.findAllArticle()
      if(articoliTrovati.length === 0){
          console.log('Eseguo il FETCH')
          try {
            let response = await fetch('https://blog.remax.sdch.develondigital.com/api/v1/pages')
            let responseJson = await response.json()
            // Destrutturazione
            const {highlighted_articles, featured_categories, featured_article, last_articles} = responseJson.page;
            // Salvo i dati recuperati della API
            highlightedaArticles = highlighted_articles;
            featured_categories0 = featured_categories[0].articles;
            featured_categories1 = featured_categories[1].articles;
            featured_categories2 = featured_categories[2].articles;
            featuredArticle = featured_article;
            lastArticles = last_articles;
            //Salvo gli articoli per lo Slider
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
              UltimiArticoliService.saveUltimiArticoli(new UltimiArticoliModel(element.id,element.title,element.thumbnail_complete_url,element.publish_date,element.category.name));
            });
          }catch(error) {
            console.error(error);
          };
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

      // Disabilito il caricamento
      this.setState({loading: false});
  }

    render() {
      if(this.state.loading){
        return <ActivityIndicator style={styles.activityIndicator} color = 'red' size = "large" />
      }else{
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.containerSlider}>
                <Slider data={articoliSlider} />
              </View>
              <View style={styles.categoria}>
                <Text style={styles.stileCategoria}>Mercato Immobiliare</Text>
                <Scroll data={articoliMercato} />
              </View>
              <View style={styles.categoria}>
                <Text style={styles.stileCategoria}>Credito</Text>
                <Scroll data={articoliCredito} />
              </View>
              <View style={styles.categoria}>
                <Text style={styles.stileCategoria}>Curiosità</Text>
                <Scroll data={articoliCuriosita} />
              </View>
              <View style={styles.categoria}>
                <Text style={styles.stileCategoria}>Articolo In Evidenza</Text>
                <CardEvidenza data={articoloEvidenza} />
              </View>
              <View style={styles.ultimiArticoli}>
                <Text style={styles.stileCategoria}>Gli Ultimi Articoli</Text>
                <Scroll data={ultimiArticoli}  />
              </View>
            </ScrollView>
        );
      }
    }
}
 
const styles = StyleSheet.create({
    containerSlider:{
      height:250,
      width: width,
    },
    categoria: {
      paddingTop: 25
    },
    ultimiArticoli: {
      paddingTop: 40,
      paddingBottom: 55
    },
    stileCategoria: {
      fontSize:20,
      fontWeight:'bold',
      marginLeft:10
    },
    activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   }
});