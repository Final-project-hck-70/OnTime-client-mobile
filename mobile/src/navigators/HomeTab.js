import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import { Entypo, AntDesign } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

export default function HomeTab() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Ontime"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Entypo name="home" size={28} color="black" />
                        ) : (
                            <AntDesign name="home" size={28} color="black" />
                        ),
                }}
            />
        </Tab.Navigator>
    )
}
