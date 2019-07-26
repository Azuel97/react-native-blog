import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
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
import Spinner from '../components/Spinner';
import BaseText from '../components/BaseText';

// STYLED COMPONENTS
const ContainerCategory = styled.View`
  padding-top: 25;
`;

const ContainerLastArticles = styled.View`
  padding-top: 40;
  padding-bottom: 55;
`;

const ContainerEvidence = styled.View`
  margin-left: 17;
`;

const TextCategory = styled(BaseText)`
  font-size: 20;
  font-weight: bold;
  padding-left: 10;
`;


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
        const {highlighted_articles:highlightedaArticles, featured_categories, featured_article:featuredArticle, last_articles:lastArticles} = responseJson.page;
        // Salvo i dati recuperati della API
        const featured_categories0 = featured_categories[0].articles;
        const featured_categories1 = featured_categories[1].articles;
        const featured_categories2 = featured_categories[2].articles;
        //Salvo gli articoli per lo Slider
        highlightedaArticles.forEach( ({id,title,image_complete_url,category}) => {
          ArticoliController.saveArticoliSlider(new ArticoliModel(id, title, image_complete_url, category.name));
        });
        // Salvo gli articoli per la categoria ' Mercato Immobiliare '
        featured_categories0.forEach( ({id,title,abstract,thumbnail_complete_url,publish_date}) => {
          ArticoliMercatoController.saveArticoliMercato(new ArticoliMercatoModel(id, title, abstract, thumbnail_complete_url, publish_date));
        });
        // Salvo gli articoli per la categoria ' Credito '
        featured_categories1.forEach( ({id,title,abstract,thumbnail_complete_url,publish_date}) => {
          ArticoliCreditoController.saveArticoliCredito(new ArticoliCreditoModel(id, title, abstract, thumbnail_complete_url, publish_date));
        });
        // Salvo gli articoli per la categoria ' Curiosità '
        featured_categories2.forEach( ({id,title,abstract,thumbnail_complete_url,publish_date}) => {
          ArticoliCuriositaController.saveArticoliCuriosita(new ArticoliCuriositaModel(id, title, abstract, thumbnail_complete_url, publish_date));
        });
        // Salvo l'articolo in evidenza
        const {id, title, abstract, thumbnail_complete_url, category} = featuredArticle;
        ArticoloEvidenzaController.saveArticoliEvidenza(new ArticoloEvidenzaModel(id, title, abstract, thumbnail_complete_url, category.name));
        // Salvo gli articoli per la sezione ' Ultimi Articoli '
        lastArticles.forEach( ({id,title,thumbnail_complete_url,publish_date,category}) => {
          UltimiArticoliController.saveUltimiArticoli(new UltimiArticoliModel(id, title, thumbnail_complete_url, publish_date, category.name));
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
    const { loading, articoliSlider, articoliMercato, articoliCredito, articoliCuriosita, articoloEvidenza, ultimiArticoli } = this.state;
    const { navigation : {navigate} } = this.props;
    const { id, category} = articoloEvidenza
    
    if(loading){
      return <Spinner />
    }
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Slider data={articoliSlider} />
        <ContainerCategory>
          <TextCategory >Mercato Immobiliare</TextCategory>
          <Scroll data={articoliMercato} />
        </ContainerCategory>
        <ContainerCategory>
          <TextCategory>Credito</TextCategory>
          <Scroll data={articoliCredito} />
        </ContainerCategory>
        <ContainerCategory>
          <TextCategory>Curiosità</TextCategory>
          <Scroll data={articoliCuriosita} />
        </ContainerCategory>
        <ContainerCategory>
          <TextCategory>Articolo In Evidenza</TextCategory>
          <ContainerEvidence>
            <CardEvidenza data={articoloEvidenza} onPress={() => navigate('DetailsScreen',{id, categoria: category})}/>
          </ContainerEvidence>
        </ContainerCategory>
        <ContainerLastArticles>
          <TextCategory>Gli Ultimi Articoli</TextCategory>
          <Scroll data={ultimiArticoli}  />
        </ContainerLastArticles>
      </ScrollView>
    );
  }
}