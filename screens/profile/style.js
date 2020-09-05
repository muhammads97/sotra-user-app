import { StyleSheet, Dimensions, StatusBar } from "react-native";
import Colors from "../../constants/Colors";

const screenWidth = Math.round(Dimensions.get("window").width);
const SBHeight = StatusBar.currentHeight;
const screenHeight = Math.round(Dimensions.get("window").height) - SBHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  list: {
    marginBottom: 0.034375 * screenHeight,
  },
  address: {
    fontFamily: "poppins-extra-light",
    fontSize: 0.017 * screenHeight,
    color: Colors.back,
    marginBottom: 8,
  },
  addressContainer: {
    // height: 50,
    backgroundColor: "#fff",
    width: 0.71777 * screenWidth,
    // borderWidth: 1,
  },
  addressNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    // borderWidth: 1,
  },
  addressName: {
    fontFamily: "poppins-regular",
    fontSize: 0.02 * screenHeight,
    color: Colors.back,
  },
  deleteIcon: {
    width: 0.02 * screenWidth,
    height: 0.02 * screenWidth,
  },
  deleteButton: {
    width: 0.05 * screenWidth,
    height: 0.05 * screenWidth,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
  },
  noAddresses: {
    fontFamily: "poppins-light",
    fontSize: 0.012 * screenHeight,
    color: Colors.back,
    marginBottom: 0.034375 * screenHeight,
  },
  addressesView: {
    width: "85%",
    borderRadius: 0.01875 * screenHeight,
    backgroundColor: "#fff",
    elevation: 4,
    alignItems: "center",
    // minHeight: 0.104 * screenHeight,
    marginBottom: 0.0375 * screenHeight,
    flexGrow: 1,
  },
  addressesHeader: {
    width: "86.97%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0.034375 * screenHeight,
    marginBottom: 0.034375 * screenHeight,
  },
  addressesHeaderText: {
    fontFamily: "poppins-regular",
    fontSize: 0.025 * screenHeight,
    color: Colors.back,
  },
  plusButton: {
    width: 0.07 * screenWidth,
    aspectRatio: 1,
    borderRadius: 0.035 * screenWidth,
    elevation: 3,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  plusIcon: {
    width: 0.03 * screenWidth,
    height: 0.03 * screenWidth,
  },
  usernameView: {
    width: "85%",
    height: 0.1875 * screenHeight,
    elevation: 4,
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: 0.01875 * screenHeight,
    backgroundColor: "#fff",
    marginBottom: 0.03125 * screenHeight,
  },
  usernameText: {
    fontFamily: "poppins-regular",
    fontSize: 0.025 * screenHeight,
    color: Colors.back,
    textAlignVertical: "center",
    marginLeft: 0.05555 * screenWidth,
    marginBottom: 0.0125 * screenHeight,
  },
  usernameInput: {
    width: "86.86%",
    alignSelf: "center",
    borderBottomColor: Colors.input,
    borderBottomWidth: 1,
    fontFamily: "poppins-light",
    fontSize: 0.02 * screenHeight,
    textDecorationColor: Colors.input,
    color: Colors.back,
    marginTop: 0.0125 * screenHeight,
  },
  toggleView: {
    flexDirection: "row",
    width: "85%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 0.01 * screenHeight,
    marginBottom: 0.03 * screenHeight,
    // borderWidth: 1,
  },
  toggleText: {
    fontFamily: "poppins-regular",
    fontSize: 0.021 * screenHeight,
    color: Colors.back,
  },
  toggle: {
    // borderWidth: 1,
    width: 0.138 * screenWidth,

    // flexShrink: 1,
  },
  header: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.profile,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    elevation: 10,
    borderRadius: 0.0333 * screenWidth,
    // borderWidth: 3,
  },
  headerText: {
    fontFamily: "poppins-medium",
    fontSize: 0.023 * screenHeight,
    color: "#fff",
    marginLeft: "6.5%",
  },
  headerIcon: {
    width: 0.064861 * screenWidth,
    height: 0.0869166 * screenWidth,
    position: "absolute",
    right: 0.04888 * screenWidth,
  },
});

export default styles;
