import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/Colors";

const screenWidth = Math.round(Dimensions.get("window").width);
const mb = Math.round(0.065 * screenWidth);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  login: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: mb,
  },
  card: {
    backgroundColor: "#fff",
    height: 310,
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
  logo: {
    width: "100%",
    flexGrow: 1,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: 113,
    height: 113,
  },
  // input1: {
  //   marginTop: 88,
  //   height: 30,
  //   width: "77%",
  //   alignSelf: "center",
  //   borderBottomColor: Colors.input,
  //   borderBottomWidth: 1,
  //   fontFamily: "poppins-regular",
  //   fontSize: 20,
  //   textDecorationColor: Colors.input,
  //   color: Colors.input,
  //   opacity: 0.9,
  // },
  input2: {
    marginTop: 88,
    height: 30,
    width: "77%",
    alignSelf: "center",
    borderBottomColor: Colors.input,
    borderBottomWidth: 1,
    fontFamily: "poppins-regular",
    fontSize: 20,
    textDecorationColor: Colors.input,
    color: Colors.input,
    letterSpacing: 0,
    opacity: 0.9,
  },
  loginButton: {
    alignSelf: "center",
    backgroundColor: "#fff",
    borderColor: Colors.primary,
    borderWidth: 1,
    marginTop: 76,
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
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 17,
    fontFamily: "poppins-regular",
  },
});

export default styles;
