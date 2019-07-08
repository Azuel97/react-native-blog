import { createAppContainer, createStackNavigator } from 'react-navigation';
import DetailsScreen from '../screen/DetailsScreen';
import Drawer from './Drawer';
import Home from '../screen/Home';
import Mercato from '../screen/Mercato';
import Curiosita from '../screen/Curiosita';
import Credito from '../screen/Credito';

const AppNavigator = createStackNavigator(
    {
        Home: Home,
        Mercato: Mercato,
        Curiosita: Curiosita,
        Credito: Credito,
        Drawer: Drawer,
        DetailsScreen: DetailsScreen,
    },
    {
        initialRouteName: 'Drawer',
        headerMode: 'none'
    }
)

export default createAppContainer(AppNavigator);
