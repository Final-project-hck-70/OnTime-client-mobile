import { useEffect, useState } from 'react'
import MainStack from './src/navigators/MainStack'
import { NavigationContainer } from '@react-navigation/native'
import { getValueFor } from './src/helpers/secureStore'
import { AuthContext } from './src/config/authContext'

export default function App() {
    const [isSignedIn, setIsSignedIn] = useState(false)

    useEffect(() => {
        getValueFor('token').then((result) => {
            if (result) {
                setIsSignedIn(true)
            }
        })
    }, [])

    return (
        <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
            <NavigationContainer>
                <MainStack />
            </NavigationContainer>
        </AuthContext.Provider>
    )
}
