import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Alert,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import CardOvertime from '../components/CardOvertime'
import { getValueFor } from '../helpers/secureStore'
import { PUBLIC_URI } from '@env'

export default function OvertimeSubmissionScreen({ navigation }) {
    const [overtimeData, setOvertimeData] = useState([])

    const fetchOvertimeData = async () => {
        try {
            const token = await getValueFor('token')
            if (!token) {
                Alert.alert('Error', 'User not authenticated')
                return
            }

            const responseUser = await fetch(`${PUBLIC_URI}/users/profile/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })

            const dataUser = await responseUser.json()

            const response = await fetch(
                `${PUBLIC_URI}/overtimes/user/${dataUser.id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            const data = await response.json()
            console.log(data)

            if (response.status === 200) {
                setOvertimeData(data)
            } else {
                Alert.alert('Error', data.message || 'Something went wrong')
            }
        } catch (error) {
            console.error('Error:', error)
            Alert.alert('Error', 'Something went wrong')
        }
    }

    useEffect(() => {
        fetchOvertimeData()
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchOvertimeData()
        })
        return unsubscribe
    }, [navigation])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons
                    onPress={() => {
                        navigation.navigate('Report')
                    }}
                    name="chevron-back"
                    size={30}
                    color="white"
                    marginTop={40}
                    marginLeft={10}
                />
            </View>
            <View style={styles.absoluteContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Overtime Submission</Text>
                </View>
            </View>
            <View style={styles.buttonPlace}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('FormOvertime')}
                    style={styles.button}
                    activeOpacity={0.6}
                >
                    <Text style={styles.buttonText}>Add Overtime</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={overtimeData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <CardOvertime overtime={item} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: '100%',
        height: 150,
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
    buttonPlace: {
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        width: '35%',
        height: 40,
        backgroundColor: 'transparent',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 15,
        fontWeight: '600',
        color: 'black',
        textAlign: 'center',
    },
})
