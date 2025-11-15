import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../models/RootParamsListModel';
import InfoListScreen from '../views/screens/InfoListScreen';
import InputInfoScreen from '../views/screens/InputInfoScreen';
import { DatabaseIcon, PlusCircle } from '../views/components/Icon';

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator 
                initialRouteName="InputInfo"
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: '#000000',
                    tabBarInactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen 
                    name="InputInfo" 
                    component={InputInfoScreen}
                    options={{ 
                        title: 'Input Info',
                        tabBarLabel: 'Add',
                        tabBarIcon: PlusCircle
                    }}
                />
                <Tab.Screen 
                    name="InfoList" 
                    component={InfoListScreen}
                    options={{ 
                        title: 'Info List',
                        tabBarLabel: 'List',
                        tabBarIcon: DatabaseIcon
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}