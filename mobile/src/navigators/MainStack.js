import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeTab from './HomeTab'
import LeaveSubmissionScreen from '../screens/LeaveSubmissionScreen'

const Stack = createNativeStackNavigator()

export default function MainStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MainPage"
                component={HomeTab}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="LeaveSubmission"
                component={LeaveSubmissionScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
