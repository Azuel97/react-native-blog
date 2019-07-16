import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
// Import DB
import Database from '../store/index'
import CategorieModel from '../store/models/CategorieModel'
import CategorieService from '../store/controller/CategorieController'
import ArticoliMercatoModel from '../store/models/ArticoliMercatoModel'
import ArticoliMercatoService from '../store/controller/ArticoliMercatoController'
// Componenti
import ReactNativePickerModule from 'react-native-picker-module'
import CardGrandi from '../components/CardGrandi'

// Recupero le dimensioni dello schermo
const {width} = Dimensions.get('window');

const categoriaCercata = 'mercato-immobiliare'
var image1 = '', categoria1 = '', titolo1 = '', articoliTrovati = '';

export default class Mercato extends Component {

  state = {
    loading: true,
    Id: '',
    titolo: '',
    descrizione: '',
    image: '',
    selectedValue: 'DATA',
    data: []
  }

  async componentDidMount(){
    const categoriaTrovata = CategorieService.findCategoria(categoriaCercata);
    if(categoriaTrovata.length === 0){
      try {
        const response = await fetch('https://blog.remax.sdch.develondigital.com/api/v1/categories/mercato-immobiliare');
        const responseJson = await response.json();
        // Destrutturazione
        const {id, slug, meta, image_complete_url} = responseJson.category;
        this.setState({
          Id : id,
          titolo : slug,
          descrizione : meta.description,
          image : image_complete_url
        })
        // Destrutturazione
        const {Id, titolo, descrizione, image} = this.state;
        CategorieService.saveArticoliSlider(new CategorieModel(Id, titolo, descrizione, image))
      }catch(error) {
        console.error(error);
      };
    }
    // Aggiorno gli state
    this.setState({
      loading: false
    });
  }

  filtroDataArticoli(){
    const {selectedValue} = this.state;
    // Immagine e testo principale della activity
    image1 = CategorieService.findImageByName(categoriaCercata)
    categoria1 = CategorieService.findCategoriaByName(categoriaCercata)
    titolo1 = CategorieService.findTitoloByName(categoriaCercata)
    
    // Recupero le date di pubblicazione degli articoli
    var dateTrovate = ArticoliMercatoService.findDatePubblicazione()
    this.state.data = dateTrovate
    
    // Recupero gli articoli a seconda della data che gli viene passato
    var articoli = ArticoliMercatoService.findArticoliPerData(selectedValue)

    // Controllo per la manipolazione degli articoli su base della data di pubblicazione
    if(articoli.length === 0){
      articoli = ArticoliMercatoService.findArticoli()
      articoliTrovati = articoli
    }else{
      articoli = ArticoliMercatoService.findArticoliPerData(selectedValue)
      articoliTrovati = articoli
    }
  }
  
  render() {
    this.filtroDataArticoli();
    const {loading, data, selectedValue} = this.state;
    if(loading){
      return <ActivityIndicator style={styles.activityIndicator} color = 'red' size = 'large' />
    }else{
      return (
        <View style={{flex:1}}>
          <Image style={{width:width , height: 200}} source={{uri: `${image1}`}} />
          <Text style={styles.cat}>Mercato Immobiliare</Text>
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
              onCancel={()=>{console.log('Cancelled')}}
              onValueChange={(value, index ) => {
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
              renderItem={({item}) => <CardGrandi publish_date={item.publish_date} title={item.title} abstract={item.abstract} image={item.image} categoria={'Mercato Immobiliare'} onPress={() => this.props.navigation.navigate('DetailsScreen', {
                  id: item.id,
                  categoria: 'mercato-immobiliare' })} />}
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