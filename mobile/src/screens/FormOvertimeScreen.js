import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { save, getValueFor } from "../helpers/secureStore";

export default function FormOvertimeScreen({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [overtimeDateText, setOvertimeDateText] = useState("Overtime Date");
  const [overtimeDuration, setOvertimeDuration] = useState("");
  const [overtimeReason, setOvertimeReason] = useState("");

  const onChangeOvertime = (e, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setOvertimeDateText(formatDate(currentDate));
  };

  const showMode = (modeToShow) => {
    setShow(true);
    setMode(modeToShow);
  };

  const formatDate = (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (day < 10) day = `0${day}`;
    if (month < 10) month = `0${month}`;

    return `${year}/${month}/${day}`;
  };

  const handleSubmit = async () => {
    try {
      const token = await getValueFor("token");
      if (!token) {
        Alert.alert("Error", "User not authenticated");
        return;
      }


            const response = await fetch(
                'https://088f-2405-8180-403-db32-9cb0-2322-6dec-462.ngrok-free.app/overtimes',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        overtimeDate: date.toISOString().split('T')[0],
                        overtimeDuration,
                        overtimeReason,
                    }),
                }
            )


      const data = await response.json();


            if (response.status === 201) {
                Alert.alert(
                    'Success',
                    'Overtime submisssion created successfully',
                    [
                        {
                            text: 'OK',
                            onPress: () =>
                                navigation.navigate('OvertimeSubmission', {
                                    refresh: true,
                                }),
                        },
                    ]
                )
            } else {
                Alert.alert('Error', data.message || 'Something went wrong')
            }
        } catch (error) {
            console.error('Error:', error)
            Alert.alert('Error', 'Something went wrong')
        }

    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          onPress={() => navigation.navigate("OvertimeSubmission")}
          name="chevron-back"
          size={30}
          color="white"
          marginTop={40}
          marginLeft={10}
        />
      </View>
      <View style={styles.absoluteContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Form Overtime</Text>
        </View>
      </View>
      <View style={styles.inputBox}>
        <TouchableOpacity
          onPress={() => showMode("date")}
          style={styles.inputContainer2}
          activeOpacity={0.6}
        >
          <Text style={styles.input}>{overtimeDateText}</Text>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChangeOvertime}
        />
      )}
      <View style={styles.inputBox}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Overtime Duration"
            placeholderTextColor="white"
            keyboardType="numeric"
            value={overtimeDuration}
            onChangeText={setOvertimeDuration}
          />
        </View>
      </View>
      <View style={styles.inputBox}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Reason Overtime"
            placeholderTextColor="white"
            multiline={true}
            numberOfLines={5}
            textAlignVertical="top"
            value={overtimeReason}
            onChangeText={setOvertimeReason}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    height: 150,
    backgroundColor: "red",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  absoluteContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  titleContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 70,
  },
  title: {
    color: "white",
    fontSize: 25,
    fontWeight: "900",
    textAlign: "center",
  },
  inputBox: {
    paddingLeft: 13,
    paddingRight: 13,
  },
  inputContainer2: {
    flexDirection: "row",
    backgroundColor: "black",
    paddingVertical: 9,
    borderRadius: 15,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "black",
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 10,
  },
  input: {
    flex: 1,
    marginVertical: 10,
    color: "white",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 20,
  },
  buttonPlace: {
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    width: "35%",
    height: 40,
    backgroundColor: "transparent",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "black",
    textAlign: "center",
  },
});
