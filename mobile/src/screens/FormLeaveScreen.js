import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Alert,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
import { getValueFor } from '../helpers/secureStore'

export default function FormLeaveScreen({ navigation }) {
    const [date, setDate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())
    const [show, setShow] = useState(false)
    const [showTo, setShowTo] = useState(false)
    const [mode, setMode] = useState('date')
    const [fromDateText, setFromDateText] = useState('From')
    const [toDateText, setToDateText] = useState('To')
    const [leaveReason, setLeaveReason] = useState('')
    const [userList, setUserList] = useState([])
    const [selectedUser, setSelectedUser] = useState('')
    const [userCompanyId, setUserCompanyId] = useState(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = await getValueFor('token')
                if (!token) {
                    Alert.alert('Error', 'User not authenticated')
                    return
                }

                // Fetch user profile to get CompanyId
                const profileResponse = await fetch(
                    `${process.env.EXPO_PUBLIC_URI}/users/profile/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                if (!profileResponse.ok) {
                    throw new Error('Failed to fetch user profile')
                }

                const profileData = await profileResponse.json()
                const { CompanyId } = profileData
                setUserCompanyId(CompanyId)

                // Fetch users and filter by CompanyId
                const response = await fetch(
                    `${process.env.EXPO_PUBLIC_URI}/users`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                if (!response.ok) {
                    throw new Error('Failed to fetch user list')
                }
                const data = await response.json()
                console.log(data)

                // Filter users by CompanyId
                const filteredUsers = data.filter(
                    (user) => user.CompanyId === CompanyId
                )
                setUserList(filteredUsers)
            } catch (error) {
                console.error('Error fetching user list:', error)
                Alert.alert('Error', 'Failed to fetch user list')
            }
        }

        fetchUsers()
    }, [])

    const onChangeFrom = (e, selectedDate) => {
        const currentDate = selectedDate || date
        setShow(false)
        setDate(currentDate)
        setFromDateText(formatDate(currentDate))
    }

    const onChangeTo = (e, selectedDate) => {
        const currentDate = selectedDate || toDate
        setShowTo(false)
        setToDate(currentDate)
        setToDateText(formatDate(currentDate))
    }

    const showMode = (modeToShow) => {
        setShow(true)
        setMode(modeToShow)
    }

    const showToMode = (modeToShow) => {
        setShowTo(true)
        setMode(modeToShow)
    }

    const formatDate = (date) => {
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        if (day < 10) day = `0${day}`
        if (month < 10) month = `0${month}`

        return `${year}/${month}/${day}`
    }

    const handleSubmit = async () => {
        try {
            const token = await getValueFor('token')
            if (!token) {
                Alert.alert('Error', 'User not authenticated')
                return
            }

            const delegateUser = userList.find(
                (user) => user.name === selectedUser
            )
            const DelegateUserId = delegateUser ? delegateUser.id : null

            if (!DelegateUserId) {
                Alert.alert('Error', 'Delegate user not found')
                return
            }

            const response = await fetch(
                `${process.env.EXPO_PUBLIC_URI}/leaves`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        from: date.toISOString().split('T')[0],
                        to: toDate.toISOString().split('T')[0],
                        reason: leaveReason,
                        DelegateUserId,
                    }),
                }
            )

            const data = await response.json()
            console.log(data)
            navigation.navigate('LeaveSubmission')
            if (response.status === 201) {
            } else {
                Alert.alert('Error', data.message || 'Something went wrong')
            }
        } catch (error) {
            console.error('Error', error)
            Alert.alert('Error', 'Something went wrong')
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons
                    onPress={() => {
                        navigation.navigate('LeaveSubmission')
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
                    <Text style={styles.title}>Form Leave</Text>
                </View>
            </View>
            <View style={styles.inputBox}>
                <TouchableOpacity
                    onPress={() => showMode('date')}
                    style={styles.inputContainer2}
                    activeOpacity={0.6}
                >
                    <Text style={styles.input}>{fromDateText}</Text>
                </TouchableOpacity>
            </View>
            {show && (
                <DateTimePicker
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChangeFrom}
                />
            )}
            <View style={styles.inputBox}>
                <TouchableOpacity
                    onPress={() => showToMode('date')}
                    style={styles.inputContainer2}
                    activeOpacity={0.6}
                >
                    <Text style={styles.input}>{toDateText}</Text>
                </TouchableOpacity>
            </View>
            {showTo && (
                <DateTimePicker
                    value={toDate}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChangeTo}
                />
            )}
            <View style={styles.inputBox}>
                <View style={styles.inputContainer3}>
                    <Picker
                        selectedValue={selectedUser}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedUser(itemValue)
                        }
                        style={styles.input2}
                        dropdownIconColor="white"
                    >
                        <Picker.Item label="Select Delegate" value="" />
                        {userList.map((user) => (
                            <Picker.Item
                                key={user.id}
                                label={user.name}
                                value={user.name}
                            />
                        ))}
                    </Picker>
                </View>
            </View>
            <View style={styles.inputBox}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Reason Leave"
                        placeholderTextColor="white"
                        multiline={true}
                        numberOfLines={5}
                        textAlignVertical="top"
                        value={leaveReason}
                        onChangeText={setLeaveReason}
                    />
                </View>
            </View>
            <View style={styles.buttonPlace}>
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.6}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
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
    inputBox: {
        paddingLeft: 13,
        paddingRight: 13,
    },
    inputContainer2: {
        flexDirection: 'row',
        backgroundColor: 'gray',
        paddingVertical: 9,
        borderRadius: 15,
        marginTop: 10,
    },
    inputContainer3: {
        flexDirection: 'row',
        backgroundColor: 'gray',
        borderRadius: 15,
        marginTop: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: 'gray',
        paddingVertical: 5,
        borderRadius: 15,
        marginTop: 10,
    },
    input: {
        flex: 1,
        marginVertical: 10,
        color: 'white',
        fontSize: 15,
        fontWeight: '600',
        marginLeft: 20,
    },
    input2: {
        flex: 1,
        marginVertical: 10,
        color: 'white',
        marginLeft: 3,
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
