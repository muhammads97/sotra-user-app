import { StyleSheet, Dimensions, StatusBar } from "react-native";
import Colors from "../../constants/Colors";
const screenWidth = Math.round(Dimensions.get("window").width);
const SBHeight = StatusBar.currentHeight;
const screenHeight = Math.round(Dimensions.get("window").height) - SBHeight;
const styles = StyleSheet.create({
  ordersIcon: {
    width: 0.175 * screenWidth,
    height: 0.175 * screenWidth,
    // borderWidth: 1,
    alignSelf: "flex-end",
    marginRight: 0.04444 * screenWidth,
    marginTop: -0.04444 * screenWidth,
  },
  pricingIcon: {
    width: 0.17 * screenWidth,
    height: 0.175 * screenWidth,
    alignSelf: "flex-end",
    marginRight: 0.03 * screenWidth,
    marginTop: -0.04444 * screenWidth,
  },
  ProfileIcon: {
    width: 0.13 * screenWidth,
    height: 0.179 * screenWidth,
    alignSelf: "flex-end",
    marginRight: 0.04444 * screenWidth,
    marginTop: -0.04 * screenWidth,
  },
  locationIcon: {
    width: 0.12 * screenWidth,
    height: 0.172 * screenWidth,
    alignSelf: "flex-end",
    marginRight: 0.04444 * screenWidth,
    marginTop: -0.03 * screenWidth,
  },
  squareContainer: {
    aspectRatio: 1,
    width: "81%",
    justifyContent: "space-between",
    alignItems: "center",
    // borderWidth: 1,
    marginBottom: "2%",
  },
  rowContainer: {
    width: "100%",
    height: 0.378 * screenWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flex: 1,
  },
  cardText: {
    fontSize: 0.045 * screenWidth,
    fontFamily: "poppins-regular",
    color: "#fff",
    lineHeight: 0.052 * screenWidth,
    margin: 0.03333 * screenWidth,
    marginTop: 0.05 * screenWidth,
    letterSpacing: 0,
  },
  card: {
    aspectRatio: 1,
    width: 0.378 * screenWidth,
    borderRadius: 12,
    elevation: 2.5,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  button: {
    backgroundColor: Colors.primary,
    width: "66.66%",
    height: 0.0578125 * screenHeight,
    borderRadius: 0.02890625 * screenHeight,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 0.0625 * screenHeight,
    marginBottom: 0.0625 * screenHeight,
  },
  buttonText: {
    fontFamily: "poppins-regular",
    color: "#fff",
    fontSize: 17,
    marginTop: 2,
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-evenly",
    alignItems: "center",
    // borderWidth: 1,
  },
  subContainer: {
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    // borderWidth: 1,
  },
  hello: {
    fontFamily: "poppins-regular",
    fontSize: 0.032 * screenHeight,
    color: Colors.primary,
    marginLeft: 0.088889 * screenWidth + (0.05 * screenHeight) / 2,
    // borderWidth: 1,
    // textAlign: "center",
    flex: 1,
  },
  username: {
    fontFamily: "poppins-extra-light",
    fontSize: 0.032 * screenHeight,
    color: Colors.primary,
    marginLeft: 0.088889 * screenWidth + (0.05 * screenHeight) / 2,
    flex: 1,
  },
  welcome: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    height: 0.089 * screenHeight,
  },
  message: {
    height: 0.146875 * screenHeight,
    width: "82.2%",
    backgroundColor: Colors.primary,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  orderNowText: {
    fontFamily: "poppins-regular",
    fontSize: 0.0155 * screenHeight,
    color: "#fff",
    width: "100%",
  },
  messageText: {
    height: "61.7%",
    width: "53.37%",
    justifyContent: "space-evenly",
    marginLeft: (0.05 * screenHeight) / 2,
  },
  hanger: {
    width: "39.19%",
    height: "101%",
    marginTop: (0.07 * screenHeight) / 2,
    marginLeft: -0.005 * screenWidth,
  },
});

export default styles;
