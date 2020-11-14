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
  header: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.pricing,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    elevation: 10,
    borderRadius: 0.0333 * screenWidth,
  },
  headerText: {
    fontFamily: "poppins-medium",
    fontSize: 0.0225 * screenHeight,
    color: "#fff",
    // marginLeft: "6.5%",
  },
  headerIcon: {
    width: 0.0835 * screenWidth,
    height: 0.087193 * screenWidth,
    // position: "absolute",
    margin: "6.5%",
  },
  card: {
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    width: "85%",
    borderRadius: 0.01875 * screenHeight,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 20,
  },
  tableHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 0.04 * screenHeight,
    marginBottom: 0.012 * screenWidth,
  },
  tableTilte: {
    color: Colors.back,
    fontFamily: "poppins-regular",
    fontSize: 0.025 * screenHeight,
    marginStart: 0.041 * screenWidth,
    marginEnd: 0.2 * screenWidth,
  },
  iron: {
    width: 0.0652 * screenWidth,
    height: 0.667378 * 0.0652 * screenWidth,
    // flex: 0.32,
  },
  clean: {
    width: 0.0652 * screenWidth,
    height: 0.667378 * 0.0652 * screenWidth,
    // flex: 0.45,
    marginEnd: 6,
  },
  Hrow: {
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginEnd: 0.06 * screenWidth,
    flex: 0.63,
    // borderWidth: 1,
  },
  separator: {
    width: 0.7277 * screenWidth,
    height: 0,
    borderBottomWidth: 0.5,
    opacity: 0.6,
    borderColor: Colors.input,
    marginBottom: 0.04 * screenWidth,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 0,
    margin: 0.02 * screenWidth,
    // marginBottom: 0.012 * screenWidth,
  },
  item: {
    color: Colors.back,
    fontFamily: "poppins-extra-light",
    fontSize: 0.02 * screenHeight,
    // flex: 1,
    marginStart: 0.041 * screenWidth,
  },
  Hrow2: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 0.27 * screenWidth,
    marginEnd: 0.03 * screenWidth,
  },
  priceIron: {
    color: Colors.back,
    fontFamily: "poppins-extra-light",
    fontSize: 0.018 * screenHeight,
    // flex: 0.32,
    // marginLeft: 20,
  },
  priceClean: {
    color: Colors.back,
    fontFamily: "poppins-extra-light",
    fontSize: 0.018 * screenHeight,
  },
  cText: {
    width: 0.13 * screenWidth,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});

export default styles;
