import { StyleSheet, Dimensions, StatusBar } from "react-native";
import Colors from "../../constants/Colors";

const screenWidth = Math.round(Dimensions.get("window").width);
const SBHeight = StatusBar.currentHeight;
const screenHeight = Math.round(Dimensions.get("window").height) - SBHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  scroll: {
    flex: 1,
    width: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
    width: "100%",
    alignItems: "center",
  },
  headerText: {
    fontFamily: "poppins-medium",
    fontSize: 0.0225 * screenHeight,
    color: "#fff",
    marginLeft: "6.5%",
  },
  headerIcon: {
    width: 0.197 * screenWidth,
    height: 0.16202 * screenWidth,
    position: "absolute",
    top: 0.01375 * screenHeight,
  },
  buttonText: {
    fontFamily: "poppins-regular",
    fontSize: 0.022 * screenHeight,
    color: "#fff",
    top: 1,
  },
  button: {
    width: "66.66%",
    height: 0.0578125 * screenHeight,
    backgroundColor: Colors.primary,
    borderRadius: 0.02890625 * screenHeight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 0.046875 * screenHeight,
    marginTop: 0.046875 * screenHeight,
    elevation: 2,
  },
  footer: {
    flexGrow: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default styles;
