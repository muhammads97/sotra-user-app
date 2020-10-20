import { StyleSheet, Dimensions, StatusBar } from "react-native";
import Colors from "../../constants/Colors";

const screenWidth = Math.round(Dimensions.get("window").width);
const SBHeight = StatusBar.currentHeight;
const screenHeight = Math.round(Dimensions.get("window").height) - SBHeight;
const headerHeight = 0.239 * screenHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  verify: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: mb,
  },
  vertical: {
    flexDirection: "row",
    marginTop: -20,
  },
  mobileNumber: {
    fontFamily: "poppins-extra-light",
    fontSize: 15,
    color: "#fff",
    marginRight: 8,
  },
  wrongNumber: {
    fontFamily: "poppins-extra-light",
    fontSize: 15,
    color: "#fff",
    textDecorationLine: "underline",
  },
  card: {
    backgroundColor: "#fff",
    height: 350,
    width: "87%",
    borderRadius: 49,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.11,
    shadowRadius: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  input: {
    height: 56,
    marginTop: 61,
    width: "75%",
  },
  box: {
    width: "100%",
    height: screenHeight - mb - 350,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  verificationText: {
    fontFamily: "poppins-regular",
    fontSize: 45,
    color: "#fff",
  },
  verifyButton: {
    alignSelf: "center",
    borderColor: Colors.default.primary,
    borderWidth: 1,
    marginTop: 19,
    width: "77%",
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 0.5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    backgroundColor: "#fff",
  },
  buttonText: {
    color: Colors.default.primary,
    fontSize: 17,
    fontFamily: "poppins-regular",
    marginTop: 2,
  },
  code: {
    fontFamily: "poppins-extra-light",
    fontSize: 10,
    color: Colors.default.input,
    marginTop: 10,
  },
  resendText: {
    fontFamily: "poppins-light",
    fontSize: 15,
    color: Colors.default.primary,
    textDecorationLine: "underline",
    marginBottom: 2,
  },
  resendBox: {
    flexDirection: "row",
    justifyContent: "center",
    width: "70%",
    height: 90,
    alignItems: "flex-end",
  },
  counter: {
    fontSize: 15,
    fontFamily: "poppins-light",
    color: Colors.default.input,
    marginRight: 3,
    marginBottom: 2,
  },
});

export default styles;
