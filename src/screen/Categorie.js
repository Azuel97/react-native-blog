import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, FlatList, TouchableOpacity, Dimensions } from 'react-native';
// Importo DB
import Database from '../store/index'
import CategorieModel from '../store/models/CategorieModel'
import CategorieService from '../store/controller/CategorieController'
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
// Componenti
import ReactNativePickerModule from 'react-native-picker-module'


export default class Mercato extends Component {

  render() {
    const { navigation } = this.props;
    const cate = navigation.getParam('categoria', '');
    return (
        <View style={{flex:1}}>
          <Text style={styles.text}>{cate}</Text>
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