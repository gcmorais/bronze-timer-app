import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Vibration,
  Alert,
} from "react-native";

import { Audio } from "expo-av";

import { useTimer } from "react-timer-hook";

export default function Countdown({ expiryTimestamp, user, lado }) {
  const { seconds, minutes, pause, resume, isRunning } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => finished(),
  });

  const [sound, setSound] = useState(new Audio.Sound());

  const PATTERN = [100, 243, 541, 1000, 534];

  const stop = () => {
    Vibration.cancel();
    setSound(undefined);
  };

  const finished = async () => {
    Vibration.vibrate(PATTERN, true);
    const { sound } = await Audio.Sound.createAsync(require("../res/Song.mp3"));
    setSound(sound);
    await sound.playAsync();

    Alert.alert("Alerta", `${user} finalizou o ${lado}`, [
      {
        text: "Cancelar",
        onPress: () => console.log("Cancel Pressed"),
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
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eaeaea",
    borderRadius: 10,
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
});
