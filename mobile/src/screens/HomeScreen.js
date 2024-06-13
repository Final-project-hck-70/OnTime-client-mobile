import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'

export default function HomeScreen() {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.header}></View>
            <View style={styles.absoluteContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>OnTime</Text>
                </View>
                <View style={styles.profileContainer}>
                    <Image
                        source={{
                            uri: 'https://res.cloudinary.com/dzbexi0ka/image/upload/v1717160394/linkedin-app/zkcqrhodmukgin2okweo.jpg',
                        }}
                        style={styles.profileImage}
                    />
                    <View>
                        <Text style={styles.profileText}>Hello, Jhon</Text>
                        <Text style={styles.profileRole}>Manager</Text>
                    </View>
                </View>
                <View style={styles.infoCard}>
                    <View style={styles.infoCardContent}>
                        <Text style={styles.infoCardText}>
                            11 June 2024, 09:22
                        </Text>
                        <Text style={styles.infoCardText}>
                            Must be absent before: 09:00
                        </Text>
                    </View>
                </View>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.button} activeOpacity={0.6}>
                        <Text style={styles.buttonText}>Clock In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} activeOpacity={0.6}>
                        <Text style={styles.buttonText}>Clock Out</Text>
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
        backgroundColor: 'red',
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
        backgroundColor: 'red',
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
})
