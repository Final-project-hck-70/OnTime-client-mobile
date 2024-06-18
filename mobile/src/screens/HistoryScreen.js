import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getValueFor } from "../helpers/secureStore";
import CardAttendance from "../components/CardAttendance";

export default function HistoryScreen() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredAttendanceData, setFilteredAttendanceData] = useState([]);
  const [lateCount, setLateCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);

  const fetchUserData = async () => {
    try {
      const token = await getValueFor("token");
      if (!token) {
        Alert.alert("Error", "User not authenticated");
        return;
      }

      const response = await fetch(
        "https://8fbc-139-228-111-126.ngrok-free.app/users/profile/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.status !== 200) {
        throw new Error(data.message || "Failed to fetch user data");
      }

      setAttendanceData(data.Attendances || []);
    } catch (error) {
      console.log("Error fetching user data", error);
      Alert.alert("Error", "Failed to fetch user data");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    filterAttendanceData();
  }, [selectedMonth, selectedYear, attendanceData]);

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const filterAttendanceData = () => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const monthIndex = monthNames.indexOf(selectedMonth) + 1;
    let lateCountTemp = 0;
    let absentCountTemp = 0;
    const daysInMonth = getDaysInMonth(monthIndex, selectedYear);

    const filteredData = attendanceData.filter((attendance) => {
      const attendanceDate = new Date(attendance.createdAt);
      const attendanceMonth = attendanceDate.getMonth() + 1;
      const attendanceYear = attendanceDate.getFullYear();
      const isMatching =
        (selectedMonth === "" || attendanceMonth === monthIndex) &&
        (selectedYear === "" || attendanceYear === parseInt(selectedYear));

      if (isMatching && attendance.attendanceStatus === "late") {
        lateCountTemp += 1;
      }

      return isMatching;
    });

    const attendanceDates = filteredData.map((attendance) =>
      new Date(attendance.createdAt).getDate()
    );

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedYear, monthIndex - 1, day);
      if (!isWeekend(date) && !attendanceDates.includes(day)) {
        absentCountTemp += 1;
      }
    }

    setLateCount(lateCountTemp);
    setAbsentCount(absentCountTemp);
    setFilteredAttendanceData(filteredData);
  };

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
              Late Clock In: {lateCount}
            </Text>
            <Text style={styles.infoCardTextHeader}>
              Absent Total: {absentCount}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.pickerContainer}>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedMonth}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
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
            onValueChange={(itemValue) => setSelectedYear(itemValue)}
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
      <Text style={styles.textList}>List History of Attendance</Text>
      <ScrollView>
        {filteredAttendanceData.map((attendance) => (
          <CardAttendance key={attendance.id} attendance={attendance} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    height: 205,
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
  infoCardHeader: {
    width: "90%",
    height: 65,
    marginTop: 20,
    backgroundColor: "#f2f2f2",
    alignSelf: "center",
    borderRadius: 20,
    marginBottom: 30,
  },
  infoCardContentHeader: {
    width: "90%",
    marginTop: 10,
    justifyContent: "space-between",
    marginLeft: 20,
  },
  infoCardTextHeader: {
    fontSize: 15,
    fontWeight: "600",
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  pickerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    width: "45%",
  },
  picker: {
    flex: 1,
  },
  textList: {
    fontWeight: "600",
    fontSize: 18,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10,
  },
});
