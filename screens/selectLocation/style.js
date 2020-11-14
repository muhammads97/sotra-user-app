import { StyleSheet, Dimensions, StatusBar } from "react-native";
import Colors from "../../constants/Colors";

const screenWidth = Math.round(Dimensions.get("window").width);
const SBHeight = StatusBar.currentHeight;
const screenHeight = Math.round(Dimensions.get("window").height) - SBHeight;
const headerHeight = 0.239 * screenHeight;

const styles = StyleSheet.create({
  picker: {
    position: "absolute",
    width: 0.03607 * screenWidth,
    height: 0.04685 * screenWidth,
    top: "50%",
    left: "50%",
    transform: [
      { translateX: -0.018035 * screenWidth },
      { translateY: -0.04685 * screenWidth },
    ],
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
  // mapContainer: {
  //   height: 0.5953 * screenHeight,
  //   flexGrow: 1,
  //   width: 0.852 * screenWidth,
  //   borderRadius: 0.03333 * screenWidth,
  //   elevation: 6,
  //   overflow: "hidden",
  //   // top: -0.08 * headerHeight,
  // },
  mapContainer: {
    height: 0.5953 * screenHeight,
    flexGrow: 1,
    width: 0.852 * screenWidth,
    borderRadius: 0.03333 * screenWidth,
    overflow: "hidden",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  mapOuterContainer: {
    height: 0.5 * screenHeight,
    flexGrow: 1,
    width: 0.852 * screenWidth,
    borderRadius: 0.03333 * screenWidth,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 10,
    shadowOpacity: 0.16,
  },
  mapStyle: {
    flexGrow: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
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
    // position: "absolute",
    // top: 0.01375 * screenHeight,
    margin: "5%",
    marginBottom: 0,
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
    // marginTop: 0.046875 * screenHeight,
    elevation: 2,
  },
  footer: {
    height: 0.14 * screenHeight,
    // flexGrow: 1,
    width: "100%",
    // borderWidth: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default styles;
