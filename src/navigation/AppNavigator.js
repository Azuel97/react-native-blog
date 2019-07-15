import { createAppContainer, createStackNavigator } from 'react-navigation';
import DetailsScreen from '../screen/DetailsScreen';
import Drawer from './Drawer';

const AppNavigator = createStackNavigator(
    {
        Drawer: Drawer,
        DetailsScreen: DetailsScreen,
    },
    {
        initialRouteName: 'Drawer',
        headerMode: 'none'
    }
)

export default createAppContainer(AppNavigator);
