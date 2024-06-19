import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function CardOvertime({ overtime }) {
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: 'long', year: 'numeric' }
        return new Intl.DateTimeFormat('id-ID', options).format(
            new Date(dateString)
        )
    }

    return (
        <View style={styles.infoCard}>
            <View style={styles.infoCardContent}>
                <Text style={styles.infoCardText}>
                    Reason Overtime: {overtime.overtimeReason}
                </Text>
                <Text style={styles.infoCardText}>
                    Duration Overtime: {overtime.overtimeDuration} minutes
                </Text>
                <Text style={styles.infoCardText}>
                    Overtime Status: {overtime.overtimeStatus}
                </Text>
                <Text style={styles.infoCardText}>
                    Overtime Date: {formatDate(overtime.overtimeDate)}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    infoCard: {
        width: '93%',
        height: 130,
        marginTop: 10,
        backgroundColor: 'gray',
        alignSelf: 'center',
        borderRadius: 20,
        padding: 10,
    },
    infoCardContent: {
        width: '90%',
        marginTop: 5,
        gap: 5,
        justifyContent: 'space-between',
        marginLeft: 10,
    },
    infoCardText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#FFF',
    },
})
