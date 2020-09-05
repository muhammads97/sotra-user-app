import { StyleSheet, Dimensions, StatusBar } from "react-native";
import Colors from "../../constants/Colors";

const screenWidth = Math.round(Dimensions.get("window").width);
const SBHeight = StatusBar.currentHeight;
const screenHeight = Math.round(Dimensions.get("window").height) - SBHeight;
const headerHeight = 0.239 * screenHeight;

const styles = StyleSheet.create({
  picker: {
    width: 0.06 * screenWidth,
    height: 0.063 * screenWidth,
    aspectRatio: 1.3,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
  mapContainer: {
    height: 0.5 * screenHeight,
    flexGrow: 1,
    width: 0.852 * screenWidth,
    borderRadius: 0.03333 * screenWidth,
    elevation: 6,
    overflow: "hidden",
    top: -0.08 * headerHeight,
  },
  mapStyle: {
    flex: 1,
    // height: 0.5953 * screenHeight,
    // marginTop: 100,
  },
  header: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.locations,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    elevation: 10,
    borderRadius: 0.0333 * screenWidth,
    // borderWidth: 3,
  },
  headerText: {
    fontFamily: "poppins-medium",
    fontSize: 0.0225 * screenHeight,
    color: "#fff",
    marginLeft: "6.5%",
  },
  headerIcon: {
    width: 0.06758 * screenWidth,
    height: 0.087773 * screenWidth,
    position: "absolute",
    right: 0.035 * screenWidth,
    // top: 0.01375 * screenHeight,
  },
  contactUsText: {
    fontFamily: "poppins-regular",
    fontSize: 0.02 * screenHeight,
    color: Colors.back,
  },
  contactUsIcon: {
    width: 0.025 * screenWidth,
    height: 1.5 * 0.025 * screenWidth,
  },
  contactUsButton: {
    aspectRatio: 1,
    width: 0.08 * screenWidth,
    borderRadius: 0.04 * screenWidth,
    backgroundColor: Colors.locations,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 3,
    elevation: 2,
  },
  footer: {
    // height: 0.14 * screenHeight,
    flexDirection: "row",
    flexGrow: 1,
    width: "83.888%",
    // borderWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default styles;
