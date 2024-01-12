import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Vibration,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

import { Audio } from "expo-av";

import { useTimer } from "react-timer-hook";

export default function Countdown({ expiryTimestamp, user, lado, valor }) {
  const { seconds, minutes, pause, resume, isRunning, restart } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => finished(),
  });

  function handleSubmit() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 60 * valor);
    restart(time, false);
  }

  const [sound, setSound] = useState(new Audio.Sound());

  const PATTERN = [100, 243, 541, 1000, 534];

  async function handleCallNotification() {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
  }

  const stop = () => {
    Vibration.cancel();
    setSound(undefined);
  };

  const finished = async () => {
    Vibration.vibrate(PATTERN, true);
    const { sound } = await Audio.Sound.createAsync(require("../res/Song.mp3"));
    setSound(sound);
    await sound.playAsync();
    handleCallNotification();

    Notifications.scheduleNotificationAsync({
      content: {
        title: `${user} está pronta!!`,
        body: `O lado ${lado} foi finalizado.`,
      },
      trigger: {
        seconds: 2,
      },
    });

    Alert.alert("Alerta", `${user} finalizou o ${lado}`, [
      {
        text: "Cancelar",
        onPress: () => stop(),
        style: "cancel",
      },
      { text: "OK", onPress: () => stop() },
    ]);
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <>
      {isRunning ? (
        <View style={styles.container}>
          <TouchableOpacity onPress={isRunning === true ? pause : resume}>
            <Text style={styles.timerDefault}>
              {minutes < 10 ? "0" + minutes : minutes}:
              {seconds < 10 ? "0" + seconds : seconds}
            </Text>
          </TouchableOpacity>
          <Text onPress={handleSubmit} style={styles.timerIcon}>
            <AntDesign name="reload1" size={25} color="#A9A9A9" />
          </Text>
        </View>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity onPress={isRunning === true ? pause : resume}>
            {minutes === 0 && seconds === 0 ? (
              <Text style={styles.timerOff}>
                {minutes < 10 ? "0" + minutes : minutes}:
                {seconds < 10 ? "0" + seconds : seconds}
              </Text>
            ) : (
              <Text style={styles.timerOn}>
                {minutes < 10 ? "0" + minutes : minutes}:
                {seconds < 10 ? "0" + seconds : seconds}
              </Text>
            )}
          </TouchableOpacity>
          <Text onPress={handleSubmit} style={styles.timerIcon}>
            <AntDesign name="reload1" size={25} color="#A9A9A9" />
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eaeaea",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timerDefault: {
    fontSize: 40,
    padding: 10,
    fontWeight: "bold",
    color: "#478bff",
  },
  timerOn: {
    fontSize: 40,
    padding: 10,
    fontWeight: "bold",
    opacity: 0.2,
  },
  timerOff: {
    fontSize: 40,
    padding: 10,
    fontWeight: "bold",
    opacity: 0.5,
    color: "#3CB371",
    textDecorationLine: "line-through",
  },
  timerIcon: {
    marginRight: 10,
  },
});
