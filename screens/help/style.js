import { StyleSheet, Dimensions, StatusBar } from "react-native";
import Colors from "../../constants/Colors";
import { scheduleNotificationAsync } from "expo-notifications";

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
  howToUseCard: {
    width: "85%",
    borderRadius: 0.01875 * screenHeight,
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 10,
    shadowOpacity: 0.16,
    alignItems: "center",
    // justifyContent: "center",
    marginBottom: 0.0375 * screenHeight,
    marginTop: 0.0375 * screenHeight,
    flexGrow: 1,
    // paddingBottom: 10,
  },
  addressesHeader: {
    width: "86.97%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0.034375 * screenHeight,
    marginBottom: 0.02 * screenHeight,
  },
  howToUseTitle: {
    fontFamily: "poppins-regular",
    fontSize: 0.025 * screenHeight,
    color: Colors.back,
    margin: 15,
    marginBottom: 0,
  },
  underTitle: {
    fontFamily: "poppins-extra-light",
    fontSize: 0.017 * screenHeight,
    color: Colors.back,
    // margin: 15,
    // marginBottom: 0,
    marginTop: -10,
    marginBottom: 20,
  },
  step: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
  },
  stepNumber: {
    fontFamily: "poppins-regular",
    fontSize: 0.08 * screenHeight,
    color: Colors.back,
    margin: 3,
    paddingTop: 10,
    width: 40,
    height: 120,
    // borderWidth: 1,
  },
  stepText: {
    fontFamily: "poppins-light",
    fontSize: 0.017 * screenHeight,
    color: Colors.back,
    width: 0.65 * screenWidth,
    margin: 10,
  },
  supportText: {
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
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 10,
    shadowOpacity: 0.16,
    marginStart: 15,
  },
  supportView: {
    flexDirection: "row",
    flexGrow: 1,
    // minHeight: 0.1 * screenHeight,
    marginBottom: 30,
    width: "83.888%",
    justifyContent: "space-between",
    alignItems: "center",
    // borderWidth: 1,
  },
  msngrIcon: {
    width: 0.08 * screenWidth,
    height: 1.078124 * 0.08 * screenWidth,
  },
  msngrBtn: {
    paddingTop: 0.1 * 0.08 * screenWidth,
    aspectRatio: 1,
    width: 0.08 * screenWidth,
    borderRadius: 0.04 * screenWidth,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 10,
    shadowOpacity: 0.16,
    marginStart: 15,
  },
  supportView: {
    flexDirection: "row",
    flexGrow: 1,
    // minHeight: 0.1 * screenHeight,
    marginBottom: 30,
    width: "83.888%",
    justifyContent: "space-between",
    alignItems: "center",
    // borderWidth: 1,
  },
  btns: {
    flexDirection: "row",
    // width: 0.2 * screenWidth,
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  usernameView: {
    width: "85%",
    height: 0.1875 * screenHeight,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 10,
    shadowOpacity: 0.16,
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: 0.01875 * screenHeight,
    backgroundColor: "#fff",
    marginBottom: 0.03125 * screenHeight,
  },
  balanceView: {
    width: "85%",
    height: 0.17 * screenHeight,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 10,
    shadowOpacity: 0.16,
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 0.01875 * screenHeight,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  balanceSection: {
    borderColor: Colors.back,
    height: 0.15 * screenHeight,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  referralSection: {
    height: 0.15 * screenHeight,
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  balanceText: {
    fontFamily: "poppins-light",
    fontSize: 0.022 * screenHeight,
    color: Colors.back,
    textAlignVertical: "center",
  },
  hint: {
    fontFamily: "poppins-extra-light",
    fontSize: 0.015 * screenHeight,
    color: Colors.back,
    textAlignVertical: "center",
    width: "83%",
    marginBottom: 0.02 * screenHeight,
    marginTop: 0.01 * screenHeight,
  },
  shareIcon: {
    width: 20,
    height: 20,
  },
  shareBtn: {
    width: 20,
    height: 20,
  },
  usernameText: {
    fontFamily: "poppins-regular",
    fontSize: 0.025 * screenHeight,
    color: Colors.back,
    textAlignVertical: "center",
    margin: 0.05555 * screenWidth,
    marginTop: 0,
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
    // marginTop: 0.01 * screenHeight,
    marginBottom: 10,
    padding: 5,
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
  languageView: {
    flexDirection: "row",
    width: "85%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -0.025 * screenHeight,
    marginBottom: 10,
    // borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
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
    margin: "6.5%",
  },
  headerIcon: {
    width: 0.064861 * screenWidth,
    height: 0.0869166 * screenWidth,
    position: "absolute",
  },
});

export default styles;