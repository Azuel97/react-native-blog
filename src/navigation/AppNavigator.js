import { createAppContainer, createStackNavigator } from 'react-navigation';
import DetailsScreen from '../screen/DetailsScreen';
import Drawer from './Drawer';
import Categorie from '../screen/Categorie';

const AppNavigator = createStackNavigator(
    {
        Drawer: Drawer,
        DetailsScreen: DetailsScreen,
        // AppFlow: createStackNavigator({
        //     Mercato: Categorie,
        //     // Credito: Categorie,
        //     // Curiosita: Categorie
        // }),
        Mercato: Categorie,
        Credito: Categorie,
        Curiosita: Categorie,
    },
    {
        initialRouteName: 'Drawer',
        headerMode: 'none'
    }
)

export default createAppContainer(AppNavigator);