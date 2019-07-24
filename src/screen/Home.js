import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
// STORE
import {
  ArticoliMercatoController, ArticoliCreditoController, ArticoliCuriositaController,
  ArticoliController, ArticoloEvidenzaController, UltimiArticoliController
} from '../store/controller';
import {
  ArticoliMercatoModel, ArticoliCreditoModel, ArticoliCuriositaModel,
  ArticoloEvidenzaModel, UltimiArticoliModel, ArticoliModel
} from '../store/models';
// COMPONENTS
import Slider from '../components/Slider';
import Scroll from '../components/Scroll';
import CardEvidenza from '../components/CardEvidenza';
// UTILS
import { width } from '../utils/constants';


export default class Home extends Component {

  // Istanziazione del componente
  constructor(props) {
    // Invocare il costruttore della classe base 
    super(props);
    // Assegno i valori di default
    this.state = {
      loading: true,
      articoliSlider: [],
      articoliMercato: [],
      articoliCredito: [],
      articoliCuriosita: [],
      articoloEvidenza: [],
      ultimiArticoli: []
    };
  }

  async componentDidMount() {
    const articoliTrovati = ArticoliController.findAllArticle();
    if(articoliTrovati.length === 0){
      try {
        const response = await fetch('https://blog.remax.sdch.develondigital.com/api/v1/pages');
        const responseJson = await response.json();
        // Destrutturazione
        const {highlighted_articles, featured_categories, featured_article, last_articles} = responseJson.page;
        // Salvo i dati recuperati della API
        const highlightedaArticles = highlighted_articles;
        const featured_categories0 = featured_categories[0].articles;
        const featured_categories1 = featured_categories[1].articles;
        const featured_categories2 = featured_categories[2].articles;
        const featuredArticle = featured_article;
        const lastArticles = last_articles;
        //Salvo gli articoli per lo Slider
        highlightedaArticles.forEach(element => {
          ArticoliController.saveArticoliSlider(new ArticoliModel(element.id,element.title,element.image_complete_url,element.category.name));
        });
        // Salvo gli articoli per la categoria ' Mercato Immobiliare '
        featured_categories0.forEach(element => {
          ArticoliMercatoController.saveArticoliMercato(new ArticoliMercatoModel(element.id,element.title,element.abstract,element.thumbnail_complete_url,element.publish_date));
        });
        // Salvo gli articoli per la categoria ' Credito '
        featured_categories1.forEach(element => {
          ArticoliCreditoController.saveArticoliCredito(new ArticoliCreditoModel(element.id,element.title,element.abstract,element.thumbnail_complete_url,element.publish_date));
        });
        // Salvo gli articoli per la categoria ' Curiosità '
        featured_categories2.forEach(element => {
          ArticoliCuriositaController.saveArticoliCuriosita(new ArticoliCuriositaModel(element.id,element.title,element.abstract,element.thumbnail_complete_url,element.publish_date));
        });
        // Salvo l'articolo in evidenza
        ArticoloEvidenzaController.saveArticoliEvidenza(new ArticoloEvidenzaModel(featuredArticle.id,featuredArticle.title,featuredArticle.abstract,featuredArticle.thumbnail_complete_url,featuredArticle.category.name))
        // Salvo gli articoli per la sezione ' Ultimi Articoli '
        lastArticles.forEach(element => {
          UltimiArticoliController.saveUltimiArticoli(new UltimiArticoliModel(element.id,element.title,element.thumbnail_complete_url,element.publish_date,element.category.name));
        });
      }catch(error) {
        console.error(error);
      };
    }
    // Aggiorno gli state
    this.setState({
      articoliSlider : ArticoliController.findLastTreArticoli(),
      articoliMercato : ArticoliMercatoController.findArticoli(),
      articoliCredito : ArticoliCreditoController.findArticoli(),
      articoliCuriosita : ArticoliCuriositaController.findArticoli(),
      articoloEvidenza : ArticoloEvidenzaController.findArticoli(),
      ultimiArticoli : UltimiArticoliController.findArticoli(),
      loading: false
    });
  }

  render() {
    const {loading, articoliSlider, articoliMercato, articoliCredito, articoliCuriosita, articoloEvidenza, ultimiArticoli} = this.state;
    const { navigation : {navigate} } = this.props;
    if(loading){
      return <ActivityIndicator style={styles.activityIndicator} color = 'red' size = 'large' />
    }
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
          <View style={{marginLeft:17}}>
            <CardEvidenza data={articoloEvidenza} onPress={() => navigate('DetailsScreen',{id:articoloEvidenza.id,categoria:articoloEvidenza.category})}/>
          </View>
        </View>
        <View style={styles.ultimiArticoli}>
          <Text style={styles.stileCategoria}>Gli Ultimi Articoli</Text>
          <Scroll data={ultimiArticoli}  />
        </View>
      </ScrollView>
    );
  }
}
 
const styles = StyleSheet.create({
  containerSlider:{
    height:250,
    width,
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