import MainStack from './src/navigators/MainStack'
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
    return (
        <NavigationContainer>
            <MainStack />
        </NavigationContainer>
    )
}
