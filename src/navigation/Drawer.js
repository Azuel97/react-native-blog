import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
// Importo le activity
import Home from '../screen/Home';
// Importo il layout del drawer
import DrawerLayout from '../navigation/DrawerLayout';
import Categorie from '../screen/Categorie';

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
 
const HomePage = createStackNavigator({
  First: {
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
});

const DrawerContainer = createDrawerNavigator(
    {
        Home: {
          screen: HomePage,
        }
    },
    {
        initialRouteName: 'Home',
        contentComponent: DrawerLayout
    }
)

export default DrawerContainer;