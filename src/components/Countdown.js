import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useTimer } from "react-timer-hook";

export default function Countdown({ expiryTimestamp }) {
  const { seconds, minutes, start, pause, isRunning } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => alert("Expirou"),
  });

  return (
    <>
      {isRunning ? (
        <View style={styles.container}>
          <TouchableOpacity onPress={isRunning === true ? pause : start}>
            <Text style={styles.timer}>
              {minutes < 10 ? "0" + minutes : minutes}:
              {seconds < 10 ? "0" + seconds : seconds}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity onPress={isRunning === true ? pause : start}>
            <Text style={styles.timerDefault}>
              {minutes < 10 ? "0" + minutes : minutes}:
              {seconds < 10 ? "0" + seconds : seconds}
            </Text>
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
  timer: {
    fontSize: 40,
    padding: 10,
    fontWeight: "bold",
    color: "#3CB371",
  },
  timerDefault: {
    fontSize: 40,
    padding: 10,
    fontWeight: "bold",
    opacity: 0.2,
  },
});
