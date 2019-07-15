import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, FlatList, TouchableOpacity, Dimensions } from 'react-native';
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
var {height, width} = Dimensions.get('window');

const categoriaCercata = 'MercatoImmobiliare'

export default class Mercato extends Component {

  state = {
      id: '',
      titolo: '',
      descrizione: '',
      image: '',
      selectedValue: 'DATA',
      data: [],
      articoliTrovati: []
  }

  componentWillMount(){
    const categoriaTrovata = CategorieService.findCategoria(categoriaCercata).toString()
    if(categoriaTrovata === ''){
      console.log('fetch mercato')
      return fetch('https://blog.remax.sdch.develondigital.com/api/v1/categories/mercato-immobiliare')
        .then((response) => response.json())
        .then((responseJson) => {
          this.state.id = responseJson.category.id
          this.state.titolo = responseJson.category.name
          this.state.descrizione = responseJson.category.meta.description
          this.state.image = responseJson.category.image_complete_url
          CategorieService.saveArticoliSlider(new CategorieModel(this.state.id,this.state.titolo,this.state.descrizione,this.state.image))
        })
      .catch((error) => {
        console.error(error);
      });
    }
  }

  filtroDataArticoli(){
    // Immagine e testo principale della activity
    image1 = CategorieService.findImageByName(categoriaCercata)
    categoria1 = CategorieService.findCategoriaByName(categoriaCercata)
    titolo1 = CategorieService.findTitoloByName(categoriaCercata)
    
    // Recupero le date di pubblicazione degli articoli
    dateTrovate = []
    dateTrovate = ArticoliMercatoService.findDatePubblicazione()
    this.state.data = dateTrovate
    
    // Recupero gli articoli a seconda della data che gli viene passato
    articoli = []
    articoli = ArticoliMercatoService.findArticoliPerData(this.state.selectedValue)

    // Controllo per la manipolazione degli articoli su base della data di pubblicazione
    if(articoli.length === 0){
      articoli = ArticoliMercatoService.findArticoli()
      this.state.articoliTrovati = articoli
    }else{
      articoli = ArticoliMercatoService.findArticoliPerData(this.state.selectedValue)
      this.state.articoliTrovati = articoli
    }
  }
  
  render() {
    this.filtroDataArticoli()
    return (
      <View style={{flex:1}}>
        <Image style={{width:width , height: 200}} source={{uri: `${image1}`}} />
        <Text style={styles.cat}>Mercato Immobiliare</Text>
        <Text style={styles.text}>{titolo1}</Text>
          
        <View style={{flexDirection: 'row',backgroundColor:'#F7F7F7',marginTop:25,width:200,height:40,marginLeft:15}}>
          <TouchableOpacity style={{width:170,height:40}} onPress={() => {this.pickerRef.show()}}>
            <Text style={{fontSize: 18,paddingTop:10,paddingLeft:10,paddingBottom:10}}>{this.state.selectedValue}</Text>
          </TouchableOpacity>
          <Text style={{color:'#DC1C2E',fontSize: 18,paddingTop:10,paddingBottom:10}}>▼</Text>
          <ReactNativePickerModule
            pickerRef={e => this.pickerRef = e}
            value={this.state.selectedValue}
            title={"Seleziona data"}
            items={this.state.data}
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
            data={this.state.articoliTrovati}
            renderItem={({item}) => <CardGrandi publish_date={item.publish_date} title={item.title} abstract={item.abstract} image={item.image} categoria={'Mercato Immobiliare'} />}
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
  }
});