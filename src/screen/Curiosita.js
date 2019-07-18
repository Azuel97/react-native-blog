import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator, FlatList, TouchableOpacity, Dimensions } from 'react-native';
// Import DB
import Database from '../store/index'
import CategorieModel from '../store/models/CategorieModel'
import CategorieService from '../store/controller/CategorieController'
import ArticoliCuriositaModel from '../store/models/ArticoliCuriositaModel'
import ArticoliCuriositaService from '../store/controller/ArticoliCuriositaController'
// Componenti
import ReactNativePickerModule from 'react-native-picker-module'
import CardGrandi from '../components/CardGrandi'

// Recupero le dimensioni dello schermo
var {width} = Dimensions.get('window');

const categoriaCercata = 'Curiosita';
var image1 = '', categoria1 = '', titolo1 = '';

export default class Curiosita extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      Id: '',
      titolo: '',
      descrizione: '',
      image: '',
      selectedValue: 'DATA',
      data: [],
      articoliTrovati: []
    };
    this.filtroDataArticoli = this.filtroDataArticoli.bind(this);
  }

  async componentDidMount(){
    const categoriaTrovata = CategorieService.findCategoria(categoriaCercata);
    if(categoriaTrovata.length === 0){
      try {
        const response = await fetch('https://blog.remax.sdch.develondigital.com/api/v1/categories/curiosita');
        const responseJson = await response.json();
        // Destrutturazione
        const {id, name, meta, image_complete_url} = responseJson.category;
        this.setState({
          Id : id,
          titolo : name,
          descrizione : meta.description,
          image : image_complete_url
        })
        // Destrutturazione
        const {Id, titolo, descrizione, image} = this.state;
        CategorieService.saveArticoliSlider(new CategorieModel(Id, titolo, descrizione, image));
      }catch(error) {
        console.error(error);
      };
    }
    // Immagine e testo principale della activity
    image1 = CategorieService.findImageByName(categoriaCercata);
    categoria1 = CategorieService.findCategoriaByName(categoriaCercata);
    titolo1 = CategorieService.findTitoloByName(categoriaCercata);
    // Recupero le date di pubblicazione degli articoli
    var dateTrovate = ArticoliCuriositaService.findDatePubblicazione();
    // Recupero gli articoli a seconda della data che gli viene passato
    var articoli = ArticoliCuriositaService.findArticoli();

    // Aggiorno gli state
    this.setState({
      data: dateTrovate,
      articoliTrovati: articoli,
      loading: false
    });
  }

  filtroDataArticoli(value){
    // Recupero gli articoli a seconda della data che gli viene passato
    var articoli = ArticoliCuriositaService.findArticoliPerData(value);
    // Controllo per la manipolazione degli articoli su base della data di pubblicazione
    if(articoli.length === 0){
      articoli = ArticoliCuriositaService.findArticoli();
    }
    this.setState({
      articoliTrovati: articoli
    });
  }

  renderListItem(item) {
    const {publish_date, title, abstract, image, id } = item;
    return (
      <CardGrandi publish_date={publish_date} title={title} abstract={abstract} image={image} categoria={'Mercato Immobiliare'} onPress={() => this.props.navigation.navigate('DetailsScreen', {
        id: id,
        categoria: 'Curiosita' })} 
      />
    );
  }
  
  render() {
    const {loading, data, selectedValue, articoliTrovati} = this.state;
    if(loading){
      return <ActivityIndicator style={styles.activityIndicator} color = 'red' size = 'large' />
    }else{
      return (
        <View style={{flex:1}}>
          <Image style={{width:width , height: 200}} source={{uri: `${image1}`}} />
          <Text style={styles.cat}>Curiosità</Text>
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
                  this.filtroDataArticoli(value);
                  this.setState({
                    selectedValue: value,
                    selectedIndex: index,
                  })
              }}/>
          </View>

          <View style={{paddingTop: 10,flex:1,paddingBottom:15}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={articoliTrovati}
              renderItem={({item}) => this.renderListItem(item)} 
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
    );
  }
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