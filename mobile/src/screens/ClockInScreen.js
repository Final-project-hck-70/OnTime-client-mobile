import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { useNavigation } from '@react-navigation/native'
import { getValueFor } from '../helpers/secureStore'
import haversine from 'haversine'
import { PUBLIC_URI } from '@env'

const ClockInScreen = () => {
    const navigation = useNavigation()
    const [location, setLocation] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
    const [companyLocation, setCompanyLocation] = useState(null)
    const [distance, setDistance] = useState(null)

    useEffect(() => {
        fetchCompanyLocation()
        getLocation()
    }, [])

    const fetchCompanyLocation = async () => {
        try {
            const token = await getValueFor('token')
            const response = await fetch(`${PUBLIC_URI}/users/profile/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (!response.ok) {
                throw new Error('Failed to fetch company location')
            }
            const data = await response.json()
            const companyLatitude = data?.Company?.latitude
            const companyLongitude = data?.Company?.longitude
            if (companyLatitude && companyLongitude) {
                setCompanyLocation({
                    latitude: parseFloat(companyLatitude),
                    longitude: parseFloat(companyLongitude),
                })
            } else {
                throw new Error('Company location not found')
            }
        } catch (error) {
            console.error('Error fetching company location:', error)
            Alert.alert('Error', 'Failed to load company location')
        }
    }

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied')
            return
        }

        let currentLocation = await Location.getCurrentPositionAsync({})
        setLocation(currentLocation.coords)
    }

    const handleClockIn = async () => {
        try {
            if (!location || !companyLocation) {
                Alert.alert('Error', 'Location data not available')
                return
            }

            const { latitude, longitude } = location
            const start = { latitude, longitude }
            const end = {
                latitude: companyLocation.latitude,
                longitude: companyLocation.longitude,
            }
            const dist = haversine(start, end)

            // Adjust the distance threshold as per your requirement
            const distanceThreshold = 1.0 // in kilometers

            if (dist > distanceThreshold) {
                Alert.alert('Error', 'You are not within the company location')
                return
            }

            // If distance is within threshold, proceed to clock in
            const token = await getValueFor('token')
            const response = await fetch(`${PUBLIC_URI}/attendances`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            })

            if (!response.ok) {
                throw new Error('Failed to clock in')
            }

            const data = await response.json()
            console.log('Clock in success:', data)
            Alert.alert('Success', 'You have successfully clocked in', [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('History'),
                },
            ])
        } catch (error) {
            console.log('Error clocking in:', error)
            Alert.alert('Error', 'You already clock in today')
        }
    }

    if (!location || !companyLocation) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                    }}
                />
                {companyLocation && (
                    <Marker
                        coordinate={{
                            latitude: companyLocation.latitude,
                            longitude: companyLocation.longitude,
                        }}
                        pinColor="blue"
                    />
                )}
            </MapView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleClockIn}>
                    <Text style={styles.buttonText}>Clock In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'red' }]}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
            {distance !== null && (
                <Text style={styles.distanceText}>
                    Distance to Company: {distance.toFixed(2)} km
                </Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'green',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    distanceText: {
        position: 'absolute',
        top: 20,
        alignSelf: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        elevation: 5,
    },
})

export default ClockInScreen
