import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { formatTime, formattedDate } from '../helpers/helper'

export default function CardAttendance({ attendance }) {
    return (
        <View style={styles.infoCard}>
            <View style={styles.infoCardContent}>
                <Text style={styles.infoCardText}>
                    Date: {formattedDate(attendance.createdAt)}
                </Text>
                <Text style={styles.infoCardText}>
                    Clock In: {formatTime(attendance.clockIn)}
                </Text>
                <Text style={styles.infoCardText}>
                    Clock Out:{' '}
                    {attendance.clockOut
                        ? formatTime(attendance.clockOut)
                        : 'Not yet clocked out'}
                </Text>
                <Text style={styles.infoCardText}>
                    Absence Status: {attendance.attendanceStatus}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    infoCard: {
        width: '93%',
        height: 140,
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
