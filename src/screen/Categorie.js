import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
// STORE
import {
  CategorieController, ArticoliMercatoController, 
  ArticoliCreditoController, ArticoliCuriositaController
} from '../store/controller';
import { CategorieModel }  from '../store/models';
// COMPONENTS
import ReactNativePickerModule from 'react-native-picker-module';
import CardGrandi from '../components/CardGrandi';
// UTILS
import { width } from '../utils/constants';


export default class Categorie extends Component {

  // Istanziazione del componente
  constructor(props) {
    // Invocare il costruttore della classe base 
    super(props);
    // Assegno i valori di default
    this.state = {
      loading: true,
      image1: '',
      categoria1: '',
      titolo1: '',
      Id: '',
      titolo: '',
      descrizione: '',
      image: '',
      selectedValue: 'DATA',
      data: [],
      articoliTrovati: []
    };
    this.filtroDataArticoli = this.filtroDataArticoli.bind(this);
    this.impostaStruttura = this.impostaStruttura.bind(this);
  }

  async componentDidMount() {
    const { navigation : {getParam} } = this.props;
    const categoria =  getParam('categoria', '');
    const categoriaTrovata = CategorieController.findCategoria(categoria);
    if(categoriaTrovata.length === 0){
      try {
        const response = await fetch(`https://blog.remax.sdch.develondigital.com/api/v1/categories/${categoria}`);
        const responseJson = await response.json();
        const {id, name, meta, image_complete_url} = responseJson.category;
        this.setState({
          Id : id,
          titolo : name,
          descrizione : meta.description,
          image : image_complete_url,
        })
        const {Id, titolo, descrizione, image} = this.state;
        CategorieController.saveArticoliSlider(new CategorieModel(Id, titolo, descrizione, image));
      }catch(error) {
        console.error(error);
      };
    }
    if(categoria === 'Mercato Immobiliare'){
      this.impostaStruttura(ArticoliMercatoController, categoria);
    }else if(categoria === 'Credito'){
      this.impostaStruttura(ArticoliCreditoController, categoria);
    }else if(categoria === 'Curiosita'){
      this.impostaStruttura(ArticoliCuriositaController, categoria);
    }
  }

  impostaStruttura(service,category) {
    // Recupero le date di pubblicazione degli articoli
    var dateTrovate = service.findDatePubblicazione();
    // Recupero gli articoli
    var articoli = service.findArticoli();
    // Aggiorno gli state
    this.setState({
      image1: CategorieController.findImageByName(category),
      categoria1: CategorieController.findCategoriaByName(category),
      titolo1: CategorieController.findTitoloByName(category),
      data: dateTrovate,
      articoliTrovati: articoli,
      loading: false
    });
  }

  filtroDataArticoli(value,service){
    // Recupero gli articoli a seconda della data che gli viene passato
    var articoli = service.findArticoliPerData(value);
    // Controllo per la manipolazione degli articoli su base della data di pubblicazione
    if(articoli.length === 0){
      articoli = service.findArticoli();
    }
    this.setState({
      articoliTrovati: articoli
    });
  }

  renderListItem(item,categoria1) {
    const {publish_date, title, abstract, image, id } = item;
    return (
      <CardGrandi publish_date={publish_date} title={title} abstract={abstract} image={image} categoria={categoria1} onPress={() => this.props.navigation.navigate('DetailsScreen', {
        id,
        categoria: categoria1 })} 
      />
    );
  }
  
  render() {
    const {loading, data, selectedValue, articoliTrovati,image1, categoria1, titolo1} = this.state;
    if(loading){
      <ActivityIndicator style={styles.activityIndicator} color = 'red' size = 'large' />
    }
    return (
      <View style={{flex:1}}>
        <Image style={{width:width , height: 200}} source={{uri: `${image1}`}} />
        <Text style={styles.cat}>{categoria1}</Text>
        <Text style={styles.text}>{titolo1}</Text>
            
        <View style={{flexDirection: 'row',backgroundColor:'#F7F7F7',marginTop:25,width:200,height:40,marginLeft:15}}>
          <TouchableOpacity style={{width:170,height:40}} onPress={() => {this.pickerRef.show()}}>
            <Text style={{fontSize: 18,paddingTop:10,paddingLeft:10,paddingBottom:10}}>{selectedValue}</Text>
          </TouchableOpacity>
          <Text style={{color:'#DC1C2E',fontSize: 18,paddingTop:10,paddingBottom:10}}>▼</Text>
          <ReactNativePickerModule
            pickerRef={e => this.pickerRef = e}
            value={selectedValue}
            title={"Seleziona data"}
            items={data}
            onValueChange={(value, index ) => {
              if(categoria1 === 'Mercato Immobiliare'){
                this.filtroDataArticoli(value, ArticoliMercatoController);
              }else if(categoria1 === 'Credito'){
                this.filtroDataArticoli(value, ArticoliCreditoController);
              }else if(categoria1 === 'Curiosita'){
                this.filtroDataArticoli(value, ArticoliCuriositaController);
              }
              this.setState({
                selectedValue: value,
                selectedIndex: index,
              })
          }} />
        </View>

        <View style={{paddingTop: 10,flex:1,paddingBottom:15}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={articoliTrovati}
            renderItem={({item}) => this.renderListItem(item,categoria1)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  text: {
    position: 'absolute',
    top: 130,
    left: 10,
    right: 15,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cat: {
    position: 'absolute',
    top: 95,
    left: 10,
    right: 15,
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    },
  mercatImmo: {
    marginLeft: 17,
    marginTop:15,  
    paddingBottom:15 
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
 }
});