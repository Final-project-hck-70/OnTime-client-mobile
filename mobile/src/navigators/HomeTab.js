import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import { Entypo, AntDesign, Octicons, FontAwesome5 } from '@expo/vector-icons'
import HistoryScreen from '../screens/HistoryScreen'

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
            <Tab.Screen
                name="History"
                component={HistoryScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'History',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <FontAwesome5
                                name="history"
                                size={26}
                                color="black"
                            />
                        ) : (
                            <Octicons name="history" size={26} color="black" />
                        ),
                }}
            />
        </Tab.Navigator>
    )
}
