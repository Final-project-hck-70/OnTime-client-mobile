import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import {
    Ionicons,
    MaterialIcons,
    FontAwesome,
    MaterialCommunityIcons,
} from '@expo/vector-icons'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../config/authContext'
import { deleteKey } from '../helpers/secureStore'

export default function ProfileScreen() {
    const { setIsSignedIn, isSignedIn } = useContext(AuthContext)

    async function handleLogout() {
        try {
            await deleteKey('token')
            setIsSignedIn(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.topSection}>
                    <View style={styles.propicArea}>
                        <Image
                            source={{
                                uri: 'https://res.cloudinary.com/dzbexi0ka/image/upload/v1717160394/linkedin-app/zkcqrhodmukgin2okweo.jpg',
                            }}
                            style={styles.propic}
                        />
                    </View>
                    <Text style={styles.name}>Jhon Benedict</Text>
                    <Text style={styles.membership}>Manager</Text>
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
                            <Text style={styles.buttonName}>Hacktiv8</Text>
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
                            <Text style={styles.buttonName}>jhon@mail.com</Text>
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
                            <Text style={styles.buttonName}>083213839213</Text>
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
