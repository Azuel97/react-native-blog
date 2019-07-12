import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
// Importo le activity
import Home from '../screen/Home';
import Mercato from '../screen/Mercato';
import Curiosita from '../screen/Curiosita';
import Credito from '../screen/Credito';
// Importo il layout del drawer
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
            source={require('../image/menu1.png')}
            style={{ width: 25, height: 25, marginLeft: 15 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
 
const HomePage = createStackNavigator({
  First: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      headerTitle: (
        <Image source={require('../image/logo1.png')} style={{ width: 120, height: 30, marginLeft: 35 }} />
      ),
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: 'white',
      },
    }),
  },
});
 
const MercatoImmobiliare = createStackNavigator({
  Second: {
    screen: Mercato,
    navigationOptions: ({ navigation }) => ({
      headerTitle: (
        <Image source={require('../image/logo1.png')} style={{ width: 120, height: 30, marginLeft: 35 }} />
      ),
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: 'white',
      },
    }),
  },
});

const CreditoPage = createStackNavigator({
  Third: {
    screen: Credito,
    navigationOptions: ({ navigation }) => ({
      headerTitle: (
        <Image source={require('../image/logo1.png')} style={{ width: 120, height: 30, marginLeft: 35 }} />
      ),
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: 'white',
      },
    }),
  },
});

const CuriositaPage = createStackNavigator({
  Four: {
    screen: Curiosita,
    navigationOptions: ({ navigation }) => ({
      headerTitle: (
        <Image source={require('../image/logo1.png')} style={{ width: 120, height: 30, marginLeft: 35 }} />
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
        Home: {
          screen: HomePage,
        },
        Mercato: {
          screen: MercatoImmobiliare,
        },
        Credito: {
          screen: CreditoPage,
        },
        Curiosita: {
          screen: CuriositaPage,
        },
    },
    {
        initialRouteName: 'Home',
        contentComponent: DrawerLayout
    }
)

export default DrawerContainer;