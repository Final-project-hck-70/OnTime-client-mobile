import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeTab from './HomeTab'
import LeaveSubmissionScreen from '../screens/LeaveSubmissionScreen'
import OvertimeSubmissionScreen from '../screens/OvertimeSubmissionScreen'
import FormLeaveScreen from '../screens/FormLeaveScreen'
import FormOvertimeScreen from '../screens/FormOvertimeScreen'
import LoginScreen from '../screens/LoginScreen'

const Stack = createNativeStackNavigator()

export default function MainStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
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
            <Stack.Screen
                name="FormLeave"
                component={FormLeaveScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="FormOvertime"
                component={FormOvertimeScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
