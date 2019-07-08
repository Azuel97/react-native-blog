// //This is an example code for NavigationDrawer//
// import React, { Component } from 'react';
// //import react in our code.
// import { View, Image, TouchableOpacity } from 'react-native';
// import { createDrawerNavigator, createStackNavigator, createAppContainer, StackNavigator } from 'react-navigation';
//  // Import screen
// import Home from './src/screen/Home';
// import Mercato from './src/screen/Mercato';
// import Credito from './src/screen/Credito';
// import DetailsScreen from './src/screen/DetailsScreen';
 
// class NavigationDrawerStructure extends Component {
//   //Structure for the navigatin Drawer
//   toggleDrawer = () => {
//     //Props to open/close the drawer
//     this.props.navigationProps.toggleDrawer();
//   };
//   render() {
//     return (
//       <View style={{ flexDirection: 'row' }}>
//         <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
//           <Image
//             source={require('./src/image/menu1.png')}
//             style={{ width: 25, height: 25, marginLeft: 15 }}
//           />
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }
 
// const HomePage = createStackNavigator({
//   First: {
//     screen: Home,
//     navigationOptions: ({ navigation }) => ({
//       headerTitle: (
//         <Image source={require('./src/image/logo1.png')} style={{ width: 120, height: 30, marginLeft: 35 }} />
//       ),
//       headerTitleStyle: {
//         fontFamily: 'San Francisco',
//         fontSize: 24
//       },
//       headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
//       headerStyle: {
//         backgroundColor: 'white',
//       },
//       // Color title
//       headerTintColor: 'black',
//     }),
//   },
// });
 
// const MercatoImmobiliare = createStackNavigator({
//   Second: {
//     screen: Mercato,
//     navigationOptions: ({ navigation }) => ({
//       headerTitle: (
//         <Image source={require('./src/image/logo1.png')} style={{ width: 120, height: 30, marginLeft: 35 }} />
//       ),
//       headerTitleStyle: {
//         fontFamily: 'San Francisco',
//         fontSize: 24
//       },
//       headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
//       headerStyle: {
//         backgroundColor: 'white',
//       },
//       // Color title
//       headerTintColor: 'black',
//     }),
//   },
// });

// const CreditoPage = createStackNavigator({
//   Third: {
//     screen: Credito,
//     navigationOptions: ({ navigation }) => ({
//       headerTitle: (
//         <Image source={require('./src/image/logo1.png')} style={{ width: 120, height: 30, marginLeft: 35 }} />
//       ),
//       headerTitleStyle: {
//         fontFamily: 'San Francisco',
//         fontSize: 24
//       },
//       headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
//       headerStyle: {
//         backgroundColor: 'white',
//       },
//       // Color title
//       headerTintColor: 'black',
//     }),
//   },
// });

 
// const RouteConfigs = {
//   //Drawer Optons and indexing
//   Home: {
//     //Title
//     screen: HomePage,
//     navigationOptions: {
//       drawerLabel: 'Home',
//     },
//   },
//   Mercato: {
//     //Title
//     screen: MercatoImmobiliare,
//     navigationOptions: {
//       drawerLabel: 'Mercato Immobiliare',
//     },
//   },
//   Credito: {
//     //Title
//     screen: CreditoPage,
//     navigationOptions: {
//       drawerLabel: 'Credito',
//     },
//   },

// };

// const DrawerNavigatorConfig = {
//   contentOptions: {
//     activeTintColor: 'red',
//   },
//   drawerBackgroundColor: '#F2F2F2'
// };

// const Navigator = createDrawerNavigator(RouteConfigs, DrawerNavigatorConfig);

// export default createAppContainer(Navigator);






import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './src/navigation/AppNavigator';

const AppContainer = createAppContainer(AppNavigator)

export default class App extends Component {
  render() {
    return <AppContainer />
  }
}