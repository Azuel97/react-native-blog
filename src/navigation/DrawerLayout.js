import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default class DrawerLayout extends Component {

  render() {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image source={require('../image/logo1.png')} style={{ width: 150, height: 35, marginTop:80, marginLeft:78 }} />
            </View>
            <View style={styles.screenContainer}>
                <View style={{borderBottomColor:'#666666',borderBottomWidth: 1, width:'88%', marginLeft:15}} />
                <View style={styles.screenStyle1}>
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Home') ? styles.selectedTextStyle : null]} onPress={() => this.props.navigation.navigate('Home')}>Home</Text>
                </View>
                <View style={styles.screenStyle1}>
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Mercato') ? styles.selectedTextStyle : null]} onPress={() => this.props.navigation.navigate('Mercato')}>Mercato Immobiliare</Text>
                </View>
                <View style={styles.screenStyle1}>
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Credito') ? styles.selectedTextStyle : null]} onPress={() => this.props.navigation.navigate('Credito')}>Credito</Text>
                </View>
                <View style={styles.screenStyle1}>
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Curiosita') ? styles.selectedTextStyle : null]} onPress={() => this.props.navigation.navigate('Curiosita')}>Curiosità</Text>
                </View>
            </View>
            <View style={styles.bottom}>
                <View style={{flexDirection: 'row', paddingBottom:20}}>
                    <Image source={require('../image/facebook-24.png')} />
                    <Image source={require('../image/twitter-24.png')} style={{marginLeft:12}}/>
                    <Image source={require('../image/youtube-24.png')} style={{marginLeft:12}}/>
                    <Image source={require('../image/instagram-24.png')} style={{marginLeft:12}} />
                    <Image source={require('../image/linkedin-24.png')} style={{marginLeft:12}} />
                </View>
                <Text style={{color:'#fff', fontWeight:'bold',fontSize:12}}>© RE/MAX Italia P.Iva 00170620249</Text>
                <Text style={{color:'#fff', paddingBottom:40,fontWeight:'bold',fontSize:12}}>Tutti i diritti riservati</Text>
            </View>
        </View>
    )
  }
}


const styles = StyleSheet.create({
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 0,
        backgroundColor: '#003DA7',
        width:280,
        marginTop:340,
        alignItems: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'center'
    },
    headerContainer: {
        height: 150,
        width:'100%'
    },
    headerText: {
        color: '#fff8f8',
    },
    screenContainer: { 
        width: '100%',
    },
    screenStyle1: {
        height: 30,
        marginTop: 12,
        width: '90%'
    },
    screenTextStyle:{
        fontSize: 18,
        marginLeft: 20, 
        textAlign: 'center'
    },
    selectedTextStyle: {
        fontWeight: 'bold',
        color: 'red'
    }
});