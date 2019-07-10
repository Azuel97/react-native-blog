import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, FlatList, TouchableOpacity, Button } from 'react-native';
// Import DB
import Database from '../store/index'
import CategorieModel from '../store/models/CategorieModel'
import CategorieService from '../store/controller/CategorieController'
import ArticoliCuriositaModel from '../store/models/ArticoliCuriositaModel'
import ArticoliCuriositaService from '../store/controller/ArticoliCuriositaController'
// Componenti
import ReactNativePickerModule from 'react-native-picker-module'

const categoriaCercata = 'Curiosità';

export default class Curiosita extends Component {

  // Setto lo state che conterrà i dati da visualizzare nella lista
    state = {
      idCuriosita: '',
      titoloCuriosita: '',
      descrizioneCuriosita: '',
      imageCuriosita: '',
      selectedValue: 'DATA',
      data: [],
      dataGiornata: '',
      articoliTrovati: []
    }


  componentDidMount(){
    categoriaTrovata = CategorieService.findCategoria(categoriaCercata).toString()
        if(categoriaTrovata === ''){
        console.log('fetch curiosità')
        return fetch('https://blog.remax.sdch.develondigital.com/api/v1/categories/curiosita')
        .then((response) => response.json())
        .then((responseJson) => {
            this.state.idCuriosita = responseJson.category.id
            this.state.titoloCuriosita = responseJson.category.name
            this.state.descrizioneCuriosita = responseJson.category.meta.description
            this.state.imageCuriosita = responseJson.category.image_complete_url
            CategorieService.saveArticoliSlider(new CategorieModel(this.state.id,this.state.titolo,this.state.descrizione,this.state.image))
          })
        .catch((error) => {
            console.error(error);
        });
      }else{
        console.log('No fetch curiosità')
      }
    }
  
  render() {
  
    // Immagine e testo principale della activity
    image1 = CategorieService.findImageByName(categoriaCercata)
    categoria1 = CategorieService.findCategoriaByName(categoriaCercata)
    titolo1 = CategorieService.findTitoloByName(categoriaCercata)

    // Recupero le date di pubblicazione degli articoli
    dateTrovate = []
    dateTrovate = ArticoliCuriositaService.findDatePubblicazione()
    this.state.data = dateTrovate

    // Recupero gli articoli a seconda della data che gli viene passato
    articoli = []
    articoli = ArticoliCuriositaService.findArticoliPerData(this.state.selectedValue)
    
    // Controllo per la manipolazione degli articoli su base della data di pubblicazione
    if(articoli.length === 0){
      articoliTro =[]
      articoliTro = ArticoliCuriositaService.findArticoli()
      this.state.articoliTrovati = articoliTro
      console.log(this.state.articoliTro)
    }else{
      articoli = ArticoliCuriositaService.findArticoliPerData(this.state.selectedValue)
      this.state.articoliTrovati = articoli
      console.log(this.state.articoliTrovati)
    }

    return (
        <View style={{flex:1}}>
          <Image style={{width:400 , height: 200}} source={{uri: `${image1}`}} />
          <Text style={styles.cat}>{categoria1}</Text>
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
                    dataGiornata: value,
                    selectedIndex: index,
                  })
              }}/>
          </View>

          <View style={{paddingTop: 10,flex:1,paddingBottom:15}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.articoliTrovati}
              renderItem={({item}) => <View style={styles.mercatImmo}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailsScreen', {
                      image: item.image2,
                      title: item.title,
                      desc1: item.abstract2,
                      categoria: 'Curiosità',
                      titoloBlock1: item.TitleBlocks1,
                      descrizioneBlock1: item.DescriptionBlocks1,
                      titoloBlock2: item.TitleBlocks2,
                      descrizioneBlock2: item.DescriptionBlocks2
                  })}>
                  <Image style={{width:340 , height: 180}}
                      source={{uri: `${item.image}`}}/>
                  <View style={{width:340}}>
                  <View style={{justifyContent: 'space-between',flex: 1,flexDirection: 'row',}}>
                      <View>
                        <Text style={{color:'red',fontSize:16,fontWeight:'bold',paddingTop:5}}>Curiosità</Text>
                      </View>
                      <View>
                        <Text style={{color:'grey',fontSize:16, fontWeight:'bold',paddingTop:5}}>{item.publish_date}</Text>
                      </View>
                    </View>
                    <Text style={{fontWeight:'bold',fontSize:20,paddingTop:5}} numberOfLines={2}>{item.title}</Text>
                    <Text style={{fontSize:16,paddingTop:5}} numberOfLines={3}>{item.abstract}</Text>
                  </View>
                  </TouchableOpacity>
                </View>}
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