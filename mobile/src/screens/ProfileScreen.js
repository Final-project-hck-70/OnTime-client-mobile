import React, { useContext, useEffect, useState } from 'react'
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert,
} from 'react-native'
import {
    Ionicons,
    MaterialIcons,
    FontAwesome,
    MaterialCommunityIcons,
} from '@expo/vector-icons'
import { AuthContext } from '../config/authContext'
import { deleteKey, getValueFor } from '../helpers/secureStore'

export default function ProfileScreen() {
    const { setIsSignedIn } = useContext(AuthContext)
    const [userData, setUserData] = useState(null)

    async function handleLogout() {
        try {
            await deleteKey('token')
            setIsSignedIn(false)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchUserData = async () => {
        try {
            const token = await getValueFor('token')
            if (!token) {
                Alert.alert('Error', 'User not authenticated')
                return
            }

            const response = await fetch(
                'https://088f-2405-8180-403-db32-9cb0-2322-6dec-462.ngrok-free.app/users/profile/me',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            const data = await response.json()

            if (response.status === 200) {
                setUserData(data)
            } else {
                Alert.alert('Error', data.message || 'Something went wrong')
            }
        } catch (error) {
            console.error('Error:', error)
            Alert.alert('Error', 'Something went wrong')
        }
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.topSection}>
                    <View style={styles.propicArea}>
                        <Image
                            source={{
                                uri:
                                    userData?.avaUrl ||
                                    'default-image-url-here',
                            }}
                            style={styles.propic}
                        />
                    </View>
                    <Text style={styles.name}>{userData?.name || 'Name'}</Text>
                    <Text style={styles.membership}>
                        {userData?.role || 'Role'}
                    </Text>
                </View>

                <View style={styles.buttonList}>
                    <TouchableOpacity
                        style={styles.buttonSection}
                        activeOpacity={0.9}
                    >
                        <View style={styles.buttonArea}>
                            <FontAwesome
                                name="building"
                                size={28}
                                marginLeft={40}
                                color="white"
                            />
                            <Text style={styles.buttonName}>
                                {userData?.Company?.name || 'Company'}
                            </Text>
                        </View>
                        <View style={styles.sp}></View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonSection}
                        activeOpacity={0.9}
                    >
                        <View style={styles.buttonArea}>
                            <MaterialIcons
                                name="email"
                                size={28}
                                marginLeft={40}
                                color="white"
                            />
                            <Text style={styles.buttonName}>
                                {userData?.email || 'Email'}
                            </Text>
                        </View>
                        <View style={styles.sp}></View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonSection}
                        activeOpacity={0.9}
                    >
                        <View style={styles.buttonArea}>
                            <Ionicons
                                name="phone-portrait"
                                size={30}
                                marginLeft={35}
                                color="white"
                            />
                            <Text style={styles.buttonName}>
                                {userData?.phoneNumber || 'Phone'}
                            </Text>
                        </View>
                        <View style={styles.sp}></View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonSection}
                        activeOpacity={0.9}
                        onPress={handleLogout}
                    >
                        <View style={styles.buttonArea}>
                            <MaterialCommunityIcons
                                name="logout"
                                size={30}
                                marginLeft={40}
                                color="white"
                            />
                            <Text style={styles.buttonName}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    safeArea: {
        flex: 1,
    },
    topSection: {
        height: 350,
        justifyContent: 'center',
        alignItems: 'center',
    },
    propicArea: {
        width: 170,
        height: 170,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: 'red',
    },
    propic: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
    },
    name: {
        marginTop: 20,
        color: 'white',
        fontSize: 32,
    },
    membership: {
        color: 'red',
        fontSize: 18,
    },
    buttonList: {
        marginTop: 20,
    },
    buttonSection: {
        paddingTop: 10,
        paddingBottom: 5,
        paddingLeft: 25,
        paddingRight: 25,
    },
    buttonArea: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonName: {
        width: 300,
        fontSize: 20,
        color: 'white',
        marginLeft: 20,
    },
    sp: {
        width: 310,
        marginTop: 10,
        height: 1,
        backgroundColor: '#FFFFFF45',
    },
})
