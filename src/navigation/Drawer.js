import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
// ACTIVITY
import Home from '../screen/Home';
import Categorie from '../screen/Categorie';
// LAYOUT
import DrawerLayout from '../navigation/DrawerLayout';


class NavigationDrawerStructure extends Component {
  // Struttura per il drawer navigation
  toggleDrawer = () => {
    // Props per aprire e chiudere il drawer
    this.props.navigationProps.toggleDrawer();
  };

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Image
            source={require('../assets/image/menu1.png')}
            style={{ width: 25, height: 25, marginLeft: 15 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
 
const DrawerNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      headerTitle: (
        <Image source={require('../assets/image/logo1.png')} style={{ width: 120, height: 30, marginLeft: 35 }} />
      ),
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: 'white',
      },
    }),
  },

  Mercato: {
    screen: Categorie,
    navigationOptions: ({ navigation }) => ({
      headerTitle: (
        <Image source={require('../assets/image/logo1.png')} style={{ width: 120, height: 30, marginLeft: 35 }} />
      ),
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: 'white',
      },
    }),
  },

  Credito: {
    screen: Categorie,
    navigationOptions: ({ navigation }) => ({
      headerTitle: (
        <Image source={require('../assets/image/logo1.png')} style={{ width: 120, height: 30, marginLeft: 35 }} />
      ),
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: 'white',
      },
    }),
  },

  Curiosita: {
    screen: Categorie,
    navigationOptions: ({ navigation }) => ({
      headerTitle: (
        <Image source={require('../assets/image/logo1.png')} style={{ width: 120, height: 30, marginLeft: 35 }} />
      ),
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: 'white',
      },
    }),
  },
});

const DrawerContainer = createDrawerNavigator(
    {
      DrawerNavigator: {
        screen: DrawerNavigator,
      }
    },
    {
      initialRouteName: 'DrawerNavigator',
      contentComponent: DrawerLayout
    }
)

export default DrawerContainer;