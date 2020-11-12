import { StyleSheet, Dimensions, StatusBar } from "react-native";
import Colors from "../../constants/Colors";

const screenWidth = Math.round(Dimensions.get("window").width);
const SBHeight = StatusBar.currentHeight;
const screenHeight = Math.round(Dimensions.get("window").height) - SBHeight;
const height = 0.239 * (screenHeight - SBHeight);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontFamily: "poppins-regular",
    fontSize: 30,
    color: "#fff",
    textAlign: "center",
    textAlignVertical: "center",
    flexGrow: 1,
  },
  card: {
    borderRadius: 49,
    width: 0.87 * screenWidth,
    height: 0.7 * screenHeight,
    elevation: 4,
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    paddingTop: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontFamily: "poppins-regular",
    fontSize: 0.05 * screenWidth,
    color: Colors.back,
    alignSelf: "flex-start",
    marginLeft: 36,
    marginTop: 20,
  },
  genderSection: {
    width: "80%",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  genderButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
  },
  gender: {
    fontFamily: "poppins-regular",
    fontSize: 0.04 * screenWidth,
    color: Colors.back,
    marginTop: 4,
  },
  link: {
    fontFamily: "poppins-light",
    fontSize: 0.035 * screenWidth,
    color: Colors.primary,
    textDecorationLine: "underline",
  },
  linkBox: {
    height: 30,
    // borderWidth: 1,
    marginTop: 20,
  },
  datePicker: {
    width: "81%",
    marginTop: 10,
  },
  loading: {
    width: 20,
    height: 20,
    borderWidth: 2,
    marginTop: 20,
  },
  confirmationButton: {
    alignSelf: "center",
    borderColor: Colors.primary,
    borderWidth: 1,
    marginTop: 19,
    width: 0.77 * 0.87 * screenWidth,
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
    color: Colors.primary,
    fontSize: 17,
    fontFamily: "poppins-regular",
    marginTop: 2,
  },
  overContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    right: 0,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  dark: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    right: 0,
    backgroundColor: "#000",
    opacity: 0.5,
  },
  prompt: {
    backgroundColor: "#fff",
    borderRadius: 15,
    width: 0.7 * screenWidth,
    height: 0.28 * screenHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    marginTop: 20,
  },
  failed: {
    color: "red",
    fontSize: 0.035 * screenWidth,
    fontFamily: "poppins-light",
    marginRight: 10,
  },
  success: {
    color: "green",
    fontSize: 0.035 * screenWidth,
    fontFamily: "poppins-light",
    marginTop: 20,
  },
});

export default styles;
