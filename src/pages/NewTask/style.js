import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  label: {
    width: "90%",
    marginTop: 20,
    fontSize: 16,
    marginLeft: 20,
    color: "#F92E6A",
  },
  inputText: {
    width: "90%",
    height: 50,
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F92E6A",
  },
  buttonNewTask: {
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 30,
    left: 20,
    backgroundColor: "#f92e6a",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  iconButton: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default styles;
