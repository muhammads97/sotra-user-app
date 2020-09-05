import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
  Animated,
} from "react-native";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
const SBHeight = StatusBar.currentHeight;
const height = 0.239 * (screenHeight - SBHeight);

export default class Toggle extends React.Component {
  constructor() {
    super();
    this.state = {
      left: new Animated.Value(0),
    };
  }

  onPress() {
    let value = this.props.value;
    Animated.timing(this.state.left, {
      toValue: value ? 0 : this.props.style.width / 2,
      duration: 250,
      useNativeDriver: false,
    }).start();
    this.props.onValueChange(!value);
  }
  componentDidMount() {
    setTimeout(() => {
      let value = this.props.value;
      Animated.timing(this.state.left, {
        toValue: value ? this.props.style.width / 2 : 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    }, 100);
  }
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => this.onPress()}
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            borderRadius: this.props.style.width / 4,
            aspectRatio: 2,
            backgroundColor: this.props.value
              ? this.props.trackColor.on
              : this.props.trackColor.off,
          },
          this.props.style,
        ]}
      >
        <Animated.View
          style={{
            position: "absolute",
            backgroundColor: this.props.thumbColor,
            width: this.props.style.width / 2,
            aspectRatio: 1,
            borderRadius: this.props.style.width / 4,
            elevation: 4,
            left: this.state.left,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {this.props.iconComponent}
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({});
