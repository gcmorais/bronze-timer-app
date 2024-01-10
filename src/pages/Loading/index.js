import React, { useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";

export default function index() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/Spinner.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <ActivityIndicator size="large" color="#ffffff" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});
