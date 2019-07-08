import React, { Component } from 'react';
import {NavigationActions} from 'react-navigation';
import { Text, View, StyleSheet, ImageBackground, Image } from 'react-native'

export default class DrawerLayout extends Component {

    navigateToScreen = ( route ) =>(
        () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    })

  render() {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image source={require('../image/logo1.png')} style={{ width: 150, height: 35, marginTop:80, marginLeft:78 }} />
            </View>
            <View style={styles.screenContainer}>
                <View style={{borderBottomColor:'#666666',borderBottomWidth: 1, width:'88%', marginLeft:15}} />
                <View style={styles.screenStyle1}>
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Home') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('Home')}>Home</Text>
                </View>
                <View style={styles.screenStyle1}>
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Mercato') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('Mercato')}>Mercato Immobiliare</Text>
                </View>
                <View style={styles.screenStyle1}>
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Credito') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('Credito')}>Credito</Text>
                </View>
                <View style={styles.screenStyle1}>
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Curiosita') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('Curiosita')}>Curiosità</Text>
                </View>
            </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
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
        fontSize: 20,
        marginLeft: 20, 
        textAlign: 'center'
    },
    selectedTextStyle: {
        fontWeight: 'bold',
        color: 'red'
    }
});