import * as React from "react";
import {
  Image,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import * as Icons from "../constants/Icons";

export default class Rate extends React.Component {
  constructor() {
    super();
    this.state = {
      rate: 0,
    };
  }
  onPress(rate) {
    this.setState({ rate: rate });
    this.props.onChangeRate(rate);
  }
  componentDidMount() {
    this.setState({ rate: this.props.value });
  }
  render() {
    return (
      <View
        style={[
          {
            flexDirection: "row",
            justifyContent: "space-between",
            height: 50,
            width: "100%",
          },
          this.props.style,
        ]}
      >
        <TouchableWithoutFeedback onPress={() => this.onPress(1)}>
          <Image
            source={
              this.state.rate >= 1
                ? Icons.default.star.active
                : Icons.default.star.inactive
            }
            resizeMode={"contain"}
            style={styles.star}
          />
        </TouchableWithoutFeedback>
        <View style={styles.separator} />
        <TouchableWithoutFeedback onPress={() => this.onPress(2)}>
          <Image
            source={
              this.state.rate >= 2
                ? Icons.default.star.active
                : Icons.default.star.inactive
            }
            resizeMode={"contain"}
            style={styles.star}
          />
        </TouchableWithoutFeedback>
        <View style={styles.separator} />
        <TouchableWithoutFeedback onPress={() => this.onPress(3)}>
          <Image
            source={
              this.state.rate >= 3
                ? Icons.default.star.active
                : Icons.default.star.inactive
            }
            resizeMode={"contain"}
            style={styles.star}
          />
        </TouchableWithoutFeedback>
        <View style={styles.separator} />
        <TouchableWithoutFeedback onPress={() => this.onPress(4)}>
          <Image
            source={
              this.state.rate >= 4
                ? Icons.default.star.active
                : Icons.default.star.inactive
            }
            resizeMode={"contain"}
            style={styles.star}
          />
        </TouchableWithoutFeedback>
        <View style={styles.separator} />
        <TouchableWithoutFeedback onPress={() => this.onPress(5)}>
          <Image
            source={
              this.state.rate >= 5
                ? Icons.default.star.active
                : Icons.default.star.inactive
            }
            resizeMode={"contain"}
            style={styles.star}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  star: {
    aspectRatio: 1.04389,
    flex: 1,
    // height: 50,
    width: 50,
    // borderColor: "tomato",
    // borderWidth: 1,
  },
  separator: {
    flex: 0.6699,
  },
});
