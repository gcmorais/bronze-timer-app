import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 60 : 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(58,58,58, 0.08)",
  },
  button: {
    backgroundColor: "#4787A7",
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 30,
    left: 20,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonA: {
    backgroundColor: "#4787A7",
    width: 60,
    height: 60,
    bottom: 30,
    left: 20,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonB: {
    width: 100,
    height: 60,
    bottom: 30,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  iconButton: {
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "bold",
  },
  Tasks: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5cf",
    padding: 15,
  },
  TasksContainer: {
    width: "100%",
  },
  TasksContainerLineTwo: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: 10,
  },
  editTaskIcon: {
    marginLeft: 30,
  },
  DescriptionTask: {
    color: "#000",
    fontSize: 25,
    fontWeight: "bold",
  },
  mainTextTask: {
    color: "#000",
    fontSize: 25,
    width: "70%",
  },
  TimerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 2,
  },
  ButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  TasksHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  DeleteTasksContainer: {
    width: "100%",
    paddingTop: 50,
    paddingBottom: 50,
  },
});

export default styles;
