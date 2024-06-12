import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeTab from './HomeTab'
import LeaveSubmissionScreen from '../screens/LeaveSubmissionScreen'
import OvertimeSubmissionScreen from '../screens/OvertimeSubmissionScreen'

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
            <Stack.Screen
                name="OvertimeSubmission"
                component={OvertimeSubmissionScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
