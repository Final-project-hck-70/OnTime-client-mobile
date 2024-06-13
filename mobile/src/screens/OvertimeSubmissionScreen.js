import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function OvertimeSubmissionScreen({ navigation }) {
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
            <View style={styles.infoCard}>
                <View style={styles.infoCardContent}>
                    <Text style={styles.infoCardText}>Reason Overtime:</Text>
                    <Text style={styles.infoCardText}>Duration Overtime:</Text>
                    <Text style={styles.infoCardText}>Overtime Status:</Text>
                </View>
            </View>
            <View style={styles.infoCard}>
                <View style={styles.infoCardContent}>
                    <Text style={styles.infoCardText}>Reason Overtime:</Text>
                    <Text style={styles.infoCardText}>Duration Overtime:</Text>
                    <Text style={styles.infoCardText}>Overtime Status:</Text>
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
        height: 150,
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
        height: 41,
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
