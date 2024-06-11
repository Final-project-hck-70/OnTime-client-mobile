import React, { useState } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { Picker } from '@react-native-picker/picker'

export default function HistoryScreen() {
    const [selectedMonth, setSelectedMonth] = useState('')
    const [selectedYear, setSelectedYear] = useState('')

    return (
        <View style={styles.container}>
            <View style={styles.header}></View>
            <View style={styles.absoluteContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>History</Text>
                </View>
                <View style={styles.infoCardHeader}>
                    <View style={styles.infoCardContentHeader}>
                        <Text style={styles.infoCardTextHeader}>
                            Absence Total:
                        </Text>
                        <Text style={styles.infoCardTextHeader}>
                            Late Clock In:
                        </Text>
                        <Text style={styles.infoCardTextHeader}>
                            Late Clock Out:
                        </Text>
                        <Text style={styles.infoCardTextHeader}>
                            No Clock In:
                        </Text>
                        <Text style={styles.infoCardTextHeader}>
                            No Clock Out:
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.pickerContainer}>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={selectedMonth}
                        style={styles.picker}
                        onValueChange={(itemValue) =>
                            setSelectedMonth(itemValue)
                        }
                        mode="dropdown"
                        dropdownIconColor="black"
                    >
                        <Picker.Item label="Month" value="" />
                        <Picker.Item label="January" value="January" />
                        <Picker.Item label="February" value="February" />
                        <Picker.Item label="March" value="March" />
                        <Picker.Item label="April" value="April" />
                        <Picker.Item label="May" value="May" />
                        <Picker.Item label="June" value="June" />
                        <Picker.Item label="July" value="July" />
                        <Picker.Item label="August" value="August" />
                        <Picker.Item label="September" value="September" />
                        <Picker.Item label="October" value="October" />
                        <Picker.Item label="November" value="November" />
                        <Picker.Item label="December" value="December" />
                    </Picker>
                </View>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={selectedYear}
                        style={styles.picker}
                        onValueChange={(itemValue) =>
                            setSelectedYear(itemValue)
                        }
                        mode="dropdown"
                        dropdownIconColor="black"
                    >
                        <Picker.Item label="Year" value="" />
                        <Picker.Item label="2020" value="2020" />
                        <Picker.Item label="2021" value="2021" />
                        <Picker.Item label="2022" value="2022" />
                        <Picker.Item label="2023" value="2023" />
                        <Picker.Item label="2024" value="2024" />
                    </Picker>
                </View>
            </View>
            <Text style={styles.textList}>List History of Attendence</Text>
            <ScrollView>
                <View style={styles.infoCard}>
                    <View style={styles.infoCardContent}>
                        <Text style={styles.infoCardText}>Date:</Text>
                        <Text style={styles.infoCardText}>Clock In:</Text>
                        <Text style={styles.infoCardText}>Clock Out:</Text>
                        <Text style={styles.infoCardText}>Absence Status:</Text>
                    </View>
                </View>
                <View style={styles.infoCard}>
                    <View style={styles.infoCardContent}>
                        <Text style={styles.infoCardText}>Date:</Text>
                        <Text style={styles.infoCardText}>Clock In:</Text>
                        <Text style={styles.infoCardText}>Clock Out:</Text>
                        <Text style={styles.infoCardText}>Absence Status:</Text>
                    </View>
                </View>
                <View style={styles.infoCard}>
                    <View style={styles.infoCardContent}>
                        <Text style={styles.infoCardText}>Date:</Text>
                        <Text style={styles.infoCardText}>Clock In:</Text>
                        <Text style={styles.infoCardText}>Clock Out:</Text>
                        <Text style={styles.infoCardText}>Absence Status:</Text>
                    </View>
                </View>
                <View style={styles.infoCard2}>
                    <View style={styles.infoCardContent}>
                        <Text style={styles.infoCardText}>Date:</Text>
                        <Text style={styles.infoCardText}>Clock In:</Text>
                        <Text style={styles.infoCardText}>Clock Out:</Text>
                        <Text style={styles.infoCardText}>Absence Status:</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: '100%',
        height: 260,
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
    infoCardHeader: {
        width: '90%',
        height: 120,
        marginTop: 20,
        backgroundColor: '#f2f2f2',
        alignSelf: 'center',
        borderRadius: 20,
        marginBottom: 30,
    },
    infoCardContentHeader: {
        width: '90%',
        marginTop: 10,
        justifyContent: 'space-between',
        marginLeft: 20,
    },
    infoCardTextHeader: {
        fontSize: 15,
        fontWeight: '600',
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    pickerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        width: '45%',
    },
    picker: {
        flex: 1,
    },
    textList: {
        fontWeight: '600',
        fontSize: 18,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    infoCard: {
        width: '93%',
        height: 140,
        marginTop: 10,
        backgroundColor: 'black',
        alignSelf: 'center',
        borderRadius: 20,
    },
    infoCard2: {
        width: '93%',
        height: 140,
        marginTop: 10,
        marginBottom: 10,
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
