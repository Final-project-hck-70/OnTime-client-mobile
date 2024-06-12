import { useNavigation } from '@react-navigation/native'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

export default function ReportScreen() {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.header}></View>
            <View style={styles.absoluteContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Report</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.infoCard} activeOpacity={0.6}>
                <View style={styles.infoCardContent}>
                    <Text style={styles.infoCardText}>Overtime Submission</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('LeaveSubmission')}
                style={styles.infoCard}
                activeOpacity={0.6}
            >
                <View style={styles.infoCardContent}>
                    <Text style={styles.infoCardText}>Leave Submission</Text>
                </View>
            </TouchableOpacity>
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
    infoCard: {
        width: '93%',
        height: 140,
        marginTop: 10,
        backgroundColor: 'black',
        alignSelf: 'center',
        borderRadius: 20,
        justifyContent: 'center',
    },
    infoCardContent: {
        width: '100%',
    },
    infoCardText: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
    },
})
