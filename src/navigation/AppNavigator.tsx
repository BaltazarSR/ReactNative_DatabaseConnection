import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../models/RootParamsListModel';
import InfoListScreen from '../views/screens/InfoListScreen';
import InputInfoScreen from '../views/screens/InputInfoScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="InfoList"
            >
                <Stack.Screen 
                    name="InfoList" 
                    component={InfoListScreen}
                    options={{ 
                        headerShown: false,
                        title: 'Info List Screen' 
                    }}
                />
                <Stack.Screen 
                    name="InputInfo" 
                    component={InputInfoScreen}
                    options={{ 
                        headerShown: false,
                        title: 'Input Info Screen' 
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}