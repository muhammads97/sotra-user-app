import { StyleSheet, Dimensions, StatusBar } from "react-native";
import Colors from "../../constants/Colors";

const screenWidth = Math.round(Dimensions.get("window").width);
const SBHeight = StatusBar.currentHeight;
const screenHeight = Math.round(Dimensions.get("window").height) - SBHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  epmtyText: {
    width: "100%",
    textAlign: "center",
    fontFamily: "poppins-light",
    fontSize: 0.014 * screenHeight,
    color: Colors.back,
    margin: 0.02 * screenHeight,
  },
  header: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.orders,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    elevation: 10,
    borderRadius: 0.0333 * screenWidth,
  },
  headerText: {
    fontFamily: "poppins-medium",
    fontSize: 0.03 * screenHeight,
    color: "#fff",
    marginRight: "6.5%",
    marginLeft: "6.5%",
    // marginTop: 2,
  },
  headerIcon: {
    width: 0.0835 * screenWidth,
    height: 0.087193 * screenWidth,
    // position: "absolute",
    margin: "6.5%",
  },
  scroll: {
    flexGrow: 1,
  },
  footer: {
    // height: 0.0578 * screenHeight + 60,
    flexGrow: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "poppins-regular",
    fontSize: 0.021 * screenHeight,
    color: "#fff",
  },
  button: {
    width: "66.66%",
    height: 0.0578125 * screenHeight,
    backgroundColor: Colors.orders,
    borderRadius: 0.02890625 * screenHeight,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    marginBottom: 30,
    marginTop: 30,
  },
  buttonSection: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    flexGrow: 1,
  },
});

export default styles;
