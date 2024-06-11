import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeTab from './HomeTab'

const Stack = createNativeStackNavigator()

export default function MainStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MainPage"
                component={HomeTab}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
