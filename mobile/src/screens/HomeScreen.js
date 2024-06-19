import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native'
import { getValueFor } from '../helpers/secureStore'

const formatTodayDate = () => {
    const today = new Date()

    const formattedDate = new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }).format(today)

    return formattedDate
}

const formatCurrentTime = () => {
    const now = new Date()
    const formattedTime = now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
    })
    return formattedTime
}

export default function HomeScreen() {
    const navigation = useNavigation()

    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [currentTime, setCurrentTime] = useState(formatCurrentTime())

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = await getValueFor('token')
                if (!token) {
                    Alert.alert('Error', 'User not authenticated')
                    return
                }
                const response = await fetch(
                    `${process.env.EXPO_PUBLIC_URI}/users/profile/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                const data = await response.json()
                console.log(data)
                setUserData(data)
            } catch (error) {
                console.error('Error fetching user data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchUserData()

        const intervalId = setInterval(() => {
            setCurrentTime(formatCurrentTime())
        }, 30000)

        return () => clearInterval(intervalId)
    }, [])

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#D50000" />
            </View>
        )
    }

    if (!userData) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Failed to load user data.</Text>
            </View>
        )
    }

    const currentDate = formatTodayDate()

    return (
        <View style={styles.container}>
            <View style={styles.header}></View>
            <View style={styles.absoluteContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>OnTime</Text>
                </View>
                <View style={styles.profileContainer}>
                    <Image
                        source={{ uri: userData.avaUrl }}
                        style={styles.profileImage}
                    />
                    <View>
                        <Text style={styles.profileText}>
                            Hello, {userData.name}
                        </Text>
                        <Text style={styles.profileRole}>
                            {userData.position}
                        </Text>
                    </View>
                </View>
                <View style={styles.infoCard}>
                    <View style={styles.infoCardContent}>
                        <Text style={styles.infoCardText}>
                            {currentDate}, {currentTime}
                        </Text>
                        <Text style={styles.infoCardText}>
                            Must clockIn before:{' '}
                            {new Date(
                                userData.Company.clockInTime
                            ).toLocaleTimeString()}
                        </Text>
                    </View>
                </View>
                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('ClockIn')}
                        activeOpacity={0.6}
                    >
                        <Text style={styles.buttonText}>Clock In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} activeOpacity={0.6}>
                        <Text
                            style={styles.buttonText}
                            onPress={() => navigation.navigate('ClockOut')}
                        >
                            Clock Out
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('OvertimeSubmission')
                        }
                        style={styles.button}
                        activeOpacity={0.6}
                    >
                        <Text style={styles.buttonText}>Overtime</Text>
                        <Text style={styles.buttonText}>Submission</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('LeaveSubmission')}
                        style={styles.button}
                        activeOpacity={0.6}
                    >
                        <Text style={styles.buttonText}>Leave</Text>
                        <Text style={styles.buttonText}>Submission</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: '100%',
        height: 360,
        backgroundColor: '#D50000',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    absoluteContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    titleContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 70,
    },
    title: {
        color: 'white',
        fontSize: 25,
        fontWeight: '900',
        textAlign: 'center',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 49,
        justifyContent: 'center',
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 10,
    },
    profileText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
    },
    profileRole: {
        color: 'white',
        fontSize: 22,
        fontWeight: '500',
    },
    infoCard: {
        width: '90%',
        height: 100,
        marginTop: 20,
        backgroundColor: '#f2f2f2',
        alignSelf: 'center',
        borderRadius: 20,
        marginBottom: 30,
    },
    infoCardContent: {
        width: '90%',
        marginTop: 20,
        gap: 20,
        justifyContent: 'space-between',
        alignSelf: 'center',
        alignItems: 'center',
    },
    infoCardText: {
        fontSize: 15,
        fontWeight: '600',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
    },
    button: {
        width: '45%',
        height: 160,
        backgroundColor: '#D50000',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
})
