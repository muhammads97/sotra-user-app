import React, { Component } from "react";
import {
  View,
  Animated,
  StyleSheet,
  TextInput,
  Dimensions,
  StatusBar,
} from "react-native";
import * as Colors from "../../constants/Colors";

const SBHeight = StatusBar.currentHeight;
const screenHeight = Math.round(Dimensions.get("window").height) - SBHeight;
const init_size = 0.0234375 * screenHeight;
const animationSize = 0.75 * init_size;
const animationBottom = 0.04 * screenHeight;

export default class FloatingTitleTextInputField extends Component {
  constructor() {
    super();
    this.state = {
      fontSize: new Animated.Value(init_size),
      bottom: new Animated.Value(0.5),
      value: "",
    };
  }
  animationStyle() {
    let style = {
      fontSize: this.state.fontSize,
      bottom: this.state.bottom,
    };
    return style;
  }
  onFocusStart() {
    if (this.state.value.length == 0) {
      Animated.parallel([
        Animated.timing(this.state.fontSize, {
          toValue: animationSize,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(this.state.bottom, {
          toValue: animationBottom,
          duration: 250,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }

  onFocusEnd() {
    if (this.state.value.length == 0) {
      Animated.parallel([
        Animated.timing(this.state.fontSize, {
          toValue: init_size,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(this.state.bottom, {
          toValue: 0.5,
          duration: 250,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }

  onChange(text) {
    this.setState({ value: text });
  }
  render() {
    return (
      <View style={Styles.container}>
        <Animated.Text style={[Styles.labelStyles, this.animationStyle()]}>
          {this.props.title}
        </Animated.Text>
        <TextInput
          onFocus={() => this.onFocusStart()}
          onBlur={() => this.onFocusEnd()}
          style={Styles.textInput}
          onChangeText={(text) => {
            this.props.onChangeText(text);
            this.onChange(text);
          }}
          scrollEnabled={false}
        />
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    width: "80%",
    borderBottomWidth: 1,
    borderBottomColor: Colors.default.input,
    height: 0.08828 * screenHeight,
    justifyContent: "flex-end",
  },
  textInput: {
    paddingBottom: 0,
    lineHeight: 0.04 * screenHeight,
    fontSize: 0.0234375 * screenHeight,
    fontFamily: "poppins-regular",
    color: Colors.default.back,
  },
  labelStyles: {
    fontFamily: "poppins-regular",
    fontSize: init_size,
    color: Colors.default.placeholder,
    position: "absolute",
    bottom: 0.5,
  },
});
