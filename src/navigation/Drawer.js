import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import Home from '../screen/Home';
import Mercato from '../screen/Mercato';
import Curiosita from '../screen/Curiosita';
import Credito from '../screen/Credito';
import DrawerLayout from '../navigation/DrawerLayout';


class NavigationDrawerStructure extends Component {
  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
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
      headerTitleStyle: {
        fontFamily: 'San Francisco',
        fontSize: 24
      },
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: 'white',
      },
      // Color title
      headerTintColor: 'black'
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
      headerTitleStyle: {
        fontFamily: 'San Francisco',
        fontSize: 24
      },
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: 'white',
      },
      // Color title
      headerTintColor: 'black'
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
      headerTitleStyle: {
        fontFamily: 'San Francisco',
        fontSize: 24
      },
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: 'white',
      },
      // Color title
      headerTintColor: 'black'
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
      headerTitleStyle: {
        fontFamily: 'San Francisco',
        fontSize: 24
      },
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: 'white',
      },
      // Color title
      headerTintColor: 'black'
    }),
  },
});

const DrawerContainer = createDrawerNavigator(
    {
        Home: {
            //Title
            screen: HomePage,
            navigationOptions: {
              drawerLabel: 'Home',
             },
        },
        Mercato: {
            //Title
            screen: MercatoImmobiliare,
            navigationOptions: {
              drawerLabel: 'Mercato Immobiliare',
            },
        },
        Credito: {
          //Title
          screen: CreditoPage,
          navigationOptions: {
            drawerLabel: 'Credito',
          },
        },
        Curiosita: {
          //Title
          screen: CuriositaPage,
          navigationOptions: {
            drawerLabel: 'Curiosità',
          },
        },
    },
    {
        initialRouteName: 'Home',
        contentComponent: DrawerLayout,
        contentOptions: {
            activeTintColor: 'red',
        }
    }
)

export default DrawerContainer;