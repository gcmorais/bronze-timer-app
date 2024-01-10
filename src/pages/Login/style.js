import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "ios" ? 0 : 50,
  },
  title: {
    fontSize: 55,
    color: "#FFFFFF",
    marginBottom: 10,
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    letterSpacing: 8,
  },
  topcontainer: {
    marginTop: 260,
  },
  input: {
    width: 300,
    marginTop: 10,
    padding: 10,
    height: 50,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "rgba(78,78,78,0.7)",
    borderRadius: 10,
    color: "#FFFFFF",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  contentAlert: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textAlert: {
    paddingLeft: 10,
    color: "#BDBDBD",
    fontSize: 16,
  },
  buttonLogin: {
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4787A7",
    borderRadius: 10,
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  textButtonLogin: {
    color: "#FFFFFF",
    fontSize: 15,
    marginLeft: "auto",
    marginRight: "auto",
  },
  footerText: {
    marginTop: 20,
    color: "#FFFFFF",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default styles;
