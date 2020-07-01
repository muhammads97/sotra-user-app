import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import * as Colors from "../constants/Colors";

export class OTP4DigitsInput extends React.Component {
  constructor({ style }) {
    super();
    this.state = {
      autoFocus1: true,
      autoFocus2: false,
      autoFocus3: false,
      autoFocus4: false,
      d1: "",
      d2: "",
      d3: "",
      d4: "",
    };
    this.ref1 = React.createRef();
    this.ref2 = React.createRef();
    this.ref3 = React.createRef();
    this.ref4 = React.createRef();
    this.st = style;
  }

  isTextReady() {
    let s = this.state.d1 + this.state.d2 + this.state.d3 + this.state.d4;
    return s.length == 4;
  }
  isEmpty() {
    let s = this.state.d1 + this.state.d2 + this.state.d3 + this.state.d4;
    return s.length == 0;
  }
  getText() {
    let s = this.state.d1 + this.state.d2 + this.state.d3 + this.state.d4;
    return s;
  }
  focus() {
    this.ref1.current.focus();
  }
  onTextChanged(t, text) {
    //callback for immediate state change
    if (t == 2) {
      if (text.length == 1) {
        this.ref2.current.focus();
      }
      this.setState({ d1: text });
    }
    if (t == 3) {
      if (text.length == 1) this.ref3.current.focus();
      this.setState({ d2: text });
    }
    if (t == 4) {
      if (text.length == 1) this.ref4.current.focus();
      this.setState({ d3: text });
    }
    if (t == 0) {
      this.setState({ d4: text });
    }
    // console.log("digits: ", this.d1, this.d2, this.d3, this.d4);
  }
  componentDidMount() {
    this.ref1.current.focus();
  }
  render() {
    return (
      <View style={[styles.container, this.st]}>
        <TextInput
          placeholder={"__"}
          style={styles.digitInput}
          textContentType={"creditCardNumber"}
          keyboardType={"number-pad"}
          maxLength={1}
          autoFocus={this.state.autoFocus1}
          onChangeText={(text) => this.onTextChanged(2, text)}
          ref={this.ref1}
          scrollEnabled={false}
        />
        <TextInput
          placeholder={"__"}
          style={styles.digitInput}
          textContentType={"creditCardNumber"}
          keyboardType={"number-pad"}
          maxLength={1}
          autoFocus={this.state.autoFocus2}
          onChangeText={(text) => this.onTextChanged(3, text)}
          ref={this.ref2}
          scrollEnabled={false}
        />
        <TextInput
          placeholder={"__"}
          style={styles.digitInput}
          textContentType={"creditCardNumber"}
          keyboardType={"number-pad"}
          maxLength={1}
          autoFocus={this.state.autoFocus3}
          onChangeText={(text) => this.onTextChanged(4, text)}
          ref={this.ref3}
          scrollEnabled={false}
        />
        <TextInput
          placeholder={"__"}
          style={styles.digitInput}
          textContentType={"creditCardNumber"}
          keyboardType={"number-pad"}
          maxLength={1}
          autoFocus={this.state.autoFocus4}
          onChangeText={(text) => this.onTextChanged(0, text)}
          ref={this.ref4}
          scrollEnabled={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: Colors.default.input,
    borderBottomWidth: 1,

    height: 56,
    width: "75%",
  },
  digitInput: {
    fontFamily: "poppins-regular",
    fontSize: 40,
    color: Colors.default.input,
    letterSpacing: -10,
    textAlign: "center",
    marginBottom: -10,
    flex: 1,
  },
});
