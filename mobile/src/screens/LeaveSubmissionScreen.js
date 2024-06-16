import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getValueFor } from "../helpers/secureStore";

const LeaveSubmissionScreen = () => {
  const navigation = useNavigation();
  const [leaveData, setLeaveData] = useState([]);
  const [remainingLeaves, setRemainingLeaves] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const token = await getValueFor("token");
        if (!token) {
          Alert.alert("Error", "User not authenticated");
          return;
        }

        const response = await fetch(
          "https://7210-36-70-217-215.ngrok-free.app/users/profile/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch leave data");
        }
        const data = await response.json();
        const remaining = data.Company.totalLeaves - data.Leaves.length;
        setRemainingLeaves(remaining);
        setLeaveData(data.Leaves);
      } catch (error) {
        console.error("Error fetching leave data:", error);
        Alert.alert("Error", "Failed to load leave data");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          onPress={() => navigation.navigate("Report")}
          name="chevron-back"
          size={30}
          color="white"
          marginTop={40}
          marginLeft={10}
        />
      </View>
      <View style={styles.absoluteContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Leave Submission</Text>
        </View>
        <View style={styles.infoCardHeader}>
          <View style={styles.infoCardContentHeader}>
            <Text style={styles.infoCardTextHeader}>
              Remaining Leave: {remainingLeaves}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonPlace}>
        <TouchableOpacity
          onPress={() => navigation.navigate("FormLeave")}
          style={styles.button}
          activeOpacity={0.6}
        >
          <Text style={styles.buttonText}>Add Leave</Text>
        </TouchableOpacity>
      </View>
      {leaveData.map((leave, index) => (
        <View key={index} style={styles.infoCard}>
          <View style={styles.infoCardContent}>
            <Text style={styles.infoCardText}>
              Reason Leave: {leave.reason}
            </Text>
            <Text style={styles.infoCardText}>
              From: {new Date(leave.from).toLocaleDateString()}
            </Text>
            <Text style={styles.infoCardText}>
              To: {new Date(leave.to).toLocaleDateString()}
            </Text>
            <Text style={styles.infoCardText}>
              Leave Status: {leave.leaveStatus}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    height: 180,
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
    height: 41,
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
    textAlign: "center",
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
  infoCard: {
    width: "93%",
    height: 140,
    marginTop: 10,
    backgroundColor: "black",
    alignSelf: "center",
    borderRadius: 20,
  },
  infoCardContent: {
    width: "90%",
    marginTop: 20,
    gap: 5,
    justifyContent: "space-between",
    marginLeft: 20,
  },
  infoCardText: {
    fontSize: 15,
    fontWeight: "600",
    color: "white",
  },
});

export default LeaveSubmissionScreen;
