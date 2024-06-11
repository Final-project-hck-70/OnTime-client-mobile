import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import {
    Entypo,
    AntDesign,
    Octicons,
    FontAwesome5,
    MaterialIcons,
    FontAwesome,
} from '@expo/vector-icons'
import HistoryScreen from '../screens/HistoryScreen'
import ReportScreen from '../screens/ReportScreen'
import ProfileScreen from '../screens/ProfileScreen'

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
            <Tab.Screen
                name="Report"
                component={ReportScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Report',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <MaterialIcons
                                name="report"
                                size={35}
                                color="black"
                            />
                        ) : (
                            <MaterialIcons
                                name="report-gmailerrorred"
                                size={35}
                                color="black"
                            />
                        ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Profile',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <FontAwesome name="user" size={32} color="black" />
                        ) : (
                            <FontAwesome
                                name="user-o"
                                size={28}
                                color="black"
                            />
                        ),
                }}
            />
        </Tab.Navigator>
    )
}
