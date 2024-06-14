import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
    Alert,
} from 'react-native'
import { MaterialIcons, Entypo } from '@expo/vector-icons'
import { useContext, useState } from 'react'
import { AuthContext } from '../config/authContext'
import { save } from '../helpers/secureStore'

export default function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setIsSignedIn } = useContext(AuthContext)

    const handleLogin = async () => {
        try {
            const response = await fetch(
                'https://452f-2405-8180-403-db32-cc1b-14ed-b012-2e5c.ngrok-free.app/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                }
            )

            const data = await response.json()

            if (response.status === 200) {
                await save('token', data.token)
                setIsSignedIn(true)
            } else {
                Alert.alert('Error', data.message)
            }
        } catch (error) {
            console.error('Error:', error)
            Alert.alert('Error', 'Something went wrong')
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.titleLogo}>OnTime</Text>
            </View>

            <KeyboardAvoidingView>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Log In To Your Account</Text>
                </View>

                <View>
                    <View style={styles.inputContainer}>
                        <MaterialIcons
                            style={styles.icon}
                            name="email"
                            size={24}
                            color="black"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Your Email"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Entypo
                            style={styles.icon}
                            name="lock"
                            size={24}
                            color="black"
                        />
                        <TextInput
                            secureTextEntry={true}
                            style={styles.input}
                            placeholder="Enter Your Password"
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    <View style={styles.optionsContainer}>
                        <Text>Keep me logged in</Text>
                        <Text style={styles.forgotPassword}>
                            Forgot Password?
                        </Text>
                    </View>

                    <Pressable onPress={handleLogin} style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleLogo: {
        fontSize: 50,
        fontWeight: '900',
        marginBottom: 20,
    },
    titleContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: '#E0E0E0',
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 30,
    },
    icon: {
        marginLeft: 8,
    },
    input: {
        marginVertical: 10,
        width: 300,
        color: 'gray',
    },
    optionsContainer: {
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    forgotPassword: {
        color: 'red',
        fontWeight: '500',
    },
    loginButton: {
        width: 200,
        backgroundColor: 'red',
        borderRadius: 6,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 15,
        marginTop: 30,
    },
    loginButtonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerButton: {
        marginTop: 15,
    },
    registerButtonText: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 16,
    },
})
