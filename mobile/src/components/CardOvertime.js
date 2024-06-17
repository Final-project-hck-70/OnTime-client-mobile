import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function CardOvertime({ overtime }) {
    return (
        <View style={styles.infoCard}>
            <View style={styles.infoCardContent}>
                <Text style={styles.infoCardText}>
                    Reason Overtime: {overtime.overtimeReason}
                </Text>
                <Text style={styles.infoCardText}>
                    Duration Overtime: {overtime.overtimeDuration}
                </Text>
                <Text style={styles.infoCardText}>
                    Overtime Status: {overtime.overtimeStatus}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    infoCard: {
        width: '93%',
        height: 114,
        marginTop: 10,
        backgroundColor: 'black',
        alignSelf: 'center',
        borderRadius: 20,
    },
    infoCardContent: {
        width: '90%',
        marginTop: 20,
        gap: 5,
        justifyContent: 'space-between',
        marginLeft: 20,
    },
    infoCardText: {
        fontSize: 15,
        fontWeight: '600',
        color: 'white',
    },
})
