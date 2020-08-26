import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
} from "react-native";
import Icons from "../../constants/Icons";
import Colors from "../../constants/Colors";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
const SBHeight = StatusBar.currentHeight;
const height = 0.239 * (screenHeight - SBHeight);

export default function StickyHeader({
  backTo,
  nav,
  elevation,
  backText,
  headerComponent,
}) {
  const back = () => {
    if (backTo == null) nav.goBack();
    else nav.navigate(backTo);
  };

  return (
    <View style={[styles.container, { elevation: elevation }]}>
      <View style={styles.backView}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => back()}
          activeOpacity={0.4}
        >
          <Image
            source={Icons.back}
            style={styles.backSymbol}
            resizeMode={"contain"}
          />
          <Text style={styles.goBack}>{backText}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headerView}>{headerComponent}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: height,
    width: "100%",
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  backView: {
    height: 0.196 * height,
    width: "87.222%",
    alignItems: "flex-start",
    marginTop: -0.03 * height,
    marginBottom: 0.03 * height,
    // borderWidth: 3,
  },
  backButton: {
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
  },
  backSymbol: {
    height: "40%",
    marginBottom: 4,
    marginRight: "2.5%",
  },
  goBack: {
    fontFamily: "poppins-regular",
    fontSize: 0.01875 * (screenHeight - SBHeight),
    // borderWidth: 1,
    textAlignVertical: "bottom",
    color: Colors.back,
  },
  headerView: {
    height: 0.35 * height,
    width: "87.222%",
    // justifyContent: "center",
    alignItems: "center",
    // borderWidth: 2,
  },
});
